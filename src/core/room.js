module.exports = (function() {
    var _ = require('underscore');

    function Room(id) {
        this.id = id;
        this.players = [];
    }

    Room.prototype.addPlayer = function(player) {
        this.players.push(player);
        player.room = this;
    };

    Room.prototype.toJson = function() {
        return {
            id: this.id,
            players:_.map(this.players, function(p) {return p.toJson()})
        };
    };

    return Room;
})();