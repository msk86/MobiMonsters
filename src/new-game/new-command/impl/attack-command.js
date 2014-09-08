module.exports = (function() {
    function AttackCommand(Command) {
        Command.call(this, '攻击', AttackCommand.CODE, AttackCommand.COST, AttackCommand.PRIORITY);
    }

    AttackCommand.CODE = 3;
    AttackCommand.COST = 15;
    AttackCommand.PRIORITY = 0;

    AttackCommand.prototype.cost = function() {
        if(!this.monster.canCost(this.cost)) return false;
        this.monster.cost(this.cost);
        return true;
    };

    AttackCommand.prototype.process = function(battleField) {
        var rivalMonster = battleField.getRivalMonster(this.monster);

        var damage = this.monster.atk;
        if(rivalMonster.action.isDefence()) {
            damage *= 0.5;
        } else if (rivalMonster.action.isDodge()) {
            damage *= 0;
        }
        rivalMonster.damage(damage);
    };

    AttackCommand.prototype.postProcess = function(battleField) {

    };

    return AttackCommand;
})();