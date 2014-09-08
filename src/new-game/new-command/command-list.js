module.exports = (function () {
    var _ = require('underscore');
    var Command = require('./command.js');

    function CommandList(monster) {
        this.monster = monster;
        this.commands = [];
    }

    CommandList.MAX_STEP = 4;

    CommandList.prototype.loadCommandCodes = function (codes) {
        var self = this;
        codes = validCodes(codes);

        _.each(codes, function (code) {
            var command = Command.getCommandByCode(code);

            var sameCodeCount = _.filter(self.commands, function (c) {
                return c.code == command.code;
            }).length;
            command.costValue *= Math.pow(2, sameCodeCount);

            self.commands.push(command);
        });

        this.monster.commandList = this;
    };

    function validCodes(codes) {
        if (codes.length < CommandList.MAX_STEP) {
            codes = _.concat(codes, ['AUTO', 'AUTO', 'AUTO', 'AUTO']);
        }
        return _.first(codes, CommandList.MAX_STEP);
    }

    CommandList.prototype.getCommand = function (step) {
        var command = this.commands[step];
        command.monster = this.monster;
        return command;
    };

    CommandList.prototype.toJson = function () {
        return _.map(this.commands, function (c) {
            return c.toJson();
        });
    };

    return CommandList;
})();