// * Librería para poner color en las salidas a consola.  
// * Se utiliza el comando console.log y la librería chalk
// * para dar formato a la salida

const chalk = require("chalk");

const white = (...text) => console.log(chalk.white(newText(...text)));
const blue = (...text) => console.log(chalk.blue(newText(...text)));
const red = (...text) => console.log(chalk.red(newText(...text)));
const yellow = (...text) => console.log(chalk.yellow(newText(...text)));
const green = (...text) => console.log(chalk.green(newText(...text)));

const bgwhite = (...text) => console.log(chalk.bgWhite(newText(...text)));
const bgblue = (...text) => console.log(chalk.bgBlue(newText(...text)));
const bgred = (...text) => console.log(chalk.bgRed(newText(...text)));
const bgyellow = (...text) => console.log(chalk.bgYellow(newText(...text)));
const bggreen = (...text) => console.log(chalk.bgGreen(newText(...text)));

const error = (...text) => console.log(chalk.bgRed.whiteBright.bold(newText(...text)));
const warning = (...text) => console.log(chalk.bgYellow.whiteBright.underline(newText(...text)));
const info = (...text) => console.log(chalk.bgBlue.whiteBright.italic(newText(...text)))


const newText = (...text) => {
    return text.join( " " );
}

module.exports = {
    white,
    blue,
    red,
    yellow,
    green,
    bgwhite,
    bgblue,
    bgred,
    bgyellow,
    bggreen,
    error,
    warning,
    info
}