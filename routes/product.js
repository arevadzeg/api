const router = require('express').Router()
const Product = require('../models/Product')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const AutoBid = require('../models/AutoBid')
const autoBidderLogic = require('../functions/autobidderLogic')
const schedule = require('node-schedule');
const User = require('../models/User')


router.post('/', verifyAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(200).send(savedProduct)
        schedule.scheduleJob(savedProduct.auctionDate, async () => {
            const res = await Product.findByIdAndUpdate(savedProduct._id, { $set: { active: false } }, { new: true })
        })
    } catch (err) {
        res.status(400).json({ error: err?.errors })
    }
})


router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updatedProduct)
    } catch (err) {
        res.status(400).json(err)
    }
})


router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndDelete(req.params.id, { new: true })
        res.status(200).json({
            message: 'deleted'
        })
    } catch (err) {
        res.status(400).json(err)
    }
})


router.get('/', async (req, res) => {
    const page = req.query.page || 1
    const search = req.query.search || ""
    const sort = req.query.sort || ""
    const perPage = 10
    const descriptionRegex = { 'description': { "$regex": search, "$options": "i" } }
    const nameRegex = { 'name': { "$regex": search, "$options": "i" } }
    try {
        const pages = await Product.find(search ? { $or: [descriptionRegex, nameRegex] } : {}).countDocuments()
        const products = await Product.find(search ? { $or: [descriptionRegex, nameRegex] } : {})
            .sort(sort ? { onGoingPrice: sort } : {})
            .skip((page - 1) * perPage)
            .limit(perPage)


        res.status(200).json({ products, pages: Math.floor(pages / perPage) + 1 })
    } catch (err) {
        res.status(400).json(err)
    }
})


router.get('/:id', async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/bidhistory/:id', async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        res.status(200).json(products.bidHistory)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/bid/:id', verifyToken, async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
        const user = await User.findById(req.user._id)
        product.bidHistory.unshift(req.body.bidHistory)
        product.onGoingPrice = Number(req.body.onGoingPrice)
        if (!user.bidHistory.includes(req.params.id)) {
            user.bidHistory.push(req.params.id)
        }
        res.io.to(req.params.id).emit('bidPlaced', { newPrice: req.body.onGoingPrice, newBidHistory: product.bidHistory })
        await product.save()
        await user.save()
        console.log('aqamde tu movida')

        await autoBidderLogic(product, req.params.id, req.body.bidHistory.bid, res.io)
        res.status(200).json('bid successful')
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})




module.exports = router