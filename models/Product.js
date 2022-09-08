const mongoose = require('mongoose')

const MoviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    auctionDate: {
        type: Number,
        required: true
    },
    onGoingPrice: {
        type: Number,
        required: true
    },
    bidHistory: {
        type: [{ bid: Number, bidder: String }]
    }

}, { timestamps: true })


module.exports = mongoose.model("products", MoviesSchema)