const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    _id:            { type: String, required: true },
    object:         { type: String, required: true},
    description:    { type: String },
    billed_hours:   { type: Number, required: true},
    billed_at:      { type: String, required: true},
    billing_currency: { type: String, required: true},
    billed_amount:  { type: Number, required: true},
    amount:         { type: Number },
    currency:       { type: String },
    needs_exchange: { type: Boolean, required: true },
    exchange_currency: { type: String },
    exchange:       {
        original_amount: { type: Number },
        currency:        { type: String },
        exchange_rate:   { type: Number },
    }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


module.exports = mongoose.model("payments", paymentSchema)