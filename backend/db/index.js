const { MongoClient } = require("mongodb");

module.exports = class Database {
  static _db;

  static async connect() {
    try {
      const client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
      this._db = client.db("soufer_c");
    } catch (error) {
      throw `Falha na conexão com o banco de dados: ${error.toString()}`;
    }
  }
  static client() {
    return this._db;
  }
  static collection(name) {
    return this._db.collection(name);
  }
};
