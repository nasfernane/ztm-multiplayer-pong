function listen(io) {
  // namespaces allow to share multiple logics or apps on the same server
  // ex one namespace for pong, another one for a tetris game or chat 
  const pongNamespace = io.of('/pong');
  let readyPlayerCount = 0;

  pongNamespace.on('connection', (socket) => {
    let room;
    console.log('a user connected as', socket.id);
  
    socket.on('ready', () => {
      room = 'room-' + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log('player ready:', socket.id, room);
  
      readyPlayerCount++;
  
      if ((readyPlayerCount % 2) === 0) {
        pongNamespace.in(room).emit('startGame', socket.id)
      }
    })
  
    socket.on('paddleMove', (paddleData) => {
      socket.broadcast.emit('paddleMove', paddleData);
    })
  
    socket.on('ballMove', (ballData) => {
      socket.broadcast.emit('ballMove', ballData);
    })
  
    socket.on('disconnect', (reason) => {
      console.log(`client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    }) 
  })
}

module.exports = {
  listen
}

