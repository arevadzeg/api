const express = require("express");
const authRoute = require('./routes/auth')
const cors = require('cors');


const app = express()
const http = require('http')
const server = http.createServer(app)
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



app.use('/api/auth', authRoute)


server.listen(3005, () => {
    console.log('Back end is Running')
})