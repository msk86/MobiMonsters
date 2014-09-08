module.exports = (function() {
    var ID = require('../new-util/id.js');

    function Monster(name, owner) {
        this.id = ID.next('MONSTER');
        this.name = name;
        this.owner = owner;

        this.atk = 20;
        this.maxHp = 100;
        this.hp = this.maxHp;
        this.energy = 50;
        this.commandStatus = null;
    }

    Monster.prototype.isAlive = function() {
        return this.hp > 0;
    };

    Monster.prototype.canCost = function(cost) {
        return this.energy >= cost;
    };

    Monster.prototype.cost = function(cost) {
        return this.energy -= cost;
    };

    Monster.prototype.damage = function(damage) {
        this.hp -= damage;
    };

    Monster.prototype.charge = function(energy) {
        this.energy += energy;
    };

    Monster.prototype.action = function() {
        var self = this;
        return {
            defence: function() {self.commandStatus = 'DEF';},
            isDefence: function() {return self.commandStatus == 'DEF';},
            dodge: function() {self.commandStatus = 'DODGE';},
            isDodge: function() {return self.commandStatus == 'DODGE';},

            relax: function() {self.commandStatus = null;}
        }
    };

    Monster.prototype.toJson = function() {
        return {
            id: this.id,
            name: this.name,
            ownerId: this.owner.id,
            atk: this.atk,
            maxHp: this.maxHp,
            hp: this.hp,
            energy: this.energy
        };
    };

    return Monster;
})();