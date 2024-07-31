const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const {
  RequiredFieldError,
  UnidadeNotFound,
  SetorNotFound,
  ProdutoNotFound,
  CategoriaNotFound,
  OcorrenciaNotFound,
  AnexoNotFound,
  UserNotFound,
} = require("./errors");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  startOfToday,
  endOfToday,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");
const { EmailSender } = require("../utils/email-sender");

// multer middleware (file upload)
const multerMid = require("../utils/multer-mid");

/**
 * Verificar se usuário já está logado
 */
router.get("/login/check", async (req, res) => {
  const user = await Database.collection("users").findOne(
    {
      _id: new ObjectId(req.userId),
    },
    {
      projection: {
        pwd: 0,
      },
    }
  );
  return res.status(200).send({
    ok: true,
    user: user,
    message: "Usuário autenticado",
  });
});

/**
 * Listar Unidades disponíveis para seleção
 */
router.get("/unidades", async (req, res) => {
  const r = await Database.collection("unidades")
    .find(
      {
        active: true,
      },
      {
        projection: {
          _id: 1,
          text: 1,
        },
      }
    )
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});

/**
 * Listar Setores disponíveis para seleção
 */
router.get("/setor", async (req, res) => {
  const r = await Database.collection("setor")
    .find(
      {
        active: true,
      },
      {
        projection: {
          _id: 1,
          text: 1,
        },
      }
    )
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});

/**
 * Listar Produtos disponíveis para seleção
 */
router.get("/produtos", async (req, res) => {
  const r = await Database.collection("produtos")
    .find(
      {
        active: true,
      },
      {
        projection: {
          _id: 1,
          text: 1,
        },
      }
    )
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});

/**
 * Listar Categorias disponíveis para seleção
 */
router.get("/categorias", async (req, res) => {
  const r = await Database.collection("categorias")
    .find(
      {
        active: true,
      },
      {
        projection: {
          _id: 1,
          text: 1,
        },
      }
    )
    .sort({ text: 1 })
    .toArray();
  return res.send(r);
});

/**
 * Registrar uma ocorrência
 */
router.post("/register", async (req, res) => {
  const { unidade_id, setor_id, produto_id, categoria_id, cliente, ordem_venda, motivo } = req.body;

  if (!unidade_id) throw new RequiredFieldError("Unidade");
  if (!cliente) throw new RequiredFieldError("Cliente");
  if (!categoria_id) throw new RequiredFieldError("Tipo de ocorrência");
  if (!ordem_venda) throw new RequiredFieldError("Ordem de venda");
  if (!motivo) throw new RequiredFieldError("Motivo");
  if (!produto_id) throw new RequiredFieldError("Produto");
  if (!setor_id) throw new RequiredFieldError("Setor");

  // Usuário autenticado
  const user_id = req.userId;

  // Buscar dados relacionados
  // Usuário
  const _user = await Database.collection("users").findOne({
    _id: new ObjectId(user_id),
  });
  if (!_user) throw new UserNotFound();
  // Unidade
  const _unidade = await Database.collection("unidades").findOne({
    _id: new ObjectId(unidade_id),
    active: true,
  });
  if (!_unidade) throw new UnidadeNotFound();
  // setor
  const _setor = await Database.collection("setor").findOne({
    _id: new ObjectId(setor_id),
    active: true,
  });
  if (!_setor) throw new SetorNotFound();
  // produto
  const _produto = await Database.collection("produtos").findOne({
    _id: new ObjectId(produto_id),
    active: true,
  });
  if (!_produto) throw new ProdutoNotFound();
  // categoria
  const _categoria = await Database.collection("categorias").findOne({
    _id: new ObjectId(categoria_id),
    active: true,
  });
  if (!_categoria) throw new CategoriaNotFound();

  // dados da ocorrência
  const ocorrencia = {
    created_at: new Date(),
    user: {
      _id: _user._id,
      text: _user.firstname,
    },
    unidade: {
      _id: _unidade._id,
      text: _unidade.text,
    },
    cliente,
    ordem_venda,
    setor: {
      _id: _setor._id,
      text: _setor.text,
    },
    produto: {
      _id: _produto._id,
      text: _produto.text,
    },
    categoria: {
      _id: _categoria._id,
      text: _categoria.text,
    },
    motivo,
    causa: "",
    correcao: "",
    status: "open", // em aberto
    anexos: [],
  };

  // Salvar no banco de dados
  const r = await Database.collection("ocorrencias").insertOne(ocorrencia);

  // Enviar e-mail para os responsáveis
  const body = `A Ocorrência foi registrada com as seguintes informações: <br />
      Motivo: <h3>${motivo}</h3> <br />
      <ul>
        <li>Registrada por: <b>${_user.firstname || ""} | ${_user.email}</b></li>
        <li>Unidade: <b>${_unidade.text || ""}</b></li>
        <li>Cliente: <b>${cliente || ""}</b></li>
        <li>Ordem de venda: <b>${ordem_venda || ""}</b></li>
        <li>Setor: <b>${_setor.text || ""}</b></li>
        <li>Produto: <b>${_produto.text || ""}</b></li>
        <li>Categoria: <b>${_categoria.text || ""}</b></li>
      </ul>
   </b> <br />
    Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br <br /><br />
    Atenciosamente, <br />
    Equipe Soufer`;

  const users = await Database.collection("users").find({
    roles: "gestor",
    areas: {
      $elemMatch: {
        unidade_id: ocorrencia.unidade._id,
        setor_id: ocorrencia.setor._id,
      },
    },
  });
  for (let i = 0; i < users.length; i++) {
    const { firstname, email } = users[i];
    EmailSender.sendEmail({
      to: email,
      subject: `Nova Ocorrência (Unidade/setor: ${ocorrencia.unidade.text}/${ocorrencia.setor.text})`,
      html: `Olá ${firstname}! Uma nova ocorrência requer sua atenção: <br /><br />
        ${body}
      `,
    });
  }

  // Notificação e-mail padrão
  EmailSender.sendEmail({
    to: "ocorrencias@gruposoufer.com.br",
    cc: _user.email,
    subject: "Nova Ocorrência",
    html: `Olá Equipe Comercial! <br /><br />
   ${body}
    `,
  });

  return res.status(201).send({
    ok: true,
    ocorrencia: {
      _id: r.insertedId,
      ...ocorrencia,
      causa: undefined,
      correcao: undefined,
    },
  });
});

