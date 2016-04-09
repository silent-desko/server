export default (socket) => {
  return ({message}) => {
    console.log(message)
    socket.emit('chat', {message})
  }
} 
