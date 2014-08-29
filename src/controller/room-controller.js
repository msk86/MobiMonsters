module.exports = (function() {
    var _ = require('underscore');
    var Room = require('../core/room.js');

    function RoomController(app, session) {
        this.app = app;
        this.session = session;
    }

    RoomController.prototype.createRoom = function(cb) {
        if(!this.session.player) { return cb('You are not login.');}
        if(this.session.player.room) {return cb('You are already in a room.')}

        var room = this.app.context.rooms.nextRoom();
        this.session.room = room;
        room.addPlayer(this.session.player);
        room.owner = this.session.player;
        cb(null, room);
    };

    RoomController.prototype.joinRoom = function(roomId, cb) {
        if(!this.session.player) { return cb('You are not login.');}

        var room = this.app.context.rooms.findRoom(roomId);
        if(!room) {return cb('No room found.');}

        this.session.room = room;
        if(room.players.length >= 2) {return cb('Room size limit.');}
        room.addPlayer(this.session.player);
        cb(null, room);
    };

    RoomController.prototype.ready = function(cb) {
        if(!this.session.player) { return cb('You are not login.');}
        if(!this.session.room) { return cb('You are not in a room.');}

        this.session.player.ready();
        cb(null, this.session.player);
    };

    RoomController.prototype.fight = function(cb) {
        if(!this.session.player) { return cb('You are not login.');}
        if(!this.session.room) { return cb('You are not in a room.');}

        if(this.session.room.owner != this.session.player) { return cb('You are not the owner.');}

        if(!_.every(this.session.room.players, function(p) {return p.isReady;})) {return cb('Not all players are ready.');}

        this.session.room.status = Room.FIGHTING;
        cb(null, this.session.room);
    };

    return RoomController;
})();