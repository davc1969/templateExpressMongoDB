
const morgan = require("morgan");
const fs = require("fs");

const startMorganLogger = (app, logFile) => {
    app.use(morgan('common', {
        stream: fs.createWriteStream(logFile, {flags: 'a'})
    }));
    app.use(morgan('dev'));
    console.log(`   ---> Morgan logger started. See log in ${logFile}`);
}

module.exports = startMorganLogger