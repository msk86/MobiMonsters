module.exports = (function() {
    var _ = require('underscore');

    function Room(id) {
        this.id = id;
        this.players = [];
        this.status = Room.STATUS.WAITING;
    }

    Room.STATUS = {
        WAITING : 1,
        FIGHTING : 2
    };

    Room.prototype.addPlayer = function(player) {
        this.players.push(player);
        player.room = this;
    };

    Room.prototype.removePlayer = function(player) {
        player.room = null;
        this.players = _.filter(this.players, function(p) {return p != player});
    };

    Room.prototype.toJson = function() {
        return {
            id: this.id,
            players:_.map(this.players, function(p) {return p.toJson()}),
            status: this.status == Room.STATUS.WAITING ? 'Waiting' : 'Fighting'
        };
    };

    return Room;
})();