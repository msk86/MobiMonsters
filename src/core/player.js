module.exports = (function() {
    function Player(name) {
        this.name = name;
        this.ready = false;
    }

    Player.prototype.toJson = function() {
        return {
            name: this.name,
            ready: this.ready
        };
    };

    return Player;
})();