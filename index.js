const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', (socket)=> {
    console.log('Se conecto un usuario');
    // console.log(socket.id);
    socket.broadcast.emit('mensaje', 'Desde el servidor');
    socket.on('mensaje del chat', (message) => {
        console.log(message);
        
        // emitir a todos lo que viene de un cliente
        io.emit('mensaje del chat', message)

    });
});

http.listen(3000, ()=> {
    console.log('Listening on port 3000');
});