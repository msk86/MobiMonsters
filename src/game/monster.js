module.exports = (function() {
    function Monster(name) {
        this.name = name;
        this.maxHp = 100;
        this.hp = this.maxHp;
        this.atk = 20;
        this.commandStatus = null;
    }

    return Monster;
})();