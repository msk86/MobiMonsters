module.exports = (function() {
    var ID = require('../new-util/id.js');

    function User(name) {
        this.id = ID.next('USER');
        this.name = name;
        this.characters = [];
        this.room = null;
    }

    User.prototype.addCharacter = function(character) {
        this.characters.push(character)
    };

    User.prototype.getCurrentCharacter = function() {
        return this.characters[0];
    };

    User.prototype.toJson = function() {
        return {
            id: this.id,
            name: this.name
        };
    };

    return User;
})();