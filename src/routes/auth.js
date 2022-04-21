const authRoutes = require("express").Router();
const authController = require("../controllers/auth");


authRoutes.get("/", (req, res) => {
    authController.getUsers(req, res);
})
authRoutes.post("/register", (req, res) => {
    authController.registerUser(req, res);
});

authRoutes.post("/login", (req, res) => {
    authController.loginUser(req, res);
});

module.exports = authRoutes