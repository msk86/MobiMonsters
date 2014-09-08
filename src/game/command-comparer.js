module.exports = (function() {
    var _ = require('underscore');
    function CommandComparer(command1, command2) {
        this.commands = _.sortBy([command1, command2], function(c) { return c.priority;});
    }

    CommandComparer.prototype.execute = function(battleField) {
        var cHigh = this.commands[1];
        var cLow = this.commands[0];
        if(cHigh.priority == cLow.priority) {
            cHigh.process(battleField, cHigh.monster, cLow.monster);
            cLow.process(battleField, cLow.monster, cHigh.monster);
            this.distanceOptimise(battleField);
        } else {
            cHigh.process(battleField, cHigh.monster, cLow.monster);
            this.distanceOptimise(battleField);
            cLow.process(battleField, cLow.monster, cHigh.monster);
            this.distanceOptimise(battleField);
        }
        this.resetMonsterCommandStatus(cHigh.monster, cLow.monster);
    };

    CommandComparer.prototype.distanceOptimise = function(battleField) {
        battleField.distanceOptimise();
    };

    CommandComparer.prototype.resetMonsterCommandStatus = function(m1, m2) {
        m1.commandStatus = null;
        m2.commandStatus = null;
    };

    return CommandComparer;
})();