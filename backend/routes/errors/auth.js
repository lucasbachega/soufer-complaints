class InvalidUserAccess extends Error {
  constructor() {
    super("Usuário e/ou senha inválidos");
    this.name = "InvalidUserAccess";
    this.status = 400;
  }
}

module.exports = {
  InvalidUserAccess,
};
