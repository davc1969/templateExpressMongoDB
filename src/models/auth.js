const { string } = require("joi");
const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema( {
    email: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("users", authUserSchema, "users")