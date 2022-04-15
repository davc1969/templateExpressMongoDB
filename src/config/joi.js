const Joi = require("joi");

const postPaymentSchema = Joi.object( {

    _id:Joi.required(),
    object: Joi.string().required(),
    description: Joi.string(),
    billed_hours: Joi.number().required(),
    billed_at: Joi.string().min(10).required(),
    billing_currency: Joi.string().max(5).required(),
    billed_amount: Joi.number().required(),
    amount: Joi.number().integer(),
    currency: Joi.string(),
    needs_exchange: Joi.boolean().required(),
    exchange_currency: Joi.string(),
    exchange: {
        original_amount: Joi.number(),
        exchange_currency: Joi.string().max(5),
        exchange_rate: Joi.number()
    }
});

const updatePaymentSchema = Joi.object( {

    description: Joi.string(),
    billed_hours: Joi.number().required(),
    billed_at: Joi.string().min(10).required(),
    billing_currency: Joi.string().max(5).required(),
    billed_amount: Joi.number().required(),
    amount: Joi.number().integer(),
    needs_exchange: Joi.boolean().required(),
    exchange_currency: Joi.string(),

});


module.exports = {
    postPaymentSchema,
    updatePaymentSchema
}