module.exports = (function() {
    function Room(id) {
        this.id = id;
        this.players = [];
    }

    Room.prototype.addPlayer = function(player) {
        this.players.push(player);
    };

    return Room;
})();