const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const { OcorrenciaNotFound, TipoAnexoNotFound } = require("./errors");
const router = express.Router();
const {
  startOfToday,
  endOfDay,
  endOfToday,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");
const excelJS = require("exceljs");
const { EmailSender } = require("../utils/email-sender");

const occurrenceStatus = {
  open: {
    text: "Aberto",
  },
  completed: {
    text: "Concluído",
  },
  rejected: {
    text: "Recusado",
  },
};

// multer middleware (file upload)
const multerMid = require("../utils/multer-mid");

/**
 * CONTROLE DE OCORRÊNCIAS
 */
// Listar ocorrências com base em filtros selecionados
router.get("/complaints", async (req, res) => {
  const { areas } = req;
  const { period, status, produto_id, categoria_id } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (produto_id) filters["produto._id"] = new ObjectId(produto_id);
  if (categoria_id) filters["categoria._id"] = new ObjectId(categoria_id);

  const today = new Date();

  switch (period) {
    case "all":
      break;
    case "today":
      filters.created_at = {
        $gte: startOfToday(),
        $lt: endOfToday(),
      };
      break;
    case "month":
      filters.created_at = {
        $gte: startOfMonth(today),
        $lt: endOfMonth(today),
      };
      break;
    case "year":
      filters.created_at = {
        $gte: startOfYear(today),
        $lt: endOfYear(today),
      };
      break;
    default:
      break;
  }

  const resultado = await Database.collection("ocorrencias")
    .find({
      ...filters,
      $or: areas.map(({ unidade_id, setor_id }) => ({
        "unidade._id": new ObjectId(unidade_id),
        "setor._id": new ObjectId(setor_id),
      })),
    })
    .sort({ created_at: -1 })
    .toArray();

  return res.send(
    resultado.map((result) => ({
      ...result,
      representante: result?.user?.text || result.representante,
      user: undefined,
    }))
  );
});

// Atualizar dados de uma ocorrência...
router.put("/complaints/:id", async (req, res) => {
  const { id } = req.params;
  const { areas, userId } = req;
  const { status, causa, correcao, motivoRej, deleteAdminAnexos } = req.body;
  const ocorrencia = await Database.collection("ocorrencias").findOne({
    _id: new ObjectId(id),
    $or: areas.map(({ unidade_id, setor_id }) => ({
      "unidade._id": new ObjectId(unidade_id),
      "setor._id": new ObjectId(setor_id),
    })),
  });
  if (!ocorrencia) throw new OcorrenciaNotFound();
  const _user = await Database.collection("users").findOne({
    _id: ocorrencia?.user?._id,
  });
  const _loggedUser = await Database.collection("users").findOne({
    _id: new ObjectId(userId),
  });
  const editFields = {
    answerBy: {
      _id: _loggedUser._id,
      firstname: _loggedUser.firstname,
      timestamp: new Date(),
    },
  };
  if (status) {
    editFields.status = status;
  }
  if ("causa" in req.body) {
    editFields.causa = causa;
  }
  if ("correcao" in req.body) {
    editFields.correcao = correcao;
  }
  if ("motivoRej" in req.body) {
    editFields.motivoRej = motivoRej;
  }

  const updateAnexos = {};
  if (deleteAdminAnexos && Array.isArray(deleteAdminAnexos) && deleteAdminAnexos.length) {
    updateAnexos.$pull = {
      admin_anexos: {
        filename: { $in: deleteAdminAnexos },
      },
    };
  }

  // atualizar no banco
  await Database.collection("ocorrencias").updateOne(
    { _id: ocorrencia._id },
    {
      $set: editFields,
      ...updateAnexos,
    }
  );
  if (_user) {
    EmailSender.sendEmail({
      to: _user.email,
      subject: "Sua ocorrência foi atualizada",
      html: `Olá ${(_user?.firstname || "").split(" ")[0]}! <br /><br />
        Sua ocorrência registrada com o motivo <b>${
          ocorrencia?.motivo
        }</b> foi atualizada: <br /><br />
          <ul>
           <li>Status: <b>${occurrenceStatus[ocorrencia?.status]?.text}</b></li>
           <li>Análise de causa: <b>${editFields.causa || ocorrencia.causa || ""}</b></li>
             <li>Correção: <b>${editFields.correcao || ocorrencia.correcao || ""}</b></li>
          </ul>
       </b> <br />
        Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br <br /><br />
        Atenciosamente, <br />
        Equipe Soufer
        `,
    });
  }

  return res.status(200).send({ ok: true });
});

/**
 * Upload de anexos
 */
router.post("/complaints/:id/uploadFiles/:type", multerMid.array("files", 10), async (req, res) => {
  const { id, type } = req.params;
  const files = req.files;
  if (!id) {
    throw new OcorrenciaNotFound();
  }
  if (!["causa", "correcao"].includes(type)) {
    throw new TipoAnexoNotFound(type);
  }

  // Verificar da ocorrência
  const ocorrencia = await Database.collection("ocorrencias").findOne({
    _id: new ObjectId(id),
  });
  if (!ocorrencia) {
    throw new OcorrenciaNotFound();
  }

  const anexos = [];
  for (let i = 0; i < files.length; i++) {
    const { originalname, mimetype, filename, path, size } = files[i];
    anexos.push({
      type,
      originalname,
      mimetype,
      filename,
      path,
      size,
      upload_at: new Date(),
    });
  }

  // Save to database
  await Database.collection("ocorrencias").updateOne(
    { _id: ocorrencia._id },
    {
      $push: {
        admin_anexos: {
          $each: anexos,
          $position: 0,
        },
      },
    }
  );

  return res.status(201).send({
    ok: true,
    anexos,
  });
});

// Exportar dados de ocorrências para Excel
router.get("/complaints/export/excel", async (req, res) => {
  const { period } = req.query;
  const { areas } = req;

  const filters = {};
  const today = new Date();

  switch (period) {
    case "all":
      break;
    case "today":
      filters.created_at = {
        $gte: startOfToday(),
        $lt: endOfToday(),
      };
      break;
    case "month":
      filters.created_at = {
        $gte: startOfMonth(today),
        $lt: endOfMonth(today),
      };
      break;
    case "year":
      filters.created_at = {
        $gte: startOfYear(today),
        $lt: endOfYear(today),
      };
      break;
    default:
      break;
  }

  // Listar Ocorrências do banco de dados
  const resultado = await Database.collection("ocorrencias")
    .find({
      ...filters,
      $or: areas.map(({ unidade_id, setor_id }) => ({
        "unidade._id": new ObjectId(unidade_id),
        "setor._id": new ObjectId(setor_id),
      })),
    })
    .sort({ created_at: -1 })
    .toArray();

  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Ocorrências"); // New Worksheet

  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Criada em", key: "created_at", width: 15 },
    { header: "Unidade", key: "unidade", width: 15 },
    //   { header: "ID", key: "report_id", width: 6 },
    { header: "Cliente", key: "cliente", width: 35 },
    { header: "Representante", key: "representante", width: 25 },
    { header: "Ordem de venda", key: "ordem_venda", width: 15 },
    { header: "Setor", key: "setor", width: 20 },
    { header: "Produto", key: "produto", width: 20 },
    { header: "Categoria", key: "categoria", width: 20 },
    { header: "Motivo", key: "motivo", width: 35 },
    { header: "Causa", key: "causa", width: 20 },
    { header: "Correção", key: "correcao", width: 20 },
    { header: "Status", key: "status", width: 15 },
    { header: "Respondido por", key: "answerBy", width: 20 },
  ];

  // Set an auto filter from the cell in row 3 and column 1
  // to the cell in row 5 and column 12
  worksheet.autoFilter = {
    from: {
      row: 1,
      column: 1,
    },
    to: {
      row: 1,
      column: worksheet.columns.length,
    },
  };

  for (let i = 0; i < resultado.length; i++) {
    const {
      created_at,
      unidade,
      cliente,
      user,
      representante,
      ordem_venda,
      setor,
      categoria,
      produto,
      motivo,
      causa,
      correcao,
      status,
      answerBy,
    } = resultado[i];
    // Add data in worksheet
    worksheet.addRow({
      created_at,
      unidade: unidade.text,
      cliente,
      representante: user?.text || representante,
      ordem_venda,
      setor: setor.text,
      produto: produto.text,
      categoria: categoria.text,
      motivo,
      causa,
      correcao,
      status,
      answerBy: answerBy?.firstname,
    });
  }
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  workbook.xlsx.write(res, {
    filename: "ocorrencias.xlsx",
  });
});

module.exports = router;
