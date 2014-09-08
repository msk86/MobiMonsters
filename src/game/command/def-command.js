module.exports = (function() {
    function DefCommand(Command) {
        Command.call(this, '防御', DefCommand.CODE, 15, 1);
    }

    DefCommand.CODE = 4;


    DefCommand.prototype.process = function(battleField, myMonster, rivalMonster) {
        myMonster.commandStatus = 'DEF';
    };

    return DefCommand;
})();