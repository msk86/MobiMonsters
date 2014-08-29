var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');


var Rooms = require('./core/rooms.js');
Player = require('./core/player.js');
RoomController = require('./controller/room-controller.js');

app.context = {};
app.context.rooms = new Rooms();

io.on('connection', function(socket){
    var session = {};

    io.emit('room-updated', _.map(app.context.rooms.rooms, function(r){return r.toJson();}));

    socket.on('disconnect', function(){
        if(session.room) {
            session.room.removePlayer(session.player);
            app.context.rooms.clean();

            roomPlayerDropped(session.room, session.player);
            playerUpdated(session.room.id, session.room);
            roomUpdated(app.context.rooms.rooms);
        }
    });

    socket.on('login', function(name) {
        session.player = new Player(name);
        socket.emit('logined', session.player.toJson());
    });

    socket.on('create-room', function(){
        var c = new RoomController(app, session);
        c.createRoom(function(err, room) {
            if(err) {return socket.emit('errors', err);}
            socket.join(room.id);

            roomUpdated(app.context.rooms.rooms);
            roomJoined(room);
            playerUpdated(room.id, room);
        });
    });

    socket.on('join-room', function(roomId){
        var c = new RoomController(app, session);
        c.joinRoom(roomId, function(err, room) {
            if(err) {return socket.emit('errors', err);}
            socket.join(room.id);

            roomUpdated(app.context.rooms.rooms);
            roomJoined(room);
            playerUpdated(room.id, room);
        });
    });

    socket.on('player-ready', function() {
        var c = new RoomController(app, session);
        c.ready(function(err, player) {
            if(err) {return socket.emit('errors', err);}

            playerUpdated(session.room.id, session.room);
        });
    });

    socket.on('fight', function() {
        var c = new RoomController(app, session);
        var start = c.fight(function(err, room) {
            if(err) {return socket.emit('errors', err);}

            roomUpdated(app.context.rooms.rooms);
            io.to(session.room.id).emit('fight-start');
        });
    });

    function roomPlayerDropped(room, player) {
        io.to(room.id).emit("errors", player.name + ' dropped.');
    }

    function roomJoined(room) {
        io.to(room.id).emit('room-joined', room.toJson());
    }

    function playerUpdated(roomId, room) {
        io.to(roomId).emit('room-player-updated', room.toJson());
    }
    function roomUpdated(rooms) {
        io.emit('room-updated', _.map(rooms, function(r){return r.toJson();}));
    }
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});