module.exports = (function () {
    function GoBackCommand(Command) {
        Command.call(this, '后退', GoBackCommand.CODE, GoBackCommand.COST, GoBackCommand.PRIORITY);
    }

    GoBackCommand.CODE = 2;
    GoBackCommand.COST = 10;
    GoBackCommand.PRIORITY = 2;


    GoBackCommand.prototype.cost = function() {
        if(!this.monster.canCost(this.cost)) return false;
        this.monster.cost(this.cost);
        return true;
    };

    GoBackCommand.prototype.process = function (battleField) {
        battleField.distanceIncrease();
    };

    GoBackCommand.prototype.postProcess = function(battleField) {
        battleField.distanceOptimise();
    };

    return GoBackCommand;
})();