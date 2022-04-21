
const morgan = require("morgan");
const fs = require("fs");
const cOut = require("../utils/cOut");

const startMorganLogger = (app, logFile) => {
    app.use(morgan('common', {
        stream: fs.createWriteStream(logFile, {flags: 'a'})
    }));
    app.use(morgan('dev'));
    cOut.blue(`   ---> Morgan logger started. See log in ${logFile}`);
}

module.exports = startMorganLogger