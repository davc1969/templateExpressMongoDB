const paymentsRoutes = require("express").Router();
const paymentsController = require("../controllers/payments");
const { checkAuth, checkRoles } = require("../middlewares/auth")


paymentsRoutes.get("/", checkAuth, (req, res) => {
    paymentsController.getPayments(req, res)
});

paymentsRoutes.get ("/:id", (req, res) => {
    paymentsController.getPayment(req, res)
});

paymentsRoutes.post("/", checkAuth, checkRoles(["ADMIN"]), (req, res) => {
    paymentsController.createPayment(req, res)
});

paymentsRoutes.put("/:id", (req, res) => {
    paymentsController.updatePayment(req, res)
});

paymentsRoutes.delete("/:id", (req, res) => {
    paymentsController.deletePayment(req, res)
});


module.exports = paymentsRoutes 