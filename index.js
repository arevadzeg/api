const express = require("express");
const authRoute = require('./routes/auth')
const uploadRoute = require('./routes/upload')
const productRoute = require('./routes/product')
const cors = require('cors');
const mongoose = require('mongoose')
const http = require('http')

const app = express()
const server = http.createServer(app)
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
mongoose.connect('mongodb+srv://giorgi:zxcvbnm123@cluster0.fqu6gce.mongodb.net/test').then(() => {
    console.log('Connected to DB For Real')
})



app.use('/api/auth', authRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/product', productRoute)


server.listen(3005, () => {
    console.log('Back end is Running')
})