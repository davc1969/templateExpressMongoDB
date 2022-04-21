const bcrypt = require("bcrypt");
const cOut = require("../utils/cOut");

const hashText = async (text) => {
    const salt = await bcrypt.genSalt(10);
    const hashedText = await bcrypt.hash(text, salt);
    return hashedText
}


const validateHash = async (text, hashedText) => {
    try {
        const valid = await bcrypt.compare(text, hashedText);
        return valid
    } catch (error) {
        cOut.error("error in bcrypt: ", error );
        return false
    }
}


module.exports = {
    hashText,
    validateHash
}