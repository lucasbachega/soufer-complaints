const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const {
  RequiredFieldError,
  UnidadeNotFound,
  SetorNotFound,
  ProdutoNotFound,
  CategoriaNotFound,
} = require("./errors");
const router = express.Router();

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
    anexos: 0,
    causa: "",
    correcao: "",
    status: "open", // em aberto
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

module.exports = router;
