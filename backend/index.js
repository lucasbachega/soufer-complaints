const Database = require("./db");
const middlewares = require("./middlewares");
const routes = require("./routes");

module.exports = {
  routes,
  middlewares,
  Database,
};
