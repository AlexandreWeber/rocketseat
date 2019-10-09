const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const app = express()
const path = require('path')
const server = http.Server(app)
const io = socketio(server)


mongoose.connect('mongodb+srv://awd:awd@cluster0-bup7v.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {}

io.on('connection', socket => {
	const { user_id } = socket.handshake.query

	connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
	req.io = io
	req.connectedUsers = connectedUsers

	return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333)