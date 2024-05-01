const express = require("express");
const Database = require("../db");
const router = express.Router();
/**
 * Login por usuário e senha
 */
router.get("/test", async (req, res) => {
  return res.status(200).send(`Olá <b>${req.userId}</b>! Você está autenticado`);
});

module.exports = router;
