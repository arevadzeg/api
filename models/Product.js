const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        default: []
    },
    auctionDate: {
        type: Date,
        required: true
    },
    onGoingPrice: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    bidHistory: {
        type: [{ bid: Number, bidder: String, price: Number }]
    }

}, { timestamps: true })


module.exports = mongoose.model("products", ProductSchema)