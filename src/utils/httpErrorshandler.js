const { StatusCodes: httpCodes, getReasonPhrase } = require("http-status-codes");

const httpError = (err, res) => {
    console.log("error en server: ", err, getReasonPhrase(err));

    res.status(err);
    res.send(getReasonPhrase(err));
}

module.exports = httpError