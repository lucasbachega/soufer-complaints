const jwt = require("jsonwebtoken");
const SECRET = process.env.API_SECRET_KEY || "InsecureSecret";

module.exports =
  ({ restrictAcess, role }) =>
  (req, res, next) => {
    const token =
      req.headers["api-access-token"] || req?.cookies?.portaloc_access_token;
    if (!token)
      return res.status(400).send("API Access Token was not provided");
    try {
      const decoded = jwt.verify(token, SECRET, {});
      req.userId = decoded.userId;
      req.roles = decoded.roles;
      req.areas = decoded.assignAllAreas ? undefined : decoded.areas;

      if (restrictAcess && !req?.roles.includes(role)) {
        return res
          .status(403)
          .send("Acesso restrito somente para administradores");
      }

      return next();
    } catch (error) {
      return res
        .status(401)
        .send(
          "Invalid access token. Please, refresh or generate a new access token"
        );
    }
  };
