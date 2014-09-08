module.exports = (function () {
    var _ = require('underscore');

    var ID = require('../new-util/id.js');

    function Room(title, creater) {
        this.id = ID.next('ROOM');
        this.title = title;
        this.owner = creater;
        this.users = [];
        this.status = Room.STATUS.WAITING;

        this.ready = {};

        this.game = null;
    }

    Room.STATUS = {
        WAITING: 1,
        PLAYING: 2
    };

    Room.MAX_SIZE = 2;

    Room.prototype.addUser = function (user) {
        this.users.push(user);
        user.room = this;
    };

    Room.prototype.userReady = function (user) {
        this.ready[user.id] = !this.ready[user.id];
    };

    Room.prototype.isAllUserReady = function () {
        var self = this;
        return _.every(this.users, function (u) {
            return !!self.ready[u.id];
        });
    };

    Room.prototype.removeUser = function (user) {
        this.users = _.filter(this.users, function (u) {
            return u.id != user.id;
        });
        user.room = null;
    };

    Room.prototype.toJson = function () {
        return {
            id: this.id,
            title: this.title,
            users: _.map(this.users, function (u) {
                return u.toJson();
            }),
            ready: this.ready,
            status: this.status == Room.STATUS.WAITING ? 'Waiting' : 'Fighting'
        }
    };

    return Room;
})();