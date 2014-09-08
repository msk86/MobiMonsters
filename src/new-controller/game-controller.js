module.exports = (function() {
    var _ = require('underscore');

    var Character = require('../new-game/character.js');
    var Monster = require('../new-game/monster.js');
    var Game = require('../new-game/game.js');
    var BattleField = require('../new-game/battle-field.js');
    var CommandList = require('../new-game/new-command/command-list.js');
    var CommandProcessor = require('../new-game/new-command/command-processor.js');

    function GameController(context, session) {
        this.context = context;
        this.session = session;
    }

    function testInit(user) {
        var character = new Character(user, user.name);
        user.addCharacter(character);
        var monster = new Monster(user.name + '\'s Monster', character);
        character.addMonster(monster);
    }

    GameController.prototype.start = function(cb) {
        if(!this.session.room) return cb('Not in a room.');
        var room = this.session.room;

        // for test start
        _.each(room.users, function(u) {
            testInit(u);
        });
        // for test end

        var game = new Game(room.users);
        room.game = game;

        cb(null, game);
    };

    GameController.prototype.receiveCommands = function(codes, cb) {
        var character = this.session.user.getCurrentCharacter();
        var monster = character.getCurrentMonster();
        var commandList = new CommandList(monster);
        commandList.loadCommandCodes(codes);

        cb(null, this.session.room.game.battleField, monster);
    };

    GameController.prototype.roundFight = function(myMonster, rivalMonster, cb) {
        var processor = new CommandProcessor(this.session.room.game.battleField);
        processor.process(myMonster.commandList, rivalMonster.commandList);

        delete myMonster.commandList;
        delete rivalMonster.commandList;

        cb(null, this.session.room.game);
    };

    return GameController;
})();