//Listar ocorrencias pessoais (logado)
router.get("/ocorrencias", async (req, res) => {
  // Usuário autenticado
  const user_id = req.userId;
  const { period, status, produto_id, unidade_id, categoria_id, setor_id } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (produto_id) filters["produto._id"] = new ObjectId(produto_id);
  if (unidade_id) filters["unidade._id"] = new ObjectId(unidade_id);
  if (categoria_id) filters["categoria._id"] = new ObjectId(categoria_id);
  if (setor_id) filters["setor._id"] = new ObjectId(setor_id);

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

  const ocorrencias = await Database.collection("ocorrencias")
    .find({
      "user._id": new ObjectId(user_id),
      ...filters,
    })
    .sort({ created_at: -1 })
    .toArray();

  return res.send(ocorrencias || []);
});

/**
 * Upload de anexos
 */
router.post("/upload", multerMid.array("files", 5), async (req, res) => {
  const files = req.files;
  const ocorrenciaId = req.body.ocorrencia_id;
  if (!ocorrenciaId) {
    throw new OcorrenciaNotFound();
  }

  // Verificar da ocorrência
  const ocorrencia = await Database.collection("ocorrencias").findOne({
    _id: new ObjectId(ocorrenciaId),
  });
  if (!ocorrencia) {
    throw new OcorrenciaNotFound();
  }

  const anexos = [];

  for (let i = 0; i < files.length; i++) {
    const { originalname, mimetype, filename, path, size } = files[i];
    anexos.push({
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
        anexos: {
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

/**
 * Streaming comprovantes
 */
router.get("/:id/file/:filename", async (req, res) => {
  const { id, filename } = req.params;
  // Verificar da ocorrência
  const ocorrencia = await Database.collection("ocorrencias").findOne({
    _id: new ObjectId(id),
  });
  if (!ocorrencia) {
    throw new OcorrenciaNotFound();
  }

  let file;
  const anexos = ocorrencia.anexos || [];
  const adminAnexos = ocorrencia.admin_anexos || [];
  const ocorrenciaFile = anexos.find((anexo) => anexo.filename === filename);
  const adminFile = adminAnexos.find((anexo) => anexo.filename === filename);
  if (!ocorrenciaFile && !adminFile) throw new AnexoNotFound();
  file = ocorrenciaFile || adminFile;

  const { path: localpath, mimetype } = file;
  const urlFile = path.join(__dirname, "../../", localpath);

  res.setHeader("Content-Type", mimetype);
  fs.createReadStream(urlFile).pipe(res);
});

module.exports = router;
