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
        if(session.room) {
            io.to(session.room.id).emit("errors", session.player.name + ' dropped.');
        }
    });

    socket.on('login', function(name) {
        session.player = new Player(name);
    });

    socket.on('create-room', function(){
        var c = new RoomController(app, session);
        c.createRoom(function(err, room) {
            if(err) {return socket.emit('errors', err);}
            socket.join(room.id);
            io.emit('room-created', room.toJson());
            io.to(room.id).emit('room-joined', room.toJson());
        });
    });

    socket.on('join-room', function(roomId){
        var c = new RoomController(app, session);
        c.joinRoom(roomId, function(err, room) {
            if(err) {return socket.emit('errors', err);}
            socket.join(room.id);
            io.to(room.id).emit('room-joined', room.toJson());
        });
    });

    socket.on('ready', function() {
        var c = new RoomController(app, session);
        c.ready(function(err, player) {
            if(err) {return socket.emit('errors', err);}
            io.to(session.room.id).emit('player-ready', player.toJson());
        });
    });

    socket.on('fight', function() {
        var c = new RoomController(app, session);
        var start = c.fight(function(err, room) {
            if(err) {return socket.emit('errors', err);}
            io.to(session.room.id).emit('fight-start');
        });
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});