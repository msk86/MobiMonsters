module.exports = (function() {
    function AtkCommand(Command) {
        Command.call(this, '攻击', AtkCommand.CODE, 15, 0);
    }

    AtkCommand.CODE = 3;

    AtkCommand.prototype.process = function(battleField, myMonster, rivalMonster) {
        var atkRate = 1;
        if(rivalMonster.commandStatus == 'DEF') {
            atkRate = 0.5;
        }
        if(rivalMonster.commandStatus == 'DODGE') {
            atkRate = 0;
        }
        rivalMonster.hp -= myMonster.atk * atkRate;
    };

    return AtkCommand;
})();