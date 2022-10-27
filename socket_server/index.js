const server = require("http").createServer()
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
})
io.on("connection", (socket) => {
    socket.on('joinRoom',(key)=>{
        socket.join(key);
        socket.to(key).emit('gameStarts');
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
