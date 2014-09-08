module.exports = (function () {
    var _ = require('underscore');
    var NothingCommand = require('./impl/nothing-command.js');
    var GoForwardCommand = require('./impl/go-forward-command.js');
    var GoBackCommand = require('./impl/go-back-command.js');
    var AttackCommand = require('./impl/attack-command.js');
    var DefenceCommand = require('./impl/defence-command.js');
    var DodgeCommand = require('./impl/dodge-command.js');
    var ChargeCommand = require('./impl/charge-command.js');


    function Command(text, code, costValue, priority) {
        this.text = text;
        this.code = code;
        this.costValue = costValue;
        this.priority = priority;
        this.monster = null;

        this.toJson = function() {
            return {
                text: this.text,
                code: this.code,
                costValue: this.costValue,
                priority: this.priority
            }
        };
    }

    Command.getCommandByCode = function (code) {
        var allCommandClass = [NothingCommand, GoForwardCommand, GoBackCommand,
            AttackCommand, DefenceCommand, DodgeCommand, ChargeCommand];
        var commandClass = _.find(allCommandClass, function (cc) {
            return cc.CODE == code;
        });
        if(commandClass) {
            return new commandClass(Command);
        } else {
            return new NothingCommand(Command);
        }
    };

    return Command;
})();