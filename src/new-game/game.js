module.exports = (function () {
    var _ = require('underscore');
    var BattleField = require('./battle-field.js');

    function Game(users) {
        this.users = users;
        this.characters = _.map(users, function (u) {
            return u.getCurrentCharacter();
        });
        this.battleField = new BattleField(this.characters);
    }

    Game.prototype.toJson = function () {
        return {
            users: _.map(this.users, function (u) {
                return u.toJson();
            }),
            characters: _.map(this.characters, function (character) {
                return character.toJson();
            }),
            battleField: this.battleField.toJson()
        };
    };

    return Game;
})();