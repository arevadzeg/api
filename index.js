const express = require("express");
const authRoute = require('./routes/auth')
const uploadRoute = require('./routes/upload')
const productRoute = require('./routes/product')
const autoBid = require('./routes/autoBid')
const cors = require('cors');
const mongoose = require('mongoose')
const http = require('http')
const listener = require('./autoBidListener.js')
require('dotenv').config({ path: './.env' });

const app = express()
const server = http.createServer(app)
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() => {
    console.log('Connected to DB For Real')
})

// listener()

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use('/api/auth', authRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/product', productRoute)
app.use('/api/autobid', autoBid)


server.listen(3005, () => {
    console.log('Back end is Running')
})