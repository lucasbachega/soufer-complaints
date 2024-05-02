const { ObjectId } = require("mongodb");
const Database = require("../../db");

async function updateTexts({ collection, id, text }) {
  console.log(`Atualizando textos ref. "${collection}": ${text}`);
  Database.collection("ocorrencias")
    .updateMany(
      {
        [`${collection}._id`]: new ObjectId(id),
      },
      {
        $set: {
          [`${collection}.text`]: text,
        },
      }
    )
    .then(() => {
      console.log("Atualização concluída");
    })
    .catch((e) => {
      console.log("Erro na atualização dos textos em massa : ", e);
    });
}

module.exports = {
  updateTexts,
};
