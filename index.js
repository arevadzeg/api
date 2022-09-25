const express = require("express");
const authRoute = require('./routes/auth')
const uploadRoute = require('./routes/upload')
const productRoute = require('./routes/product')
const autoBid = require('./routes/autoBid')
const cors = require('cors');
const mongoose = require('mongoose')
const http = require('http')
require('dotenv').config({ path: './.env' });

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',

    }
})
io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        console.log(room)
        socket.join(room)
    })
    socket.on('disconnect', (room) => {
        socket.leave(room)
    })
})

app.use(function (req, res, next) {
    res.io = io;
    next();
});


mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() => {
    console.log('Connected to DB For Real')
})


app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use('/api/auth', authRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/product', productRoute)
app.use('/api/autobid', autoBid)


server.listen(3005, () => {
    console.log('Back end is Running')
})