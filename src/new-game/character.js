module.exports = (function () {
    var _ = require('underscore');
    var ID = require('../new-util/id.js');

    function Character(user, name) {
        this.id = ID.next('CHARACTER');
        this.user = user;
        this.name = name;
        this.monsters = [];
    }

    Character.prototype.addMonster = function (monster) {
        this.monsters.push(monster);
    };

    Character.prototype.getCurrentMonster = function () {
        return this.monsters[0];
    };

    Character.prototype.toJson = function () {
        return {
            id: this.id,
            userId: this.user.id,
            name: this.name,
            monsters: _.map(this.monsters, function (m) {
                return m.toJson();
            })
        }
    };

    return Character;
})();