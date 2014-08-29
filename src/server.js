var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');


var Rooms = require('./core/rooms.js');
Player = require('./core/player.js');
RoomController = require('./controller/room-controller.js');

app.context = {};
app.context.rooms = new Rooms();

app.get('/', function(req, res){
    res.sendfile('view/index.html');
});

io.on('connection', function(socket){
    var session = {};

    socket.on('disconnect', function(){
        var playerRoom = app.context.rooms.findRoom().byPlayer(session.player);
        if(playerRoom) {
            io.to(playerRoom.id).emit("error", session.player.name + ' dropped.');
        }
    });

    socket.on('login', function(name) {
        session.player = new Player(name);
    });

    socket.on('create-room', function(){
        if(!session.player) { return io.emit('error', 'not login');}
        var c = new RoomController(app, session);
        var r = c.createRoom();
        io.emit('room-created', r);
    });

    socket.on('join-room', function(roomId){
        if(!session.player) { return io.emit('error', 'not login');}
        var c = new RoomController(app, session);
        var r = c.joinRoom(roomId);
        socket.join(r.id);
        io.to(r.id).emit('room-joined', r);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});