const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const path = require("path");
const { middlewares, Database, routes } = require("./backend");
const cors = require("cors");
const cookieParser = require("cookie-parser");

/**
 * Efetuar a conexão com o banco de dados
 */
console.log("Conectando ao banco de dados...");
Database.connect()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");
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

  // backend routes;
  app.use("/api", bodyParser.json({ limit: "15mb" }));
  app.use("/api/admin", middlewares.auth, routes.admin);
  app.use("/api/auth", routes.auth);
  app.use(cookieParser());

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

  // start http server
  app.listen(serverPORT, () => {
    console.log(`Server NotePay Expenses App is listening on port ${serverPORT}`);
  });
}
