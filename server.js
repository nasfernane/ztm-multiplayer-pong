const PORT = 3000;

const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST']
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})


let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('a user connected as', socket.id);

  socket.on('ready', () => {
    console.log('player ready:', socket.id);

    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      io.emit('startGame', socket.id)
    }
  })

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  })
})

