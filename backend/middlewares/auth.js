const jwt = require("jsonwebtoken");
const SECRET = process.env.API_SECRET_KEY || "InsecureSecret";

module.exports = (req, res, next) => {
  const token = req.headers["api-access-token"];
  if (!token) return res.status(400).send("API Access Token was not provided");
  try {
    const decoded = jwt.verify(token, SECRET, {});
    req.userId = decoded.userId;
    req.roles = decoded.roles;
    return next();
  } catch (error) {
    return res
      .status(401)
      .send("Invalid access token. Please, refresh or generate a new access token");
  }
};
