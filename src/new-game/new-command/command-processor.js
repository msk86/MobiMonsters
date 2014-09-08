module.exports = (function () {
    var CommandList = require('./command-list.js');

    function CommandProcessor(battleField) {
        this.battleField = battleField;
    }

    CommandProcessor.prototype.process = function(cl1, cl2) {
        for(var i=0;i<CommandList.MAX_STEP;i++) {
            var c1 = cl1.getCommand(i), c2 = cl2.getCommand(i);
            this.processCommand(c1, c2);
        }
    };

    CommandProcessor.prototype.processCommand = function (command1, command2) {
        console.log('*******');
        console.log(command1);
        console.log(command2);
        console.log('*******');


        var cHigh = command1.priority >= command2.priority ? command1 : command2;
        var cLow = command1.priority >= command2.priority ? command2 : command1;

        if (cHigh.priority == cLow.priority) {
            if (this.battleField.isBattling()) {
                var cHighCost = cHigh.cost();
                var cLowCost = cHigh.cost();
                if (cHighCost) cHigh.process(this.battleField);
                if (cLowCost) cLow.process(this.battleField);
                if (cHighCost) cHigh.postProcess(this.battleField);
                if (cLowCost) cLow.postProcess(this.battleField);
            }
        } else {
            if (this.battleField.isBattling() && cHigh.cost()) {
                cHigh.process(this.battleField);
                cHigh.postProcess(this.battleField);
            }
            if (this.battleField.isBattling() && cLow.cost()) {
                cLow.process(this.battleField);
                cLow.postProcess(this.battleField);
            }
        }
    };

    return CommandProcessor;
})();