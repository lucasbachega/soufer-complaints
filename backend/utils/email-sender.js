const nodemailer = require("nodemailer");

class EmailSender {
  static transporter = null;
  static start() {
    this.transporter = nodemailer.createTransport({
      host: "gruposoufer-com-br.mail.protection.outlook.com",
      port: 25,
      secure: false, // use SSL
      //   auth: {
      //     user: "1a2b3c4d5e6f7g",
      //     pass: "1a2b3c4d5e6f7g",
      //   },
    });
  }
  static sendEmail({ to, subject, html, cc }, retryNum = 1, callback) {
    if (!this.transporter) {
      console.error("WARNING: Email Sender Not Configured! Aborting...");
      return;
    }
    if (retryNum > 5) {
      console.error("WARNING: Email Sender Aborting... (MAX_TRIES)");
      return;
    }

    // Send the email
    this.transporter.sendMail(
      {
        from: " Portal Ocorrências soufer@soufer.com.br",
        to,
        subject,
        html,
        cc,
      },
      callback ||
        function (error, info) {
          if (error) {
            console.log("Error Send Email:", error);
            const t = setTimeout(() => {
              this.sendEmail({ to, subject, html, cc }, retryNum + 1);
              clearTimeout(t);
            }, 500);
          } else {
            console.log("Email sent:", info.response);
          }
        }
    );
  }
}

module.exports = {
  EmailSender,
};
