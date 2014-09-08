var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../new-public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');


var RoomList = require('./new-core/room-list.js'),
User = require('./new-core/user.js'),
RoomController = require('./new-controller/room-controller.js'),
GameController = require('./new-controller/game-controller.js');

var context = {
    roomList: new RoomList()
};

io.on('connection', function(socket){
    var session = {};
    roomUpdated(context.roomList);

    socket.on('disconnect', function(){
        if(session.room) {
            session.room.removeUser(session.user);
            context.roomList.closeEmptyRoom();

            roomUpdated(context.roomList);
            userUpdated(session.room);
            roomPlayerDropped(session.room, session.user);
        }
    });

    socket.on('login', function(name) {
        session.user = new User(name);
        socket.emit('logined', session.user.toJson());
    });

    socket.on('create-room', function(title){
        var c = new RoomController(context, session);
        c.createRoom(title, function(err, room) {
            if(err) {return socket.emit('errors', err);}
            socket.join(room.id);

            roomUpdated(context.roomList);
            roomJoined(room);
            userUpdated(room);
        });
    });

    socket.on('join-room', function(roomId){
        var c = new RoomController(context, session);
        c.joinRoom(roomId, function(err, room) {
            if(err) {return socket.emit('errors', err);}
            socket.join(room.id);

            roomUpdated(context.roomList);
            roomJoined(room);
            userUpdated(room);
        });
    });

    socket.on('user-ready', function() {
        var c = new RoomController(context, session);
        c.ready(function(err, room) {
            if(err) {return socket.emit('errors', err);}

            userUpdated(room);
        });
    });

    socket.on('user-start', function() {
        var c = new RoomController(app, session);
        var gameController = new GameController(context, session);
        c.play(function(err, room) {
            if(err) {return socket.emit('errors', err);}

            roomUpdated(context.roomList);

            gameController.start(function(err) {
                io.to(room.id).emit('play-start');
                gameUpdated(room, room.game);
            });
        });
    });

    socket.on('commands', function(commandCodes) {
        var c = new GameController(context, session);
        c.receiveCommands(commandCodes, function(err, battleField, monster) {
            var rivalMonster = battleField.getRivalMonster(monster);
            if(rivalMonster.commandList) {
                roundCommands(monster, rivalMonster);

                c.roundFight(monster, rivalMonster, function(err, game) {
                    gameUpdated(session.room, game);
                });
            }
        });
    });

    function roomPlayerDropped(room, player) {
        io.to(room.id).emit("errors", player.name + ' dropped.');
    }

    function roomJoined(room) {
        io.to(room.id).emit('room-joined', room.toJson());
    }

    function userUpdated(room) {
        io.to(room.id).emit('room-user-updated', room.toJson());
    }

    function roomUpdated(roomList) {
        io.emit('room-updated',roomList.toJson());
    }

    function roundCommands(myMonster, rivalMonster) {
        var msg = {};
        msg[myMonster.id] = myMonster.commandList.toJson();
        msg[rivalMonster.id] = rivalMonster.commandList.toJson();
        io.emit('round-commands', msg);
    }

    function gameUpdated(room, game) {
        io.to(room.id).emit('game-updated', game.toJson());
    }
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});