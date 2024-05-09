const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const {
  UnidadeNotFound,
  SetorNotFound,
  ProdutoNotFound,
  CategoriaNotFound,
  OcorrenciaNotFound,
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
/**
 * Login por usuário e senha
 */
router.get("/test", async (req, res) => {
  return res.status(200).send(`Olá <b>${req.userId}</b>! Você está autenticado`);
});

/**
 * Verificar se usuário já está logado
 */
router.get("/login/check", async (req, res) => {
  const user = await Database.collection("users").findOne({
    _id: new ObjectId(req.userId),
  });
  return res.status(200).send({
    ok: true,
    user: user?.username,
    message: "Usuário autenticado",
  });
});

/**
 * UNIDADES
 */
router.get("/unidades", async (req, res) => {
  const r = await Database.collection("unidades").find().sort({ text: 1 }).toArray();
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
  const _unidade = await Database.collection("unidades").findOne({ _id: new ObjectId(id) });
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
  const _unidade = await Database.collection("unidades").findOne({ _id: new ObjectId(id) });
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
  const r = await Database.collection("setor").find().sort({ text: 1 }).toArray();
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
  const _setor = await Database.collection("setor").findOne({ _id: new ObjectId(id) });
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
  const _setor = await Database.collection("setor").findOne({ _id: new ObjectId(id) });
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
  const r = await Database.collection("produtos").find().sort({ text: 1 }).toArray();
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
  const _produtos = await Database.collection("produtos").findOne({ _id: new ObjectId(id) });
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
  const _produtos = await Database.collection("produtos").findOne({ _id: new ObjectId(id) });
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
  const r = await Database.collection("categorias").find().sort({ text: 1 }).toArray();
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
  const _categorias = await Database.collection("categorias").findOne({ _id: new ObjectId(id) });
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
  const _categorias = await Database.collection("categorias").findOne({ _id: new ObjectId(id) });
  if (!_categorias) throw new CategoriaNotFound();
  await Database.collection("categorias").deleteOne({ _id: _categorias._id });
  return res.status(200).send({
    ok: true,
  });
});

/**
 * CONTROLE DE OCORRÊNCIAS
 */

// Listar ocorrências com base em filtros selecionados
router.get("/complaints", async (req, res) => {
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

  return res.send(resultado);
});

// Atualizar dados de uma ocorrência...
router.put("/complaints/:id", async (req, res) => {
  const { id } = req.params;
  const { status, causa, correcao } = req.body;
  const ocorrencia = await Database.collection("ocorrencias").findOne(
    {
      _id: new ObjectId(id),
    },
    {
      projection: {
        _id: 1,
      },
    }
  );
  if (!ocorrencia) throw new OcorrenciaNotFound();
  const editFields = {};
  if (status) editFields.status = status;
  if ("causa" in req.body) {
    editFields.causa = causa;
  }
  if ("correcao" in req.body) {
    editFields.correcao = correcao;
  }
  // atualizar no banco
  await Database.collection("ocorrencias").updateOne(
    { _id: ocorrencia._id },
    {
      $set: editFields,
    }
  );
  return res.status(200).send({ ok: true });
});

module.exports = router;
