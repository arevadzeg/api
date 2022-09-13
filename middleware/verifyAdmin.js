const jwt = require('jsonwebtoken')


const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, 'secret', (err, tokenContent) => {
            if (tokenContent.role !== 'admin') {
                res.status(403).json("Only admin users are allowed to make requests")
            }
            if (err) res.status(403).json(err)
            next()
        })
    }
    else {
        return res.status(401).json("You are not Authenticated")
    }
}

module.exports = verifyAdmin