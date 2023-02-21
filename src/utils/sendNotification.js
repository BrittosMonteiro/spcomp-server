import mailer from "nodemailer";

const user = process.env.NOTIFICATION_EMAIL;
const pass = process.env.NOTIFICATION_PASS;

var transporter = mailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: { user, pass },
});

const html =
  '<div style="display: flex; flex-direction:column"><p>Hi!</p><p>A new inquiry is available and waiting for you to let us know your prices</p><p>You can check it clicking <a href="https://www.google.com">here</a></p></div>';

var mailOptions = {
  from: user,
  replyTo: user,
  to: "",
  bcc: "brittosmonteiro@gmail.com,brittosmonteiro@hotmail.com",
  subject: "SP Comp - New inquiry available",
  html: html,
};

export function sendEmail() {
  return transporter.sendMail(mailOptions);
}
