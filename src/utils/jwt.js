const jwtDriver = require("jsonwebtoken");
const { authKey } = require("../config/config");
const cOut = require("../utils/cOut");


const jwt = {
    initializeJWT : () => {
        cOut.blue("   ---> JSON Web Token service running ");
    },


    generateToken : async (user, expirationTime) => {
        const timeToExpire = expirationTime;
        const obj = {
            a: {
                _id: user._id,
                role: user.role
            },
            authKey,
            ...timeToExpire && { expiresIn: timeToExpire }
        }
        const token = await jwtDriver.sign({
            _id: user._id,
            role: user.role
        },
        authKey,
        { ...timeToExpire && { expiresIn: timeToExpire } }
        );
        return token
    },

    decodeToken : async (token) => {
        try {
            const tokenData = await jwtDriver.decode(token);
            cOut.green(tokenData);
            return tokenData
        } catch (error) {
            return null
        }
    },

    verifyToken : async (token) => {
        try {
            return jwtDriver.verify(token, authKey);
        } catch (error) {
            console.log("error in verify Token: ", error)
            return false
        }
    }
}

module.exports = jwt