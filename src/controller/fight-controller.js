module.exports = (function() {
    function FightController(app, session) {
        this.app = app;
        this.session = session;
    }

    FightController.prototype.createRoom = function() {
        var room = this.app.context.rooms.nextRoom();
        room.addPlayer(this.session.player);
        room.owner = this.session.player;
    };

    FightController.prototype.joinRoom = function(roomId) {
        var room = this.app.context.rooms.findRoom(roomId);
        room.addPlayer(this.session.player);
        return room;
    };

    return FightController;
})();