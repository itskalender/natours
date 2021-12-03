const nodemailer = require("nodemailer");

function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: '"Kalender Toptaş" <toptaskalender@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
}

module.exports = sendEmail;