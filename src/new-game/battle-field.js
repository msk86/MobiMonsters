module.exports = (function () {
    var _ = require('underscore');
    var ID = require('../new-util/id.js');

    function BattleField(characters) {
        this.id = ID.next("BATTLE_FIELD");
        this.characters = characters;
        this.distance = BattleField.DISTANCE.NORMAL;
    }

    BattleField.DISTANCE = {
        NEAR: 1,
        NORMAL: 2,
        FAR: 3
    };

    BattleField.prototype.isBattling = function () {
        var monsters = this.getBattleMonsters();
        return _.every(monsters, function (m) {
            return m.isAlive();
        });
    };

    BattleField.prototype.getBattleMonsters = function () {
        return _.map(this.characters, function (c) {
            return c.getCurrentMonster();
        });
    };

    BattleField.prototype.getRivalMonster = function (monster) {
        return _.find(this.getBattleMonsters(), function (m) {
            return m.id != monster.id;
        });
    };

    BattleField.prototype.distanceIncrease = function () {
        this.distance += 1;
    };

    BattleField.prototype.distanceDecrease = function () {
        this.distance -= 1;
    };

    BattleField.prototype.distanceOptimise = function () {
        if (this.distance < BattleField.DISTANCE.NEAR) {
            this.distance = BattleField.DISTANCE.NEAR;
        }
        if (this.distance > BattleField.DISTANCE.FAR) {
            this.distance = BattleField.DISTANCE.FAR;
        }
    };

    BattleField.prototype.toJson = function () {
        return {
            distance: this.distance,
            monsters: _.map(this.getBattleMonsters(), function(m) {
                return m.toJson();
            })
        };
    };

    return BattleField;
})();