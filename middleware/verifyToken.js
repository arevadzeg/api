const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' });


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, tokenContent) => {
            if (err) res.status(403).json(err)
            else {
                req.user = tokenContent
                next()
            }
        })
    }
    else {
        return res.status(401).json("You are not Authenticated")
    }
}

module.exports = verifyToken