const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const {} = require("./errors");
const router = express.Router();

//Listar transportes
router.get("/", async (req, res) => {
  const user_id = req.userId;
  const { role } = req.query;

  const filters = {};

  if (role === "personal") {
    filters["user._id"] = new ObjectId(user_id);
  } else if (role === "approver") {
    filters.status = "pending";
  } else if (role === "carrier") {
    filters.status = "approved";
  }

  const transports = await Database.collection("transports")
    .find(filters)
    .sort({ created_at: -1 })
    .toArray();

  return res.send(transports || []);
});

//Solicitar transporte
router.post("/request", async (req, res) => {
  const user_id = req.userId;
  const body = req.body;

  try {
    const transport = {
      user: {
        _id: new ObjectId(user_id),
      },
      points: body.points,
      time: body.time,
      people: body.people,
      shift: body.shift,
      notes: body.notes,
      status: "pending",
      created_at: new Date(),
    };

    const result = await Database.collection("transports").insertOne(transport);

    return res.status(201).send({ _id: result.insertedId, ...transport });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao solicitar transporte" });
  }
});

// /routes/transports.js
router.get("/stats", async (req, res) => {
  const userId = req.userId;

  try {
    const [personal, approver, carrier] = await Promise.all([
      Database.collection("transports").countDocuments({
        "user._id": new ObjectId(userId),
      }),
      Database.collection("transports").countDocuments({ status: "pending" }),
      Database.collection("transports").countDocuments({ status: "approved" }),
    ]);

    return res.send({
      personal,
      approver,
      carrier,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao buscar estatísticas" });
  }
});

// Aprovar transporte (approver)
router.post("/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Database.collection("transports").updateOne(
      { _id: new ObjectId(id), status: "pending" },
      { $set: { status: "approved", approved_at: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: "Não foi possível aprovar" });
    }

    return res.send({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Erro ao aprovar transporte" });
  }
});

// Confirmar transporte (carrier)
router.post("/:id/confirm", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Database.collection("transports").updateOne(
      { _id: new ObjectId(id), status: "approved" },
      { $set: { status: "confirmed", confirmed_at: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: "Não foi possível confirmar" });
    }

    return res.send({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Erro ao confirmar transporte" });
  }
});

// Rejeitar transporte (approver ou carrier)
router.post("/:id/reject", async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const user_id = req.userId;

  try {
    const _user = await Database.collection("users").findOne({
      _id: new ObjectId(user_id),
    });

    if (!_user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const update = {
      status: "rejected",
      rejectedBy: {
        _id: _user._id,
        name: _user.firstname,
        email: _user.email,
      },
      rejectedAt: new Date(),
      rejectionReason: reason,
    };

    const result = await Database.collection("transports").updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send({ message: "Transporte não encontrado ou já atualizado." });
    }

    return res.send({ ok: true });
  } catch (err) {
    console.error("Erro ao rejeitar transporte:", err);
    return res
      .status(500)
      .send({ message: "Erro interno ao rejeitar transporte." });
  }
});

module.exports = router;
