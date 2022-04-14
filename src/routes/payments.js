const paymentsRoutes = require("express").Router();
const paymentsController = require("../controllers/payments")


paymentsRoutes.get("/", (req, res) => {
    paymentsController.getPayments(req, res)
});

paymentsRoutes.get ("/:id", (req, res) => {
    paymentsController.getPayment(req, res)
});

paymentsRoutes.post("/", (req, res) => {
    paymentsController.createPayment(req, res)
});

paymentsRoutes.put("/:id", (req, res) => {
    paymentsController.updatePayment(req, res)
});

paymentsRoutes.delete("/:id", (req, res) => {
    paymentsController.deletePayment(req, res)
});


module.exports = paymentsRoutes 