module.exports = (function() {
    function BackCommand(Command) {
        Command.call(this, '后退', BackCommand.CODE, 15, 2);
    }

    BackCommand.CODE = 2;

    BackCommand.prototype.process = function(battleField, myMonster, rivalMonster) {
        battleField.goBack();
    };

    return BackCommand;
})();