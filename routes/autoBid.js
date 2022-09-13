const router = require('express').Router()
const AutoBid = require('../models/AutoBid')
const verifyToken = require('../middleware/verifyToken')


router.post('/', verifyToken, async (req, res) => {

    const autoBidExists = await AutoBid.findOne({ username: req.user.username })
    console.log(autoBidExists)

    if (autoBidExists) {

        res.status(200).json(autoBidExists)


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

module.exports = router