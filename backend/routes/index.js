const auth = require("./auth");
const admin = require("./admin");
const complaints = require("./complaints");
const transports = require("./transports");
const gestor = require("./gestor");
const tasks = require("./tasks");

module.exports = {
  auth,
  admin,
  complaints,
  gestor,
  tasks,
  transports,
};
