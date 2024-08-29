import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

class HttpClient {
  static _client;
  static _accessToken = null;

  static setup() {
    this._client = axios.create({
      baseURL: apiURL,
      withCredentials: true,
    });
  }

  static async get(url, config) {
    try {
      const { data } = await this._client.get(url, config);
      return { ok: true, data };
    } catch (error) {
      console.error("GET HTTP CLIENT ERROR :: ", error);
      const _err = error?.response?.data || {
        code: error.name,
        message: error.message,
        details: error.toString(),
      };
      return {
        ok: false,
        error: _err,
      };
    }
  }

  static async post(url, body, config) {
    try {
      const { data } = await this._client.post(url, body, config);
      return data;
    } catch (error) {
      console.error("POST HTTP CLIENT ERROR :: ", error);
      const _err = error?.response?.data || {
        code: error.name,
        message: error.message,
        details: error.toString(),
      };
      return {
        ok: false,
        error: _err,
      };
    }
  }

  static async put(url, body, config) {
    try {
      const { data } = await this._client.put(url, body, config);
      return data;
    } catch (error) {
      console.error("PUT HTTP CLIENT ERROR :: ", error);
      const _err = error?.response?.data || {
        code: error.name,
        message: error.message,
        details: error.toString(),
      };
      return {
        ok: false,
        error: _err,
      };
    }
  }

  static async delete(url, config) {
    try {
      const { data } = await this._client.delete(url, config);
      return data;
    } catch (error) {
      console.error("DELETE HTTP CLIENT ERROR :: ", error);
      const _err = error?.response?.data || {
        code: error.name,
        message: error.message,
        details: error.toString(),
      };
      return {
        ok: false,
        error: _err,
      };
    }
  }
  /**
   * Efetuar o login no sistema
   * @param {*} {username, password} - nome de usuário e senha
   */
  static async login({ username, password }) {
    const r = await this.post("/auth/login", { username, password });
    if (r.ok) {
      this._client.defaults.headers["api-access-token"] = r.acessToken;
    }
    return r;
  }

  /**
   * Efetuar Teste de Login
   */
  static async testLogin() {
    const r = await this.get("/complaints/login/check");
    return r.data;
  }

  /**
   * Sair do Sistema (Logout)
   */
  static async logout() {
    return this.post("/auth/logout");
  }

  /**
   * Listar unidades ativas disponíveis para seleção
   */
  static async listUnidades() {
    return this.get("/complaints/unidades");
  }

  /**
   * Listar setores ativos disponíveis para seleção
   */
  static async listSetores() {
    return this.get("/complaints/setor");
  }

  /**
   * Listar produtos ativos disponíveis para seleção
   */
  static async listProdutos() {
    return this.get("/complaints/produtos");
  }

  /**
   * Listar categorias ativas disponíveis para seleção
   */
  static async listCategorias() {
    return this.get("/complaints/categorias");
  }

  /**
   * Registrar uma nova ocorrência
   */
  static async registrarOcorrencia({
    unidade,
    setor,
    produto,
    categoria,
    cliente,
    representante,
    ordem_venda,
    motivo,
  }) {
    return this.post("/complaints/register", {
      unidade_id: unidade,
      setor_id: setor,
      produto_id: produto,
      categoria_id: categoria,
      cliente,
      representante,
      ordem_venda,
      motivo,
    });
  }
  static async avaliarOcorrenciaCausa({ occurrenceId, rating }) {
    return this.put(`/complaints/${occurrenceId}/rating`, {
      ratingCausa: {
        number: rating,
        scale: 5,
      },
    });
  }
  static async avaliarOcorrenciaCorrecao({ occurrenceId, rating }) {
    return this.put(`/complaints/${occurrenceId}/rating`, {
      ratingCorrecao: {
        number: rating,
        scale: 5,
      },
    });
  }

  static async listMyOccurrences({
    period,
    unidade,
    categoria,
    produto,
    setor,
    status,
  }) {
    return this.get("/complaints/ocorrencias", {
      params: {
        unidade_id: unidade,
        categoria_id: categoria,
        produto_id: produto,
        setor_id: setor,
        period,
        status,
      },
    });
  }

