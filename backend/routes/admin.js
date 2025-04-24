const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const {
  UnidadeNotFound,
  SetorNotFound,
  ProdutoNotFound,
  CategoriaNotFound,
  OcorrenciaNotFound,
  UserNotFound,
  TipoAnexoNotFound,
} = require("./errors");
const { updateTexts } = require("./utils");
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
// multer middleware (file upload)
const multerMid = require("../utils/multer-mid");
const fs = require("fs");
const path = require("path");

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

/**
 * Login por usuário e senha
 */
router.get("/test", async (req, res) => {
  return res
    .status(200)
    .send(`Olá <b>${req.userId}</b>! Você está autenticado`);
});

/**
 * UNIDADES
 */
router.get("/unidades", async (req, res) => {
  const r = await Database.collection("unidades")
    .find()
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});
router.post("/unidades", async (req, res) => {
  const { text } = req.body;
  const r = await Database.collection("unidades").insertOne({
    text,
    created_at: new Date(),
    active: true,
  });
  return res.status(201).send({
    ok: true,
    id: r.insertedId.toString(),
  });
});
router.put("/unidades/:id", async (req, res) => {
  const { id } = req.params;
  const { text, active } = req.body;
  const _unidade = await Database.collection("unidades").findOne({
    _id: new ObjectId(id),
  });
  if (!_unidade) throw new UnidadeNotFound();
  const edits = {};
  if ("text" in req.body) {
    edits.text = text;
    updateTexts({
      collection: "unidade",
      id,
      text,
    });
  }
  if ("active" in req.body) edits.active = !!active;
  await Database.collection("unidades").updateOne(
    { _id: _unidade._id },
    {
      $set: edits,
    }
  );
  return res.status(200).send({
    ok: true,
  });
});
router.delete("/unidades/:id", async (req, res) => {
  const { id } = req.params;
  const _unidade = await Database.collection("unidades").findOne({
    _id: new ObjectId(id),
  });
  if (!_unidade) throw new UnidadeNotFound();
  await Database.collection("unidades").deleteOne({ _id: _unidade._id });
  return res.status(200).send({
    ok: true,
  });
});

/**
 * SETOR
 */
router.get("/setor", async (req, res) => {
  const r = await Database.collection("setor")
    .find()
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});
router.post("/setor", async (req, res) => {
  const { text } = req.body;
  const r = await Database.collection("setor").insertOne({
    text,
    created_at: new Date(),
    active: true,
  });
  return res.status(201).send({
    ok: true,
    id: r.insertedId.toString(),
  });
});
router.put("/setor/:id", async (req, res) => {
  const { id } = req.params;
  const { text, active } = req.body;
  const _setor = await Database.collection("setor").findOne({
    _id: new ObjectId(id),
  });
  if (!_setor) throw new SetorNotFound();
  const edits = {};
  if ("text" in req.body) {
    edits.text = text;
    updateTexts({
      collection: "setor",
      id,
      text,
    });
  }
  if ("active" in req.body) edits.active = !!active;
  await Database.collection("setor").updateOne(
    { _id: _setor._id },
    {
      $set: edits,
    }
  );
  return res.status(200).send({
    ok: true,
  });
});
router.delete("/setor/:id", async (req, res) => {
  const { id } = req.params;
  const _setor = await Database.collection("setor").findOne({
    _id: new ObjectId(id),
  });
  if (!_setor) throw new SetorNotFound();
  await Database.collection("setor").deleteOne({ _id: _setor._id });
  return res.status(200).send({
    ok: true,
  });
});

/**
 * PRODUTOS
 */
router.get("/produtos", async (req, res) => {
  const r = await Database.collection("produtos")
    .find()
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});
router.post("/produtos", async (req, res) => {
  const { text } = req.body;
  const r = await Database.collection("produtos").insertOne({
    text,
    created_at: new Date(),
    active: true,
  });
  return res.status(201).send({
    ok: true,
    id: r.insertedId.toString(),
  });
});
router.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { text, active } = req.body;
  const _produtos = await Database.collection("produtos").findOne({
    _id: new ObjectId(id),
  });
  if (!_produtos) throw new ProdutoNotFound();
  const edits = {};
  if ("text" in req.body) {
    edits.text = text;
    updateTexts({
      collection: "produto",
      id,
      text,
    });
  }
  if ("active" in req.body) edits.active = !!active;
  await Database.collection("produtos").updateOne(
    { _id: _produtos._id },
    {
      $set: edits,
    }
  );
  return res.status(200).send({
    ok: true,
  });
});
router.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const _produtos = await Database.collection("produtos").findOne({
    _id: new ObjectId(id),
  });
  if (!_produtos) throw new ProdutoNotFound();
  await Database.collection("produtos").deleteOne({ _id: _produtos._id });
  return res.status(200).send({
    ok: true,
  });
});

