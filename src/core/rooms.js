module.exports = (function() {

    var Room = require('./room.js');
    var _ = require('underscore');


    function Rooms() {
        this.rooms = [];
    }

    Rooms.prototype.nextRoom = function() {
        var nextId = (new Date()).getTime() + '-' + _.random(0, 1000);
        var newRoom = new Room("Room"+nextId);
        this.rooms.push(newRoom);
        return newRoom;
    };

    Rooms.prototype.findRoom = function(id) {
        return _.find(this.rooms, function(r) {return r.id == id});
    };

    Rooms.prototype.findRoom = function() {
        var self = this;
        return {
            byId : function(id) {
                return _.find(self.rooms, function(r) {
                    return r.id == id}
                );
            },
            byPlayer: function(player) {
                return _.find(self.rooms, function(r) {
                    return _.find(r.players, function(p) {
                        return p == player;
                    });
                });
            }
        };
    };

    return Rooms;
})();