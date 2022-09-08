const router = require('express').Router()
const Product = require('../models/Product')



router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(200).json({
            product: savedProduct
        })
    } catch (err) {
        res.status(400).json({ error: err?.errors })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            product: updatedProduct
        })
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
    try {
        const products = await Product.find()
        res.status(200).json({
            products
        })
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router