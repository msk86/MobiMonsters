module.exports = (function() {
    function DodgeCommand(Command) {
        Command.call(this, '闪避', DodgeCommand.CODE, 15, 1);
    }

    DodgeCommand.CODE = 5;

    DodgeCommand.prototype.process = function(battleField, myMonster, rivalMonster) {
        myMonster.commandStatus = 'DODGE';
    };

    return DodgeCommand;
})();