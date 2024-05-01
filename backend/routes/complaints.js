const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
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

module.exports = router;
