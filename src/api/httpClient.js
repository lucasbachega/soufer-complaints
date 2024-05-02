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
      this._client.defaults.headers["api-access-token"] = r.accessToken;
    }
    return r;
  }

  /**
   * Listar unidades ativas disponíveis para seleção
   */
  static async listUnidades() {
    return this.get("/complaints/unidades");
  }
}

export { HttpClient };

