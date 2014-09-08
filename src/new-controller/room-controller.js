module.exports = (function() {
    var Room = require('../new-core/room.js');

    function RoomController(context, session) {
        this.context = context;
        this.session = session;
    }

    RoomController.prototype.createRoom = function(title, cb) {
        if(!this.session.user) { return cb('You are not login.');}
        if(this.session.room) {return cb('You are already in a room.')}

        var currentUser = this.session.user;
        var room = this.context.roomList.createRoom(title, currentUser);
        this.session.room = room;
        room.addUser(currentUser);
        cb(null, room);
    };

    RoomController.prototype.joinRoom = function(roomId, cb) {
        if(!this.session.user) { return cb('You are not login.');}

        var room = this.context.roomList.findRoom(roomId);
        if(!room) {return cb('No room found.');}

        this.session.room = room;
        if(room.users.length >= Room.MAX_SIZE) {return cb('Room size limit.');}
        room.addUser(this.session.user);
        cb(null, room);
    };

    RoomController.prototype.ready = function(cb) {
        if(!this.session.user) { return cb('You are not login.');}
        if(!this.session.room) { return cb('You are not in a room.');}

        this.session.room.userReady(this.session.user);
        cb(null, this.session.room);
    };

    RoomController.prototype.play = function(cb) {
        if(!this.session.user) { return cb('You are not login.');}
        if(!this.session.room) { return cb('You are not in a room.');}

        if(this.session.room.owner != this.session.user) { return cb('You are not the owner.');}

        if(!this.session.room.isAllUserReady()) {return cb('Not all players are ready.');}

        this.session.room.status = Room.PLAYING;
        cb(null, this.session.room);
    };

    return RoomController;
})();