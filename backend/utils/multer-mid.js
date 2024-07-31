const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { nanoid } = require("@reduxjs/toolkit");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const today = new Date();
      const str = today.toLocaleDateString("pt-BR");
      const [dia, mes, ano] = str.split("/");
      const uri = `./files/${ano}/${dia}-${mes}`;

      if (!fs.existsSync(uri)) {
        fs.mkdirSync(uri, { recursive: true });
      }
      return callback(null, uri);
    },
    filename: function (req, file, cb) {
      cb(null, nanoid(8) + path.extname(file.originalname)); //Appending extension
    },
  }),
  limits: {
    // no larger than 30mb.
    fileSize: 30 * 1024 * 1024,
  },
});
