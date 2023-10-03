function listen(io) {
  // namespaces allow to share multiple logics or apps on the same server
  // ex one namespace for pong, another one for a tetris game or chat 
  const pongNamespace = io.of('/pong');
  let readyPlayerCount = 0;

  pongNamespace.on('connection', (socket) => {
    console.log('a user connected as', socket.id);
  
    socket.on('ready', () => {
      console.log('player ready:', socket.id);
  
      readyPlayerCount++;
  
      if ((readyPlayerCount % 2) === 0) {
        pongNamespace.emit('startGame', socket.id)
      }
    })
  
    socket.on('paddleMove', (paddleData) => {
      socket.broadcast.emit('paddleMove', paddleData);
    })
  
    socket.on('ballMove', (ballData) => {
      socket.broadcast.emit('ballMove', ballData);
    })
  
    socket.on('disconnect', (reason) => {
      console.log(`client ${socket.id} disconnected: ${reason}`)
    }) 
  })
}

module.exports = {
  listen
}

