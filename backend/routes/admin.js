const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const router = express.Router();
/**
 * Login por usuário e senha
 */
router.get("/test", async (req, res) => {
  return res.status(200).send(`Olá <b>${req.userId}</b>! Você está autenticado`);
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
  });
  return res.status(201).send({
    ok: true,
    id: r.insertedId.toString(),
  });
});
router.put("/unidades/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  await Database.collection("unidades").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        text,
      },
    }
  );
  return res.status(200).send({
    ok: true,
  });
});
router.delete("/unidades/:id", async (req, res) => {
  const { id } = req.params;
  await Database.collection("unidades").deleteOne({ _id: new ObjectId(id) });
  return res.status(200).send({
    ok: true,
  });
});

module.exports = router;
