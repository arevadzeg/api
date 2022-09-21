const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },

    bidHistory: {
        type: [{ _id: String, status: String, price: Number }]
    }

}, { timestamps: true })


module.exports = mongoose.model("users", UserSchema)