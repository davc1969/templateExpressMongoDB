const nodemailer = require('nodemailer');
const config = require("../config/config");
const cOut = require("../utils/cOut")


const startMailService = () => {
    cOut.blue(`   ---> Mail service initiated using host: ${config.emailHost}`);
}


const sendEmail = async (to, subject, html) => {
    
    const transporter = nodemailer.createTransport({
        service: config.emailHost,
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        html
    };

    const message = await transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            cOut.error("   mailer error: ", err)
            return (err);
        } else {
            cOut.bgblue("   .message succesfully sent: ", message.messageId);
            return (data);
        }
    });

}

module.exports = {
    startMailService,
    sendEmail
};