module.exports = (function() {
    var DISTANCE_FAR = 3;
    var DISTANCE_NORMAL = 2;
    var DISTANCE_NEAR = 1;

    function BattleField() {
        this.distance = DISTANCE_NORMAL;
    }

    BattleField.prototype.goForward = function() {
        this.distance --;
    };
    BattleField.prototype.goBack = function() {
        this.distance ++;
    };
    BattleField.prototype.distanceOptimise = function() {
        if(this.distance > 3) this.distance = 3;
        if(this.distance < 1) this.distance = 1;
    };

    return BattleField;
})();