const router = require('express').Router()
const AutoBid = require('../models/AutoBid')
const verifyToken = require('../middleware/verifyToken')


router.post('/', verifyToken, async (req, res) => {

    const autoBidExists = await AutoBid.findOne({ username: req.user.username })
    if (autoBidExists) {
        const updatedProduct = await AutoBid.findByIdAndUpdate(autoBidExists._id, { $set: req.body }, { new: true })
        res.status(200).json(updatedProduct)
    } else {
        try {
            const newAutoBid = new AutoBid({ username: req.user.username, ...req.body })
            const response = await newAutoBid.save()
            res.status(200).json(response)
        } catch (err) {
            res.status(400).json(err)
        }
    }
})


router.get('/', verifyToken, async (req, res) => {

    const autoBidExists = await AutoBid.findOne({ username: req.user.username })
    if (autoBidExists) {
        res.status(200).json(autoBidExists)
    } else {
        res.status(400).json('Autobid not found')
    }
})


module.exports = router