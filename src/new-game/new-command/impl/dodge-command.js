module.exports = (function() {
    function DodgeCommand(Command) {
        Command.call(this, '闪避', DodgeCommand.CODE, DodgeCommand.COST, DodgeCommand.PRIORITY);
    }

    DodgeCommand.CODE = 5;
    DodgeCommand.COST = 15;
    DodgeCommand.PRIORITY = 1;

    DodgeCommand.prototype.cost = function() {
        if(!this.monster.canCost(this.cost)) return false;
        this.monster.cost(this.cost);
        return true;
    };

    DodgeCommand.prototype.process = function(battleField) {
        this.monster.action.dodge();
    };

    DodgeCommand.prototype.postProcess = function(battleField) {
        this.monster.action.relax();
    };

    return DodgeCommand;
})();