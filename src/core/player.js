module.exports = (function() {
    function Player(name) {
        this.name = name;
        this.isReady = false;
    }

    Player.prototype.ready = function() {
        this.isReady = !this.isReady;
    };

    Player.prototype.toJson = function() {
        return {
            name: this.name,
            ready: this.isReady
        };
    };

    return Player;
})();