const nodemailer = require('nodemailer');

module.exports.sendEmail = async (options) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "fatheali000king@gmail.com",
            pass: "ngbskppufosalyfh",
        }
    });

    module.exports.href = `http://localhost:5000/signUp/verify/${options.token}`;
    const { htmlEmailVerify } = require('./user.emailHTML');
    transporter.sendMail({
        from: '"Alumni Team" <fatheali000king@gmail.com>',
        to: options.emailAddress,
        subject: "Please verify your Alumni account!",
        text: "",
        html: htmlEmailVerify,
    }, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    });
};