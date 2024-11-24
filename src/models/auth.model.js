const { Schema, model } = require("mongoose");

const authScheme = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "famale", "trans", "gay"],
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {timestamps: true})

module.exports = model("Auth", authScheme)