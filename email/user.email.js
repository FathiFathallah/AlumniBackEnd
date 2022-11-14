const nodemailer = require('nodemailer');
const { toeknChanger } = require('./user.emailHTML');
module.exports.sendEmail = async function send(options) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "fatheali000king@gmail.com",
            pass: "ngbskppufosalyfh",
        }
    });

    console.log(options);
    
    href = `http://localhost:5000/signUp/verify/${options.token}`;
    const htmlEmailVerify = toeknChanger(href);
    let details = {
        from: '"Alumni Team" <fatheali000king@gmail.com>',
        to: options.emailAddress,
        subject: "Please verify your Alumni account!",
        text: "",
        html: htmlEmailVerify,
    };

    err = transporter.sendMail(details, (err, info) => {
        if (err) {
            console.log(err);
            send(options);
        }
        else {
            console.log(info);
        }
    });


};