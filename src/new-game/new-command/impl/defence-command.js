module.exports = (function() {
    function DefenceCommand(Command) {
        Command.call(this, '防御', DefenceCommand.CODE, DefenceCommand.COST, DefenceCommand.PRIORITY);
    }

    DefenceCommand.CODE = 4;
    DefenceCommand.COST = 10;
    DefenceCommand.PRIORITY = 1;

    DefenceCommand.prototype.cost = function() {
        if(!this.monster.canCost(this.cost)) return false;
        this.monster.cost(this.cost);
        return true;
    };

    DefenceCommand.prototype.process = function(battleField) {
        this.monster.action.defence();
    };

    DefenceCommand.prototype.postProcess = function(battleField) {
        this.monster.action.relax();
    };

    return DefenceCommand;
})();