module.exports = (function () {
    var _ = require('underscore');
    var Room = require('./room.js');

    function RoomList() {
        this.rooms = [];
    }

    RoomList.prototype.createRoom = function (title, creater) {
        var newRoom = new Room(title, creater);
        this.rooms.push(newRoom);
        return newRoom;
    };

    RoomList.prototype.findRoom = function (id) {
        return _.find(this.rooms, function (r) {
            return r.id == id
        });
    };

    RoomList.prototype.closeEmptyRoom = function () {
        this.rooms = _.filter(this.rooms, function (r) {
            return r.users.length != 0;
        });
    };

    RoomList.prototype.toJson = function () {
        return _.map(this.rooms, function (r) {
            return r.toJson();
        });
    };

    return RoomList;
})();