/**
 * CATEGORIAS
 */
router.get("/categorias", async (req, res) => {
  const r = await Database.collection("categorias")
    .find()
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});
router.post("/categorias", async (req, res) => {
  const { text } = req.body;
  const r = await Database.collection("categorias").insertOne({
    text,
    created_at: new Date(),
    active: true,
  });
  return res.status(201).send({
    ok: true,
    id: r.insertedId.toString(),
  });
});
router.put("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { text, active } = req.body;
  const _categorias = await Database.collection("categorias").findOne({
    _id: new ObjectId(id),
  });
  if (!_categorias) throw new CategoriaNotFound();
  const edits = {};
  if ("text" in req.body) {
    edits.text = text;
    updateTexts({
      collection: "categoria",
      id,
      text,
    });
  }
  if ("active" in req.body) edits.active = !!active;
  await Database.collection("categorias").updateOne(
    { _id: _categorias._id },
    {
      $set: edits,
    }
  );
  return res.status(200).send({
    ok: true,
  });
});
router.delete("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const _categorias = await Database.collection("categorias").findOne({
    _id: new ObjectId(id),
  });
  if (!_categorias) throw new CategoriaNotFound();
  await Database.collection("categorias").deleteOne({ _id: _categorias._id });
  return res.status(200).send({
    ok: true,
  });
});

/**
 * USUÁRIOS
 */
router.get("/users", async (req, res) => {
  const r = await Database.collection("users")
    .find(
      {},
      {
        projection: {
          pwd: 0,
        },
      }
    )
    .sort({ firstname: 1 })
    .toArray();
  return res.send(r);
});
router.post("/users", async (req, res) => {
  const {
    username,
    firstname,
    password,
    email,
    roles,
    areas,
    assignAllAreas,
    transportRoles,
  } = req.body;
  const user = {
    username,
    firstname,
    pwd: password,
    email,
    roles: roles || [],
    areas: [],
    created_at: new Date(),
    block: false,
    assignAllAreas,
    transportRoles,
  };
  if (roles?.includes("gestor") && areas?.length && !assignAllAreas) {
    // Verif. as áreas do gestor
    for (let i = 0; i < areas.length; i++) {
      const { unidade_id, setor_id } = areas[i];
      const _setor = await Database.collection("setor").findOne({
        _id: new ObjectId(setor_id),
      });
      if (!_setor) throw new SetorNotFound();
      const _unidade = await Database.collection("unidades").findOne({
        _id: new ObjectId(unidade_id),
      });
      if (!_unidade) throw new UnidadeNotFound();
      user.areas.push({ unidade_id: _unidade._id, setor_id: _setor._id });
    }
  }
  const r = await Database.collection("users").insertOne(user);
  return res.status(201).send({
    ok: true,
    id: r.insertedId.toString(),
  });
});
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const {
    username,
    firstname,
    password,
    email,
    roles,
    block,
    areas,
    assignAllAreas,
    transportRoles
  } = req.body;
  const _user = await Database.collection("users").findOne({
    _id: new ObjectId(id),
  });
  if (!_user) throw new UserNotFound();
  const edits = {};
  if ("username" in req.body) edits.username = username;
  if ("assignAllAreas" in req.body) edits.assignAllAreas = assignAllAreas;
  if ("transportRoles" in req.body) edits.transportRoles = transportRoles;
  if ("firstname" in req.body) {
    edits.firstname = firstname;
    updateTexts({
      collection: "user",
      id,
      text: firstname,
    });
  }
  if ("password" in req.body) edits.pwd = password;
  if ("email" in req.body) edits.email = email;
  if ("roles" in req.body) edits.roles = roles;
  if ("block" in req.body) edits.block = !!block;
  if (
    (roles?.includes("gestor") || _user?.roles?.includes("gestor")) &&
    areas?.length
  ) {
    edits.areas = [];
    // Verif. as áreas do gestor
    const filteredAreas = areas.filter(
      (area) => area.unidade_id && area.setor_id
    );
    for (let i = 0; i < filteredAreas.length; i++) {
      const { unidade_id, setor_id } = filteredAreas[i];
      const _setor = await Database.collection("setor").findOne({
        _id: new ObjectId(setor_id),
      });
      if (!_setor) throw new SetorNotFound();
      const _unidade = await Database.collection("unidades").findOne({
        _id: new ObjectId(unidade_id),
      });
      if (!_unidade) throw new UnidadeNotFound();
      edits.areas.push({ unidade_id: _unidade._id, setor_id: _setor._id });
    }
  }
  await Database.collection("users").updateOne(
    { _id: _user._id },
    {
      $set: edits,
    }
  );
  return res.status(200).send({
    ok: true,
  });
});
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const _user = await Database.collection("users").findOne({
    _id: new ObjectId(id),
  });
  if (!_user) throw new UserNotFound();
  await Database.collection("users").deleteOne({ _id: _user._id });
  return res.status(200).send({
    ok: true,
  });
});

