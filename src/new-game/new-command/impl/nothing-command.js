module.exports = (function() {
    function NothingCommand(Command) {
        Command.call(this, 'PASS', NothingCommand.CODE, NothingCommand.COST, NothingCommand.PRIORITY);
    }

    NothingCommand.CODE = 0;
    NothingCommand.COST = 0;
    NothingCommand.PRIORITY = 3;

    NothingCommand.prototype.cost = function() {

    };

    NothingCommand.prototype.process = function(battleField) {

    };

    NothingCommand.prototype.postProcess = function(battleField) {

    };

    return NothingCommand;
})();