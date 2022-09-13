const AutoBid = require('./models/AutoBid')
const Product = require('./models/Product')


const listener = () => { Product.watch().on('change', data => console.log(data.documentKey, data.updateDescription)) }


module.exports = listener