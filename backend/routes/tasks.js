const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const { TaskNotFound, AnexoNotFound } = require("./errors");
const { EmailSender } = require("../utils/email-sender");
const path = require("path");
const fs = require("fs");

// multer middleware (file upload)
const multerMid = require("../utils/multer-mid");

const router = express.Router();

// Listar tarefas
router.get("/", async (req, res) => {
  const { userId } = req;
  const { status } = req.query;
  const filters = {};
  if (status) filters.status = status;

  const tasks = await Database.collection("tasks")
    .find({
      "user._id": new ObjectId(userId.toString()),
      ...filters,
    })
    .sort({ createdAt: -1 })
    .toArray();
  return res.send(tasks);
});

// Detalhar tarefa
router.get("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  const task = await Database.collection("tasks").findOne({
    "user._id": new ObjectId(userId.toString()),
    _id: new ObjectId(id),
  });
  if (!task) throw new TaskNotFound();
  if (task.complaintId) {
    const ocorrencia = await Database.collection("ocorrencias").findOne({
      _id: task.complaintId,
    });
    task.ocorrencia = ocorrencia;
  }
  return res.send(task);
});

// Alterar status de uma tarefa (como finalizado/pendente)
router.put("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { status, deleteAnexos } = req.body;
  const editFields = {};

  const task = await Database.collection("tasks").findOne({
    "user._id": new ObjectId(userId.toString()),
    _id: new ObjectId(id),
  });
  if (!task) throw new TaskNotFound();

  const updateAnexos = {};
  if (deleteAnexos && Array.isArray(deleteAnexos) && deleteAnexos.length) {
    updateAnexos.$pull = {
      anexos: {
        filename: { $in: deleteAnexos },
      },
    };
    // Remover arquivo do file storage
    for (const filename of deleteAnexos) {
      const file = task?.anexos?.find((anexo) => anexo.filename === filename);
      if (file) {
        const { path: localpath, mimetype } = file;
        const urlFile = path.join(__dirname, "../../", localpath);
        try {
          fs.rmSync(urlFile);
        } catch (error) {
          console.error("Ocorreu uma falha interna ao remover anexos da tarefa :: ", id, error);
        }
      }
    }
  }

  if (status) editFields.status = status;

  await Database.collection("tasks").updateOne(
    {
      _id: task._id,
    },
    {
      $set: editFields,
      ...updateAnexos,
    }
  );

  // Notificar o gestor
  if (status === "finished") {
    EmailSender.sendEmail({
      to: task.createdBy.email,
      subject: "✅ Tarefa finalizada",
      html: `Olá ${(task.createdBy?.firstname || "").split(" ")[0]}! <br /><br />
          A tarefa que você registrou para <b>${task.user.firstname}</b> com a descrição <b>${
        task?.description
      }</b> foi finalizada: <br /><br />
         </b> <br />
          Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br <br />
          Atenciosamente, <br />
          Equipe Soufer
          `,
    });
  }

  return res.send({ ok: true });
});

/**
 * Upload de anexos
 */
router.post("/upload", multerMid.array("files", 5), async (req, res) => {
  const files = req.files;
  const { userId } = req;
  const taskId = req.body.taskId;
  if (!taskId) {
    throw new TaskNotFound();
  }
  const task = await Database.collection("tasks").findOne({
    "user._id": new ObjectId(userId.toString()),
    _id: new ObjectId(taskId),
  });
  if (!task) {
    throw new TaskNotFound();
  }

  const anexos = [];

  for (let i = 0; i < files.length; i++) {
    const { originalname, mimetype, filename, path, size } = files[i];
    anexos.push({
      originalname,
      mimetype,
      filename,
      path,
      size,
      upload_at: new Date(),
    });
  }

  // Save to database
  await Database.collection("tasks").updateOne(
    { _id: task._id },
    {
      $push: {
        anexos: {
          $each: anexos,
          $position: 0,
        },
      },
    }
  );

  return res.status(201).send({
    ok: true,
    anexos,
  });
});

/**
 * Streaming anexos
 */
router.get("/:id/file/:filename", async (req, res) => {
  const { id, filename } = req.params;
  const task = await Database.collection("tasks").findOne({
    _id: new ObjectId(id),
  });
  if (!task) {
    throw new TaskNotFound();
  }

  let file;
  const anexos = task.anexos || [];
  const taskFile = anexos.find((anexo) => anexo.filename === filename);
  if (!taskFile) throw new AnexoNotFound();
  file = taskFile;
  const { path: localpath, mimetype } = file;
  const urlFile = path.join(__dirname, "../../", localpath);

  res.setHeader("Content-Type", mimetype);
  if (!fs.existsSync(urlFile)) {
    throw new AnexoNotFound();
  }
  fs.createReadStream(urlFile).pipe(res);
});

module.exports = router;
