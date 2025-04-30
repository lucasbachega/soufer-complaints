const express = require("express");
const Database = require("../db");
const { ObjectId } = require("mongodb");
const {} = require("./errors");
const { EmailSender } = require("../utils/email-sender");
const router = express.Router();
const { format, isToday, isYesterday, isThisYear, parseISO } = require("date-fns");
const { ptBR } = require("date-fns/locale");

function formatMoment(dateInput) {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : new Date(dateInput);

  const dayMonth = format(date, "d 'de' MMM", { locale: ptBR });
  const year = isThisYear(date) ? "" : ` de ${format(date, "yyyy")}`;
  const time = format(date, "HH:mm");
  const label = isToday(date) ? " (hoje)" : isYesterday(date) ? " (ontem)" : "";

  return `${dayMonth}${year} às ${time}${label}`;
}

//Listar transportes
router.get("/", async (req, res) => {
  const user_id = req.userId;
  const { role } = req.query;

  const filters = {};

  if (role === "personal") {
    filters["user._id"] = new ObjectId(user_id);
  } else if (role === "approver") {
    filters.status = "pending";
  } else if (role === "carrier") {
    filters.status = "approved";
  }

  const transports = await Database.collection("transports")
    .find(filters)
    .sort({ created_at: -1 })
    .toArray();

  return res.send(transports || []);
});

//Solicitar transporte
router.post("/request", async (req, res) => {
  const user_id = req.userId;
  const body = req.body;

  const _user = await Database.collection("users").findOne({
    _id: new ObjectId(user_id),
  });

  if (!_user) {
    return res.status(404).send({ message: "Usuário não encontrado." });
  }

  try {
    const transport = {
      user: {
        _id: new ObjectId(user_id),
        name: _user.firstname,
        email: _user.email,
      },
      points: body.points,
      time: body.time,
      timeReturn: body.timeReturn,
      people: body.people,
      shift: body.shift,
      notes: body.notes,
      status: "pending",
      created_at: new Date(),
    };

    const result = await Database.collection("transports").insertOne(transport);

    // Disparar e-mail para os aprovadores
    const approvers = await Database.collection("users")
      .find({
        transportRoles: "approver",
      })
      .toArray();
    for (const approver of approvers) {
      EmailSender.sendEmail({
        to: approver.email,
        subject: "Nova solicitação de transporte",
        html: `Olá ${(approver?.firstname || "").split(" ")[0]}! <br /><br />
          Você tem uma nova solicitação de transporte para aprovar. Confira os detalhes: <br /><br />

          <ul>
            <li><b>Rotas</b>: ${transport.points.join(",")}</li>
            <li><b>Partida</b>: ${formatMoment(new Date(transport.time))}</li>
            <li><b>Retorno</b>: ${formatMoment(new Date(transport.timeReturn))}</li>
            <li><b>Notas</b>: ${transport.notes}</li>
          </ul>
           
         </b> <br />
          Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br/transport?tab=approver <br />
          Atenciosamente, <br />
          Equipe Soufer
          `,
      });
    }

    return res.status(201).send({ _id: result.insertedId, ...transport });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao solicitar transporte" });
  }
});

