const express = require("express");
const app = express()

const http = require('http')

const server = http.createServer(app)
app.use(express.json());


server.listen(3005, () => {
    console.log('Back end is Running')
})