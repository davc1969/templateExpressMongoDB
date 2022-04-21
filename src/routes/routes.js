const routes = require("express").Router();
const fs = require("fs");
const { StatusCodes: httpCodes } = require("http-status-codes");
const httpError = require("../utils/httpErrorshandler");
const cOut = require("../utils/cOut");

const pathRouter = `${__dirname}`;

const removeExtensionFromFile = (fileName) => {
    return fileName.split(".").shift();
}

//! This code loads the routes files in this folder, so you dont need to load them from the index.js
fs.readdirSync(pathRouter).filter( (file) => {
    const filenameWithoutExtension = removeExtensionFromFile(file);
    const skipFile = ["routes"].includes(filenameWithoutExtension);
    if (!skipFile) {
        routes.use(`/${filenameWithoutExtension}`, require(`./${filenameWithoutExtension}`));
        cOut.bgblue("   ...loading router file: " + filenameWithoutExtension);
    }
});

routes.get("/", (req, res) => {
    res.status(httpCodes.OK)
    res.send("welcome to payments API resource! ")
});


routes.get("*", (req, res) => {
    httpError(httpCodes.NOT_FOUND, res)
})


module.exports = {routes}