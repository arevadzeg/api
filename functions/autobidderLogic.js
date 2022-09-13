const AutoBid = require("../models/AutoBid")


const setterFunction = async (allMaxAmounts, product, newBidAmount) => {
    const newPrice = product.onGoingPrice + newBidAmount
    const newAutoBid = {
        bidder: allMaxAmounts[0].username,
        bid: newBidAmount,
        price: newPrice
    }
    product.bidHistory.unshift(newAutoBid)
    product.onGoingPrice = newPrice
    await product.save()
}

const autoBidderLogic = async (product, id, latestBid) => {

    const autoBids = await AutoBid.find({ products: id })
    if (autoBids.length === 0) return
    const allMaxAmounts = []
    autoBids.map((autoBid) => allMaxAmounts.push({ username: autoBid.username, amount: Number(autoBid.maxAmount / autoBid.products.length) })
    )
    allMaxAmounts.sort((a, b) => b.amount - a.amount)
    if (autoBids.length === 1 && allMaxAmounts[0].amount >= (product.onGoingPrice + 1)) {
        const newBidAmount = Math.floor(Number(latestBid) + 1)
        await setterFunction(allMaxAmounts, product, newBidAmount)
    }
    else if (allMaxAmounts[1]?.amount >= (product.onGoingPrice + 1)) {
        const newBidAmount = Math.floor(allMaxAmounts[1].amount + 1)
        await setterFunction(allMaxAmounts, product, newBidAmount)
    } else {
        return
    }
}





module.exports = autoBidderLogic