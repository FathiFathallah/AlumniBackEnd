const nodemailer = require("nodemailer");
const { htmlreturn } = require("./htmlJS");

module.exports.sendEmail = async function send(options) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fatheali000king@gmail.com",
      pass: "ngbskppufosalyfh",
    },
  });
  let aaa = htmlreturn();
  let details = {
    from: '"Alumni Team" <fatheali000king@gmail.com>',
    to: "fathe-ali-7@hotmail.com",
    subject: "Event Reminder",
    text: "",
    html: aaa,
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
