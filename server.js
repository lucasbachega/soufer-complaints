const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const path = require("path");
const { middlewares, Database, routes } = require("./backend");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const https = require("node:https");
const fs = require("node:fs");
const { EmailSender } = require("./backend/utils/email-sender");

/**
 * Efetuar a conexão com o banco de dados
 */
console.log("Conectando ao banco de dados...");
Database.connect()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");

    // Configuração do Email Sender
    EmailSender.start();

    startServer();
  })
  .catch((e) => {
    console.log("Erro de conexão do banco de dados: ", e);
    process.exit(1);
  });

function startServer() {
  // create express app
  const app = express();

  // Define a porta do servidor
  let serverPORT = process.env.SERVER_PORT || 8080;
  if (process.env.MODE === "development") {
    // Modo debug. habilitar acesso total às credenciais. (Evitar erros CORS)
    console.log("Allowing all origins CORS (dev mode)");
    app.use(
      cors({
        origin: /localhost/,
        credentials: true,
      })
    );
  }

  if (process.env.MODE === "production") {
    // redirect every single incoming request to https
    app.enable("trust proxy");
    app.use(function (req, res, next) {
      if (!req.secure) {
        res.redirect("https://" + req.headers.host + req.url);
      }
      return next();
    });
  }

  // backend routes;
  app.use(cookieParser());
  app.use("/api", bodyParser.json({ limit: "15mb" }));
  app.use("/api/admin", middlewares.auth({ restrictAcess: true, role: "admin" }), routes.admin);
  app.use("/api/complaints", middlewares.auth({}), routes.complaints);
  app.use("/api/auth", routes.auth);

  // serve frontend app
  app.use(express.static(path.join(__dirname, "build")));
  app.use("/*", express.static(path.join(__dirname, "build")));

  // ERROR HANDLING GENERAL
  // MANEIRA INTELIGENTE DE LIDAR COM ERROS DE MODO MAIS AVANÇADO
  app.use((err, req, res, next) => {
    /**
     * Registrar evento de Erro
     */
    return res.status(err.status || 501).send({
      code: err.name,
      message: err.message,
      details: err.toString(),
      timestamp: new Date(),
    });
  });

  if (process.env.MODE === "development") {
    // start http server
    app.listen(serverPORT, () => {
      console.log(
        `Soufer Portal Ocorrências App is listening on port ${serverPORT} DEVELOPMENT MODE`
      );
    });
  } else {
    // Production Mode (Setup SSL Certificates)
    const privateKey = fs.readFileSync(path.join(__dirname, "./privkey.pem"));
    const certificate = fs.readFileSync(path.join(__dirname, "./fullchain.pem"));

    // Executar
    https
      .createServer(
        {
          key: privateKey,
          cert: certificate,
        },
        app
      )
      .listen(443, () => {
        console.log(`Soufer Portal Ocorrências App is listening on port 443 PRODUCTION MODE`);
      });
  }
}
