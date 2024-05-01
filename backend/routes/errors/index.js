class InvalidUserAccess extends Error {
  constructor() {
    super("Usuário e/ou senha inválidos");
    this.name = "InvalidUserAccess";
    this.status = 400;
  }
}

class UnidadeNotFound extends Error {
  constructor() {
    super("Unidade não encontrada ou não está ativa");
    this.name = "UnidadeNotFound";
    this.status = 400;
  }
}

class SetorNotFound extends Error {
  constructor() {
    super("Setor não encontrado ou não está ativo");
    this.name = "SetorNotFound";
    this.status = 400;
  }
}

class ProdutoNotFound extends Error {
  constructor() {
    super("Produto não encontrado ou não está ativo");
    this.name = "ProdutoNotFound";
    this.status = 400;
  }
}

class CategoriaNotFound extends Error {
  constructor() {
    super("Categoria não encontrada ou não está ativa");
    this.name = "CategoriaNotFound";
    this.status = 400;
  }
}

class RequiredFieldError extends Error {
  constructor(fieldname) {
    super(`O preenchimento do campo "${fieldname}" é obrigatório`);
    this.name = "RequiredFieldError";
    this.status = 400;
  }
}

module.exports = {
  InvalidUserAccess,
  UnidadeNotFound,
  SetorNotFound,
  ProdutoNotFound,
  CategoriaNotFound,
  RequiredFieldError,
};