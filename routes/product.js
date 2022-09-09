const router = require('express').Router()
const Product = require('../models/Product')



router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(200).send(savedProduct)
    } catch (err) {
        res.status(400).json({ error: err?.errors })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updatedProduct)
    } catch (err) {
        res.status(400).json(err)
    }
})


router.delete('/:id', async (req, res) => {
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
    const perPage = 10
    try {
        const pages = await Product.estimatedDocumentCount()
        const products = await Product.find().skip((page - 1) * perPage).limit(perPage)
        res.status(200).json({ products, pages: Math.floor(pages / perPage) + 1 })
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router