const mongoose = require('mongoose')

const AutoBidSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    products: {
        type: [String],
        default: []
    },
    maxAmount: {
        type: Number,
        required: true
    },
    bidAlertNotification: {
        type: Number,
        required: true,
        maxAmount: 1,
        minAmount: 0
    }

}, { timestamps: true })


module.exports = mongoose.model("autobid", AutoBidSchema)