module.exports = (function() {
    function Player(name) {
        this.name = name;
    }

    Player.prototype.toJson = function() {
        return {name: this.name};
    };

    return Player;
})();