// /routes/transports.js
router.get("/stats", async (req, res) => {
  const userId = req.userId;

  try {
    const [personal, approver, carrier] = await Promise.all([
      Database.collection("transports").countDocuments({
        "user._id": new ObjectId(userId),
      }),
      Database.collection("transports").countDocuments({ status: "pending" }),
      Database.collection("transports").countDocuments({ status: "approved" }),
    ]);

    return res.send({
      personal,
      approver,
      carrier,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao buscar estatísticas" });
  }
});

// Aprovar transporte (approver)
router.post("/:id/approve", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const _approver = await Database.collection("users").findOne({
    _id: new ObjectId(userId),
  });

  try {
    const result = await Database.collection("transports").updateOne(
      { _id: new ObjectId(id), status: "pending" },
      { $set: { status: "approved", approved_at: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: "Não foi possível aprovar" });
    }

    const transport = await Database.collection("transports").findOne({
      _id: new ObjectId(id),
    });

    // Disparar e-mail para as transportadoras
    const carriers = await Database.collection("users")
      .find({
        transportRoles: "carrier",
      })
      .toArray();
    for (const carrier of carriers) {
      EmailSender.sendEmail({
        to: carrier.email,
        subject: "Nova solicitação de transporte",
        html: `Olá ${(carrier?.firstname || "").split(" ")[0]}! <br /><br />
         Você tem uma nova solicitação de transporte para aprovar. Confira os detalhes: <br /><br />

         <ul>
           <li><b>Rotas</b>: ${transport.points.join(",")}</li>
           <li><b>Partida</b>: ${formatMoment(new Date(transport.time))}</li>
           <li><b>Retorno</b>: ${formatMoment(new Date(transport.timeReturn))}</li>
           <li><b>Notas</b>: ${transport.notes}</li>
         </ul>
          
        </b> <br />
         Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br/transport?tab=carrier <br />
         Atenciosamente, <br />
         Equipe Soufer
         `,
      });
    }

    // Dispara e-mail para o solicitante
    EmailSender.sendEmail({
      to: transport.user?.email,
      subject: "Sua solicitação está aguardando a confirmação da transportadora",
      html: `Sua solicitação de transporte foi aprovada por ${
        _approver?.name
      } e está aguardando a confirmação da transportadora. Confira os detalhes: <br /><br />

       <ul>
         <li><b>Rotas</b>: ${transport.points.join(",")}</li>
         <li><b>Partida</b>: ${formatMoment(new Date(transport.time))}</li>
         <li><b>Retorno</b>: ${formatMoment(new Date(transport.timeReturn))}</li>
         <li><b>Notas</b>: ${transport.notes}</li>
       </ul>
        
      </b> <br />
       Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br/transport?tab=personal <br />
       Atenciosamente, <br />
       Equipe Soufer
       `,
    });

    return res.send({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Erro ao aprovar transporte" });
  }
});

// Confirmar transporte (carrier)
router.post("/:id/confirm", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Database.collection("transports").updateOne(
      { _id: new ObjectId(id), status: "approved" },
      { $set: { status: "confirmed", confirmed_at: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: "Não foi possível confirmar" });
    }

    const transport = await Database.collection("transports").findOne({
      _id: new ObjectId(id),
    });

    // Disparar e-mail para os aprovadores
    const approvers = await Database.collection("users")
      .find({
        transportRoles: "approver",
      })
      .toArray();
    for (const user of [...approvers, transport.user]) {
      EmailSender.sendEmail({
        to: user.email,
        subject: "Solicitação de transporte aprovada",
        html: `Olá ${(user?.firstname || "").split(" ")[0]}! <br /><br />
        A solicitação de transporte foi aprovada. Confira os detalhes: <br /><br />
         <ul>
           <li><b>Rotas</b>: ${transport.points.join(",")}</li>
           <li><b>Partida</b>: ${formatMoment(new Date(transport.time))}</li>
           <li><b>Retorno</b>: ${formatMoment(new Date(transport.timeReturn))}</li>
           <li><b>Notas</b>: ${transport.notes}</li>
         </ul>
        </b> <br />
         Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br <br />
         Atenciosamente, <br />
         Equipe Soufer
         `,
      });
    }
    
    return res.send({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Erro ao confirmar transporte" });
  }
});

// Rejeitar transporte (approver ou carrier)
router.post("/:id/reject", async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const user_id = req.userId;

  try {
    const _user = await Database.collection("users").findOne({
      _id: new ObjectId(user_id),
    });

    if (!_user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const update = {
      status: "rejected",
      rejectedBy: {
        _id: _user._id,
        name: _user.firstname,
        email: _user.email,
      },
      rejectedAt: new Date(),
      rejectionReason: reason,
    };

    const result = await Database.collection("transports").updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Transporte não encontrado ou já atualizado." });
    }

    const transport = await Database.collection("transports").findOne({
      _id: new ObjectId(id),
    });

    // Dispara e-mail para o solicitante
    EmailSender.sendEmail({
      to: transport.user?.email,
      subject: `Sua solicitação foi rejeitada`,
      html: `Sua solicitação foi rejeitada por ${_user?.name}.  Confira os detalhes: <br /><br />

        <b>Motivo de rejeição</b>:<i>${reason}</i>  <br />
       <ul>
         <li><b>Rotas</b>: ${transport.points.join(",")}</li>
         <li><b>Partida</b>: ${formatMoment(new Date(transport.time))}</li>
         <li><b>Retorno</b>: ${formatMoment(new Date(transport.timeReturn))}</li>
         <li><b>Notas</b>: ${transport.notes}</li>
       </ul>
        
      </b> <br />
       Acesse o portal para mais informações: https://ocorrencias.gruposoufer.com.br/transport?tab=personal <br />
       Atenciosamente, <br />
       Equipe Soufer
       `,
    });

    return res.send({ ok: true });
  } catch (err) {
    console.error("Erro ao rejeitar transporte:", err);
    return res.status(500).send({ message: "Erro interno ao rejeitar transporte." });
  }
});

module.exports = router;
