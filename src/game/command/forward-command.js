module.exports = (function() {
    function ForwardCommand(Command) {
        Command.call(this, '前进', ForwardCommand.CODE, 15, 2);
    }

    ForwardCommand.CODE = 1;

    ForwardCommand.prototype.process = function(battleField, myMonster, rivalMonster) {
        battleField.goForward();
    };

    return ForwardCommand;
})();