const router = require('express').Router()
const jwt = require('jsonwebtoken')
const users = require('../users')
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');
const generateInvoicePDF = require('../services/generateInvoicePDF');
require('dotenv').config({ path: '../.env' });


router.post('/login', async (req, res) => {

    const user = await User.findOne({ 'username': req.body.username }).populate('bidHistory', { strictPopulate: false })

    const x = await generateInvoicePDF('giotest9797@gmail.com', 'username', 123, 'productName')
    console.log(x)

    if (user && user.password === req.body.password) {
        const { password, bidHistory, ...userInfo } = user._doc
        const accessToken = jwt.sign({ ...userInfo }, process.env.SECRET_KEY, { expiresIn: '5d' })
        res.status(201).json({ userInfo, access_token: accessToken })
    }
    else {
        res.status(400).json({ msg: 'Invalid credentials' })
    }
})


router.post('/verifyToken', verifyToken, (req, res) => {
    const { iat, exp, ...data } = req.user
    res.status(200).json(data)
})

module.exports = router
