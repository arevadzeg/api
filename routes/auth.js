const router = require('express').Router()
const jwt = require('jsonwebtoken')
const users = require('../users')


router.post('/login', async (req, res) => {

    const user = users[req.body.username]
    if (user && user.password === req.body.password) {
        const { password, ...userInfo } = user
        const accessToken = jwt.sign({ ...userInfo }, 'secret', { expiresIn: '5d' })
        res.status(201).json({ userInfo, access_token: accessToken })
    }
    else {
        res.status(400).json({ msg: 'Invalid credentials' })
    }
})

module.exports = router
