import {Router} from 'express'

import message from './socket/message'

export default (io) => {
  const socketRouter = Router()
  io.on('connection', (socket) => {
    socket.emit('notice', {
      message: 'Connected to chat'
    })
    socket.on('message', message(socket))
  })
  return socketRouter
}
