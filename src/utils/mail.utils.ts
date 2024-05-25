import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  host: String(process.env.MAIL_HOST),
  port: Number(process.env.MAIL_PORT),
  secure: true,
  requireTLS: true,
  auth: {
    user: String(process.env.MAIL_USER),
    pass: String(process.env.MAIL_PASS),
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  logger: true
});

export async function sendMail(html:string, emailUser:string, emailSubject:string){
  const mailOptions = {
    from: `Ethernum <${String(process.env.MAIL_USER)}>`,
    to: emailUser,
    subject: emailSubject,
    html,
    text: html
  };
  try {
    return await transport.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
};