  //Upload de arquivos (ocorrencia)
  static async uploadArquivos({ files = [], occurrenceId }) {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file.blob, file.filename);
    }
    if (occurrenceId) {
      formData.append("ocorrencia_id", occurrenceId);
    }
    return this.post("/complaints/upload", formData);
  }

  /**
   * Controle de administrador
   * Área restrita - Login necessário
   */
  static admin = {
    //uplaod arquivos ocorrencia admin
    async uploadOcorrenciaArquivos({ files = [], occurrenceId, type }) {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file.blob, file.filename);
      }
      if (type) {
        formData.append("type", type);
      }
      return HttpClient.post(
        `/admin/complaints/${occurrenceId}/uploadFiles`,
        formData
      );
    },

    /**
     * Listar ocorrências p/ admin de acordo com filtros
     */
    async listarOcorrencias({
      period,
      unidade,
      categoria,
      produto,
      setor,
      status,
    } = {}) {
      return HttpClient.get("/admin/complaints", {
        params: {
          unidade_id: unidade,
          categoria_id: categoria,
          produto_id: produto,
          setor_id: setor,
          period,
          status,
        },
      });
    },
    /**
     * Atualizar uma ocorrência
     * (alterar status e dados de análise)
     */
    async updateOcorrencia(
      id,
      { causa, correcao, status, deleteAdminAnexos, motivoRej } = {}
    ) {
      return HttpClient.put(`/admin/complaints/${id}`, {
        causa,
        correcao,
        status,
        deleteAdminAnexos,
        motivoRej,
      });
    },

    async exportarExcel({ period }) {
      return HttpClient.get(`/admin/complaints/export/excel`, {
        responseType: "blob",
        params: {
          period,
        },
      });
    },

    //USERS
    async createUser({
      firstname,
      username,
      password,
      email,
      roles,
      areas,
      assignAllAreas,
    }) {
      return HttpClient.post("/admin/users", {
        firstname,
        username,
        password,
        email,
        roles,
        areas,
        assignAllAreas,
      });
    },
    async listarUsers() {
      return HttpClient.get("/admin/users");
    },
    async updateUser(
      id,
      { firstname, username, roles, block, email, areas, assignAllAreas }
    ) {
      return HttpClient.put(`/admin/users/${id}`, {
        firstname,
        username,
        roles,
        block,
        email,
        areas,
        assignAllAreas,
      });
    },
    async deleteUser(id) {
      return HttpClient.delete(`/admin/users/${id}`);
    },

    //UNITS
    /**
     * Criar uma unidade
     */
    async createUnidade({ text }) {
      return HttpClient.post("/admin/unidades", { text });
    },
    /**
     * Listar todas as unidades cadastradas
     */
    async listarUnidades() {
      return HttpClient.get("/admin/unidades");
    },
    /**
     * Atualizar uma unidade
     */
    async updateUnidade(id, { text }) {
      return HttpClient.put(`/admin/unidades/${id}`, { text });
    },
    /**
     * Ativar/Desativar Unidade
     */
    async setActiveUnidade(id, active) {
      return HttpClient.put(`/admin/unidades/${id}`, { active: !!active });
    },
    /**
     * Remover uma unidade
     */
    async deleteUnidade(id) {
      return HttpClient.delete(`/admin/unidades/${id}`);
    },

    // SETOR
    // **********************************************************************
    /**
     * Criar um setor
     */
    async createSetor({ text }) {
      return HttpClient.post("/admin/setor", { text });
    },
    /**
     * Listar todas as Setores cadastradas
     */
    async listarSetores() {
      return HttpClient.get("/admin/setor");
    },
    /**
     * Atualizar um Setor
     */
    async updateSetor(id, { text }) {
      return HttpClient.put(`/admin/setor/${id}`, { text });
    },
    /**
     * Ativar/Desativar Setor
     */
    async setActiveSetor(id, active) {
      return HttpClient.put(`/admin/setor/${id}`, { active: !!active });
    },
    /**
     * Remover um Setor
     */
    async deleteSetor(id) {
      return HttpClient.delete(`/admin/setor/${id}`);
    },
    // **********************************************************************

    // PRODUTOS
    // **********************************************************************
    /**
     * Criar um Produto
     */
    async createProduto({ text }) {
      return HttpClient.post("/admin/produtos", { text });
    },
    /**
     * Listar todas os Produtos cadastradas
     */
    async listarProdutos() {
      return HttpClient.get("/admin/produtos");
    },
    /**
     * Atualizar um Produto
     */
    async updateProduto(id, { text }) {
      return HttpClient.put(`/admin/produtos/${id}`, { text });
    },
    /**
     * Ativar/Desativar Produto
     */
    async setActiveProduto(id, active) {
      return HttpClient.put(`/admin/produtos/${id}`, { active: !!active });
    },
    /**
     * Remover um Produto
     */
    async deleteProduto(id) {
      return HttpClient.delete(`/admin/produtos/${id}`);
    },
    // **********************************************************************

    // CATEGORIAS
    // **********************************************************************
    /**
     * Criar uma Categoria
     */
    async createCategoria({ text }) {
      return HttpClient.post("/admin/categorias", { text });
    },
    /**
     * Listar todas as Categorias cadastradas
     */
    async listarCategorias() {
      return HttpClient.get("/admin/categorias");
    },
    /**
     * Atualizar uma Categoria
     */
    async updateCategoria(id, { text }) {
      return HttpClient.put(`/admin/categorias/${id}`, { text });
    },
    /**
     * Ativar/Desativar Categoria
     */
    async setActiveCategoria(id, active) {
      return HttpClient.put(`/admin/categorias/${id}`, { active: !!active });
    },
    /**
     * Remover uma Categoria
     */
    async deleteCategoria(id) {
      return HttpClient.delete(`/admin/categorias/${id}`);
    },
    // **********************************************************************
  };

  // Controle GESTOR
  static gestor = {
    //uplaod arquivos ocorrencia admin
    async uploadOcorrenciaArquivos({ files = [], occurrenceId, type }) {
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file.blob, file.filename);
      }
      if (type) {
        formData.append("type", type);
      }
      return HttpClient.post(
        `/gestor/complaints/${occurrenceId}/uploadFiles`,
        formData
      );
    },

    /**
     * Listar ocorrências p/ gestor de acordo com filtros
     */
    async listarOcorrencias({
      period,
      unidade,
      categoria,
      produto,
      setor,
      status,
    } = {}) {
      return HttpClient.get("/gestor/complaints", {
        params: {
          unidade_id: unidade,
          categoria_id: categoria,
          produto_id: produto,
          setor_id: setor,
          period,
          status,
        },
      });
    },
    /**
     * Atualizar uma ocorrência
     * (alterar status e dados de análise)
     */
    async updateOcorrencia(
      id,
      { causa, correcao, status, deleteAdminAnexos, motivoRej } = {}
    ) {
      return HttpClient.put(`/gestor/complaints/${id}`, {
        causa,
        correcao,
        status,
        deleteAdminAnexos,
        motivoRej,
      });
    },

    async exportarExcel({ period }) {
      return HttpClient.get(`/gestor/complaints/export/excel`, {
        responseType: "blob",
        params: {
          period,
        },
      });
    },
  };
}

export { HttpClient };
