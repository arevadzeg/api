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
    res.status(200).json({ id: req.file.filename })
})

module.exports = router
