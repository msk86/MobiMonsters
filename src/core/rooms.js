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

    return Rooms;
})();