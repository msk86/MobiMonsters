module.exports = (function() {
    function RoomController(app, session) {
        this.app = app;
        this.session = session;
    }

    RoomController.prototype.createRoom = function() {
        return this.app.context.rooms.nextRoom();
    };

    RoomController.prototype.joinRoom = function(roomId) {
        var room = this.app.context.rooms.findRoom(roomId);
        room.addPlayer(this.session.player);
        return room;
    };

    return RoomController;
})();