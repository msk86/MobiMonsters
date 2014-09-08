module.exports = (function() {
    var _ = require('underscore');

    var Command = require('../game/command.js');
    var CommandComparer = require('../game/command-comparer.js');
    function FightController(app, session) {
        this.app = app;
        this.session = session;
    }

    FightController.prototype.newCommand = function(commands, cb) {
        var self = this;
        var newCommands = [];
        _.each(commands, function(c) {
            var command = Command.getCommandByCode(newCommands, c);
            command.player = self.session.player;
            command.monster = self.session.player.currentMonster;
            command.step = newCommands.length;
            newCommands.push(command);
        });

        this.session.player.commands = newCommands;
        var rival = this.session.room.getRival(this.session.player);
        cb(null, rival);
    };


    FightController.prototype.roundFight = function(rival, cb) {
        var me = this.session.player;
        for(var i=0;i<me.commands.length;i++) {
            var cc = new CommandComparer(me.commands[i], rival.commands[i]);
            cc.execute(this.session.room.battleField);
        }

        var results = {
            battleField: {distance: this.session.room.battleField.distance},
            players: {}
        };

        results.players[me.currentMonster.name] = me.currentMonster;
        results.players[rival.currentMonster.name] = rival.currentMonster;

        cb(null, results);
    };

    return FightController;
})();