/**
 * CONTROLE DE OCORRÊNCIAS
 */

// Listar ocorrências com base em filtros selecionados
router.get("/complaints", async (req, res) => {
  const {
    period,
    status,
    produto_id,
    unidade_id,
    categoria_id,
    setor_id,
    type,
  } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (produto_id) filters["produto._id"] = new ObjectId(produto_id);
  if (unidade_id) filters["unidade._id"] = new ObjectId(unidade_id);
  if (categoria_id) filters["categoria._id"] = new ObjectId(categoria_id);
  if (setor_id) filters["setor._id"] = new ObjectId(setor_id);
  if (type) filters.type = type;

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
  const { userId } = req;
  const { status, causa, correcao, deleteAdminAnexos } = req.body;
  const _loggedUser = await Database.collection("users").findOne({
    _id: new ObjectId(userId),
  });
  const ocorrencia = await Database.collection("ocorrencias").findOne({
    _id: new ObjectId(id),
  });
  if (!ocorrencia) throw new OcorrenciaNotFound();
  const _user = await Database.collection("users").findOne({
    _id: ocorrencia?.user?._id,
  });
  const editFields = {};
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
  if (editFields.causa || editFields.correcao) {
    editFields.answerBy = {
      _id: _loggedUser._id,
      firstname: _loggedUser.firstname,
      timestamp: new Date(),
    };
  }

  const updateAnexos = {};
  if (
    deleteAdminAnexos &&
    Array.isArray(deleteAdminAnexos) &&
    deleteAdminAnexos.length
  ) {
    updateAnexos.$pull = {
      admin_anexos: {
        filename: { $in: deleteAdminAnexos },
      },
    };
    // Remover arquivo do file storage
    for (const filename of deleteAdminAnexos) {
      const file = ocorrencia?.admin_anexos?.find(
        (anexo) => anexo.filename === filename
      );
      if (file) {
        const { path: localpath, mimetype } = file;
        const urlFile = path.join(__dirname, "../../", localpath);
        try {
          fs.rmSync(urlFile);
        } catch (error) {
          console.error(
            "Ocorreu uma falha interna ao remover anexos da ocorrência :: ",
            id,
            error
          );
        }
      }
    }
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
         <li>Análise de causa: <b>${
           editFields.causa || ocorrencia.causa || ""
         }</b></li>
           <li>Correção: <b>${
             editFields.correcao || ocorrencia.correcao || ""
           }</b></li>
        </ul>
     </b> <br />
      Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br <br />
      <i>Agora você pode avaliar as repostas sobre a causa e correção da sua ocorrência!</i> <br /><br />
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
router.post(
  "/complaints/:id/uploadFiles",
  multerMid.array("files", 10),
  async (req, res) => {
    const { id } = req.params;
    const files = req.files;
    const { type } = req.body;
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
  }
);

// Exportar dados de ocorrências para Excel
router.get("/complaints/export/excel", async (req, res) => {
  const { period, type } = req.query;

  const filters = {};
  const today = new Date();
  if (type) filters.type = type;

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
    })
    .sort({ created_at: -1 })
    .toArray();

  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Ocorrências"); // New Worksheet

  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Criada em", key: "created_at", width: 15 },
    { header: "Tipo", key: "type", width: 15 },
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
    { header: "Respondido em", key: "answerDate", width: 20 },
    { header: "Avaliação Causa", key: "avaliacaoCausa", width: 15 },
    { header: "Avaliação Correção", key: "avaliacaoCorrecao", width: 15 },
    { header: "Problema", key: "problem", width: 35 },
    { header: "Sugestão de solução", key: "solutionObs", width: 30 },
    { header: "Detecção", key: "detection", width: 15 },
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
      type,
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
      ratingCausa,
      ratingCorrecao,
      problem,
      solutionObs,
      detection,
    } = resultado[i];
    // Add data in worksheet
    worksheet.addRow({
      created_at,
      type,
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
      answerDate: answerBy?.timestamp,
      avaliacaoCausa:
        ratingCausa?.number &&
        `${ratingCausa.number}/${ratingCausa.scale || 5}`,
      avaliacaoCorrecao:
        ratingCorrecao?.number &&
        `${ratingCorrecao.number}/${ratingCorrecao.scale || 5}`,
      problem,
      solutionObs,
      detection,
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
