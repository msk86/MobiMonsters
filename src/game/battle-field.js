module.exports = (function() {
    var DISTANCE_FAR = 3;
    var DISTANCE_NORMAL = 2;
    var DISTANCE_NEAR = 1;

    function BattleField(monsters) {
        this.monsters = monsters;
        this.distance = DISTANCE_NORMAL;
    }

    return BattleField;
})();