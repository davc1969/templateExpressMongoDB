const { StatusCodes: httpCodes, getReasonPhrase } = require("http-status-codes");
const cOut = require("../utils/cOut");

const httpError = (err, res) => {
    cOut.error("error en server: ", err, getReasonPhrase(err));

    res.status(err);
    res.send(getReasonPhrase(err));
}

module.exports = httpError