module.exports.getAlumniIcon = (req, res) => {
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "//email//" +
      "alumni.25214fe2055074090567.jpg"
  );
};

module.exports.getCheckSign = (req, res) => {
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "//email//" +
      "check-circle-solid.svg"
  );
};

module.exports.getErrorSign = (req, res) => {
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "//email//" +
      "circle-exclamation-solid.svg"
  );
};

const nodemailer = require("nodemailer");
module.exports.sendEmailTopAdmin = async function send(options) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fatheali000king@gmail.com",
      pass: "ngbskppufosalyfh",
    },
  });

  let details = {
    from: '"Alumni Team" <fatheali000king@gmail.com>',
    to: options.topAdminEmailAddress,
    subject: "Customer Contact!",
    text: `
    Customer Comments:
    ${options.comments}


    E-Mail: ${options.emailAddress}
    Username: ${options.name}
    `,
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
