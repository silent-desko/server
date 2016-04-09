import express from 'express'
import socketIo from 'socket.io'

import socket from 'api/socket'
import audio from 'api/audio'

const app = express()

const io = socketIo()
io.set('origins', 'http://localhost:8080')
app.io = io

app.use(socket(io))

module.exports = app
