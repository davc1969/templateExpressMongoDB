const jwt = require("../utils/jwt");
const { StatusCodes: httpCodes } = require("http-status-codes");

const auth = {
    checkAuth : async (req, res, next) => {
        const authHeaders = req.headers.authorization
        const token = authHeaders && authHeaders.split(" ").pop() //obtiene el token del Bearer de autentificaicón en el header del request
        const tokenData = await jwt.verifyToken(token);
        if (tokenData._id) {
            req.token = token;
            next()
        } else {
            res.status(httpCodes.FORBIDDEN);
            res.send( {
                error: "access not allowed.  Please Login"
            })
        }
    },

    checkRoles : (authRoles) => async (req, res, next) => {
        const authRolesUpper = authRoles.map( rol => { return rol.toUpperCase() } );
        try {
            const tokenData = await jwt.decodeToken(req.token);
            if ([].concat(authRolesUpper).includes(tokenData.role)) {
                next()
            } else {
                res.status(httpCodes.UNAUTHORIZED);
                res.send({
                    error: "user not authorized"
                })
            }
        } catch (error) {
            res.status(httpCodes.BAD_REQUEST);
            res.send( {
                error: "unexpected server error"
            })
        }
        
    }
}

module.exports = auth