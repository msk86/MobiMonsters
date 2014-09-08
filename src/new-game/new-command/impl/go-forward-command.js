module.exports = (function() {
    function GoForwardCommand(Command) {
        Command.call(this, '前进', GoForwardCommand.CODE, GoForwardCommand.COST, GoForwardCommand.PRIORITY);
    }

    GoForwardCommand.CODE = 1;
    GoForwardCommand.COST = 10;
    GoForwardCommand.PRIORITY = 2;


    GoForwardCommand.prototype.cost = function() {
        if(!this.monster.canCost(this.cost)) return false;
        this.monster.cost(this.cost);
        return true;
    };

    GoForwardCommand.prototype.process = function(battleField) {
        battleField.distanceDecrease();
    };

    GoForwardCommand.prototype.postProcess = function(battleField) {
        battleField.distanceOptimise();
    };

    return GoForwardCommand;
})();