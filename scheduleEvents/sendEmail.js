const nodemailer = require("nodemailer");

module.exports.sendEmail = async function send(options) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fatheali000king@gmail.com",
      pass: "ngbskppufosalyfh",
    },
  });
  let details = {
    from: '"Alumni Team" <fatheali000king@gmail.com>',
    to: options.emailAddress,
    subject: `${options.eventType};${options.eventName};Event Reminder`,
    text: "",
    html: options.htmlEmail,
  };

  err = transporter.sendMail(details, (err, info) => {
    if (err) {
      console.log(err);
      send(options);
    } else {
      console.log(info);
    }
  });
};
