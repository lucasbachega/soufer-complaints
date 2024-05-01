const express = require("express");
const Database = require("../db");
const { InvalidUserAccess } = require("./errors");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET = process.env.API_SECRET_KEY || "InsecureSecret";

/**
 * Login por usuário e senha
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Database.collection("users").findOne({
    username,
    pwd: password,
  });
  if (user) {
    // Generate Acess Token...
    const acessToken = jwt.sign({ userId: username }, SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      ok: true,
      user,
      acessToken,
    });
  } else {
    throw new InvalidUserAccess();
  }
});

module.exports = router;
