module.exports = (function() {
    var _ = require('underscore');

    var ForwardCommand = require('./command/forward-command.js');
    var BackCommand = require('./command/back-command.js');
    var AtkCommand = require('./command/atk-command.js');
    var DefCommand = require('./command/def-command.js');
    var DodgeCommand = require('./command/dodge-command.js');

    function Command(text, code, cost, priority) {
        this.text = text;
        this.code = code;
        this.cost = cost;
        this.priority = priority;
    }

    Command.getCommandByCode = function(commands, code) {
        var allCommandClass = [ForwardCommand, BackCommand, AtkCommand, DefCommand, DodgeCommand];
        var commandClass = _.find(allCommandClass, function(cc) {return cc.CODE == code});
        var command = new commandClass(Command);

        var sameCodeCount = _.filter(commands, function(c) {return c.code == code}).length;

        command.cost *= Math.pow(2, sameCodeCount);
        return command;
    };

    return Command;
})();