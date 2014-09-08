module.exports = (function() {
    function ChargeCommand(Command) {
        Command.call(this, '聚能', ChargeCommand.CODE, ChargeCommand.COST, ChargeCommand.PRIORITY);
    }

    ChargeCommand.CODE = 6;
    ChargeCommand.COST = 10;
    ChargeCommand.PRIORITY = 1;


    ChargeCommand.prototype.cost = function() {
        if(!this.monster.canCost(this.cost)) return false;
        this.monster.cost(this.cost);
        return true;
    };

    ChargeCommand.prototype.process = function(battleField) {
        this.monster.charge(25);
    };

    ChargeCommand.prototype.postProcess = function(battleField) {

    };

    return ChargeCommand;
})();