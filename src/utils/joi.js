const joi = require("joi");
const joiSchemas = require("../config/joi");
const cOut = require("../utils/cOut");

const startJoiService = () => {
    cOut.blue(`   ---> Joi service running. Schemas for validation located in /src/config/joi.js`);
    return 0
}


const validateSchema = (objectToValidate, schema) => {
    const validation =  schema.validate(objectToValidate);
    if (!validation.error) {
        cOut.green("   JOI validation: object is valid")
    } else {
        cOut.warning("   JOI validation: object is not valid");
        cOut.warning(validation.error);
    }
    return validation
}


module.exports = {
    startJoiService,
    validateSchema
}