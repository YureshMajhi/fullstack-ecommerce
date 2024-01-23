"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST,
  // port: process.env.SMTP_PORT,
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // user: process.env.SMTP_USER,
    // pass: process.env.SMTP_PASS,
    user: process.env.SMTP_USER_APP,
    pass: process.env.SMTP_PASS_APP,
  },
});

async function emailSender({ from, to, subject, text, html }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

// emailSender().catch(console.error);

module.exports = { emailSender };
