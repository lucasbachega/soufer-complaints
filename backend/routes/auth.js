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
  const user = await Database.collection("users").findOne(
    {
      username,
      pwd: password,
    },
    {
      projection: {
        pwd: 0,
      },
    }
  );
  if (user) {
    // Generate Acess Token...
    const acessToken = jwt.sign({ userId: username }, SECRET, {
      expiresIn: "7d",
    });

    // Save Access Token to Cookie
    res.cookie("portaloc_access_token", acessToken, {
      httpOnly: true,
      maxAge: 7200 * 1000, // 2hr
      // domain: process.env.COOKIE_DOMAIN || "localhost",
      domain: req.hostname,
      secure: false,
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

/**
 * Logout (Sair do sistema)
 */
router.post("/logout", async (req, res) => {
  // Limpa os cookies
  res.clearCookie("portaloc_access_token");
  return res.send({
    ok: true,
  });
});

module.exports = router;
