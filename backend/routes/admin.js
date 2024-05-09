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
const excelJS = require("exceljs");

/**
 * Login por usuário e senha
 */
router.get("/test", async (req, res) => {
  return res
    .status(200)
    .send(`Olá <b>${req.userId}</b>! Você está autenticado`);
});

/**
 * Verificar se usuário já está logado
 */
router.get("/login/check", async (req, res) => {
  const user = await Database.collection("users").findOne(
    {
      username: req.userId,
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
 * CONTROLE DE OCORRÊNCIAS
 */

// Listar ocorrências com base em filtros selecionados
router.get("/complaints", async (req, res) => {
  const { period, status, produto_id, unidade_id, categoria_id, setor_id } =
    req.query;

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

// Exportar dados de ocorrências para Excel
router.get("/complaints/export/excel", async (req, res) => {
  const { period } = req.query;

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
      representante,
      ordem_venda,
      setor,
      categoria,
      produto,
      motivo,
      causa,
      correcao,
      status,
    } = resultado[i];
    // Add data in worksheet
    worksheet.addRow({
      created_at,
      unidade: unidade.text,
      cliente,
      representante,
      ordem_venda,
      setor: setor.text,
      produto: produto.text,
      categoria: categoria.text,
      motivo,
      causa,
      correcao,
      status,
    });
  }
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  workbook.xlsx.write(res, {
    filename: "ocorrencias.xlsx",
  });
});

module.exports = router;
