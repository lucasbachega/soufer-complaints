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
} = require("./errors");
const router = express.Router();
const multer = require("multer");
var fs = require("fs");

// multer middleware (file upload)
const multerMid = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const today = new Date();
      const str = today.toLocaleDateString("pt-BR");
      const [dia, mes, ano] = str.split("/");
      const uri = `./files/${ano}/${dia}-${mes}`;

      if (!fs.existsSync(uri)) {
        fs.mkdirSync(uri, { recursive: true });
      }
      return callback(null, uri);
    },
    // filename: (req, file, callback) => {
    //   console.log(req.body);
    //   const ocorrencia_id = req.body.ocorrencia_id || "unknown_id";
    //   return callback(null, `${ocorrencia_id}-${file.originalname}`);
    // },
  }),
  limits: {
    // no larger than 30mb.
    fileSize: 30 * 1024 * 1024,
  },
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
  const {
    unidade_id,
    setor_id,
    produto_id,
    categoria_id,
    cliente,
    representante,
    ordem_venda,
    motivo,
  } = req.body;

  if (!unidade_id) throw new RequiredFieldError("Unidade");
  if (!cliente) throw new RequiredFieldError("Cliente");
  if (!categoria_id) throw new RequiredFieldError("Tipo de ocorrência");
  if (!representante) throw new RequiredFieldError("Representante");
  if (!ordem_venda) throw new RequiredFieldError("Ordem de venda");
  if (!motivo) throw new RequiredFieldError("Motivo");
  if (!produto_id) throw new RequiredFieldError("Produto");
  if (!setor_id) throw new RequiredFieldError("Setor");

  // Buscar dados relacionados
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
    unidade: {
      _id: _unidade._id,
      text: _unidade.text,
    },
    cliente,
    representante,
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
    anexos.push({ originalname, mimetype, filename, path, size, upload_at: new Date() });
  }

  // Save to database
  await Database.collection("ocorrencias").updateOne(
    { _id: ocorrencia._id },
    {
      $push: {
        $each: anexos,
        $position: 0,
      },
    }
  );

  return res.status(201).send({
    ok: true,
    anexos,
  });
});

module.exports = router;
