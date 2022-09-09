const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/single', upload.single('image'), async (req, res) => {
    res.status(200).send(["http://localhost:3005/images/" + req.file.filename])
})


router.post('/multiple', upload.array('image', 10), async (req, res) => {
    const names = []
    req.files.forEach((file) => names.push("http://localhost:3005/images/" + file.filename))
    res.status(200).send(names)
})

module.exports = router
