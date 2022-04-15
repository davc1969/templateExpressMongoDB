const { StatusCodes: httpCodes } = require("http-status-codes");
const httpError = require("../utils/httpErrorshandler");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const paymentsModel = require("../models/payments");
const { postPaymentSchema, updatePaymentSchema } = require("../config/joi");
const { validateSchema } = require("../utils/joi");

const getPayments = async (req, res) => {
    try {
        const listPayments = await paymentsModel.find({});
        res.status(httpCodes.OK);
        res.send({
            paymentsList: listPayments
        })
    } catch (error) {
        httpError(error, res)
    }
};

const getPayment = async (req, res) => {
    try {
        const listPayments = await paymentsModel.findOne({_id: req.params.id});
        res.status(httpCodes.OK);
        res.send({
            paymentsList: listPayments
        })
    } catch (error) {
        httpError(error, res)
    }
};

const createPayment = async (req, res) => {
    try {
        req.body._id = "pmt_" + uuidv4().slice(0, 6);
        req.body.object = "payment";
        req.body.currency = "clp";
        if (req.body.needs_exchange) {
            const searchDate = req.body.billed_at.substr(8, 2) + "-" + req.body.billed_at.substr(5, 2) + "-" +req.body.billed_at.substr(0, 4);
    
            const exchangeRateInfo = await getExchangeRate(searchDate);
            const ex_original_amount = req.body.billed_amount;
            const ex_exchange_currency = "clp";
            const ex_exchange_rate = exchangeRateInfo.data.serie[0].valor;

            req.body.exchange = {
                original_amount: ex_original_amount,
                currency: ex_exchange_currency,
                exchange_rate: ex_exchange_rate
            };
            req.body.amount = parseInt(ex_exchange_rate * req.body.billed_amount);

        };

        const validSchema = validateSchema(req.body, postPaymentSchema);
        if (!validSchema.error) {
            const response = await paymentsModel.create(req.body);
            res.status(httpCodes.CREATED);
            res.send({ 
                payment: response
            })
        } else {
            throw httpCodes.BAD_REQUEST
        }

    } catch (error) {
        httpError(error, res)
    }
};

const updatePayment = async (req, res) => {
    try {
        if (req.body.needs_exchange) {
            const searchDate = req.body.billed_at.substr(8, 2) + "-" + req.body.billed_at.substr(5, 2) + "-" +req.body.billed_at.substr(0, 4);
    
            const exchangeRateInfo = await getExchangeRate(searchDate);
            const ex_original_amount = req.body.billed_amount;
            const ex_exchange_currency = "clp";
            const ex_exchange_rate = exchangeRateInfo.data.serie[0].valor;

            req.body.exchange = {
                original_amount: ex_original_amount,
                currency: ex_exchange_currency,
                exchange_rate: ex_exchange_rate
            };
            req.body.amount = parseInt(ex_exchange_rate * req.body.billed_amount);

        };

        const validSchema = validateSchema(req.body, updatePaymentSchema);
        
        if (!validSchema.error) {
            const response = await paymentsModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(httpCodes.ACCEPTED);
            res.send({ 
                serverMessage: "payment succesfully updated"
            })
        } else {
            throw httpCodes.BAD_REQUEST
        }

    } catch (error) {
        httpError(error, res)
    }
};

const deletePayment = async (req, res) => {
    try {
        const listPayments = await paymentsModel.findByIdAndDelete({_id: req.params.id});
        res.status(httpCodes.ACCEPTED);
        res.send({
            serverMessage: "payment succesfully deleted"
        })
    } catch (error) {
        httpError(error, res)
    }
}


getExchangeRate = async (searchDate) => {
    try {
        const response = await axios.get("https://mindicador.cl/api/uf/" + searchDate);
        return response
    } catch (error) {
        console.error(error);
    }
}




module.exports = {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
}

