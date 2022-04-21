require("dotenv").config();

const config = {

        PORT : process.env.PORT || 3000,

        authKey: process.env.AUTH_KEY || "simpleKey",

        Mongo_DB_URI : (process.env.NODE_ENV == "test") ? process.env.DB_URI_TEST : process.env.DB_URI,

        LOGFILE : process.env.LOGFILE || "/log/access.log",

        //email options
        emailHost : process.env.SMTP_HOST,
        emailUser : process.env.SMTP_USER,
        emailPassword : process.env.SMTP_PASSWORD,


}

module.exports = config