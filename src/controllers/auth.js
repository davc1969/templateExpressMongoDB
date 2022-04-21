const { StatusCodes: httpCodes } = require("http-status-codes");
const httpError = require("../utils/httpErrorshandler");
const usersModel = require("../models/auth");
const { usersSchema } = require("../config/joi");
const { validateSchema } = require("../utils/joi");
const { hashText, validateHash } = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
const { sendEmail } = require("../utils/nodemailer");
const cOut = require("../utils/cOut");


const getUsers = async (req, res) => {
    try {
        const listUsers = await usersModel.find({});
        cOut.green(listUsers);
        res.status(httpCodes.OK);
        res.send({
            usersList: listUsers
        })
    } catch (error) {
        httpError(error, res)
    }
}

const registerUser = async (req, res) => {
    req.body.role = req.body.role.toUpperCase();
    try {
        const validSchema = validateSchema(req.body, usersSchema);
        if (!validSchema.error) {
            req.body.password = await hashText(req.body.password);

            usersModel.findOne( { email: req.body.email } ).exec()
            .then ( async (userFound) => {
                if (!userFound) {
                    const response = await usersModel.create(req.body);
                    res.status(httpCodes.CREATED);
                    res.send({ 
                        payment: response
                    });
                    sendMailToAdmins(req.body, "Register")
                } else {
                    res.status(httpCodes.FORBIDDEN).send({ error: "User already registered "})
                }
            })
            .catch ( (err) => {
                console.log("e", err);
            })
        } else {
            throw httpCodes.FORBIDDEN
        }
    } catch (error) {
        httpError(error, res)
    }
}

const loginUser = (req, res) => {
    usersModel.findOne( { email: req.body.email }).exec()
    .then( async (userFound) => {
        const validPwd = await validateHash(req.body.password, userFound.password);
        if (validPwd) {
            const token = await jwt.generateToken(userFound, userFound.role === "USER" ? "2h" : null)
            res.status(httpCodes.ACCEPTED);
            res.send( { email: userFound.email, 
                        role: userFound.role,
                        token: token} )
        } else {
            res.status(httpCodes.UNAUTHORIZED);
            res.send( { error: "incorrect password" } )
        }
    })
    .catch( (err) => {
        res.status(httpCodes.INTERNAL_SERVER_ERROR);
        res.send({ error: "not found"})
    })

}

const logout = (req, res) => {

}


const sendMailToAdmins = async (user, type) => {
    let subject = "";
    let html = "";
    if (type == "Register") {
        subject = "new user registered";
        html += `<H2>New User:</H2>`
        html += `<h4>${user.email}</h4>`
        html += `<p>has registered in the system as: ${user.role}</p>`
        html += `<br>`
        html += `<br>`
        html += `<p>You received this mail as System ADMIN</p>`
    };
    const listUsers = await usersModel.find( { role: "ADMIN"} );
    const adminList = listUsers.map(u => u.email);
    try {
        const response = await sendEmail(adminList, subject, html);
        cOut.info("   mail sent succesfully")
    } catch (error) {
        cOut.warning("mail couldn't be sent: ", error)
    } 
}


module.exports = {
    getUsers,
    registerUser,
    loginUser,
    logout
}