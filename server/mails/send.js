const nodemailer = require('nodemailer');

module.exports.sendEmail = (mailOptions, callback) => {
    let options = {
        ...mailOptions,
        from: process.env.SENDER,
        pwd: process.env.PASSWD,
    }
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAILPORT,
        // secure: process.env.SECURE,
        // requireTLS: process.env.REQUIRETLS,
        auth: {
            user: process.env.SENDER,
            pass: process.env.PASSWD
        }
    });

    transporter.sendMail(options, callback);
    transporter.close();
}