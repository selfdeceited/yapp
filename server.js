const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 8181
const socket = require("./services/socket")

server.listen(port, function () {
  console.log('Server listening at port %d', port)
})

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/dist/index.html')))

socket.init(io)

// TODO: add jslint