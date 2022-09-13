

const autoBidderLogic = async (allMaxAmounts, product, newBidAmount) => {
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




module.exports = autoBidderLogic