var play_state = {
    preload: function () {
        this.commands = [];
        this.allCommands = [
            {text: '前进', code: 1, p: 2},
            {text: '后退', code: 2, p: 2},
            {text: '攻击', code: 3},
            {text: '防御', code: 4, p: 4},
            {text: '回避', code: 3, p: 5}
        ]
    },


    create: function () {
        this.createBackground();
        this.createMyArea();
        this.createEnemyArea();
        this.createMyMonster();
        this.createEnemyMonster();
        this.createMyStatusBar();
        this.createEnemyStatusBar();
        this.createInfoArea();

        this.createListener();
    },

    update: function () {
    },

    createMyStatusBar: function () {
        var x = 10, y = 285;
        this.game.add.sprite(x, y, 'status-bar-1');
    },
    createEnemyStatusBar: function () {
        var x = 440, y = 10;
        this.game.add.sprite(x, y, 'status-bar-2');
    },
    createMyMonster: function () {
        var x = 460, y = 130;
        this.game.add.sprite(x, y, 'm1');
    },
    createEnemyMonster: function () {
        var x = 70, y = 40;
        this.game.add.sprite(x, y, 'm2');
    },
    createBackground: function () {
        this.game.add.sprite(0, 0, 'bg');
    },
    createMyArea: function () {
        var x = 310, y = 340;
        this.game.add.sprite(x, y, 'area-1');
    },
    createEnemyArea: function () {
        var x = 0, y = 10;
        this.game.add.sprite(x, y, 'area-2');
    },
    createInfoArea: function () {
        var self = this;
        var x = 10, y = 350;
        this.game.add.sprite(x, y, 'bar');

        var style = this.infoTextStyle();

        for (var i = 0; i < this.allCommands.length; i++) {
            var command = this.allCommands[i];
            var commandSprite = this.game.add.text(x + 80 + i % 2 * (style.size * 3 + 5), y + 13 + Math.floor(i / 2) * (style.size + 5), command.text, style);
            commandSprite.command = command;
            commandSprite.inputEnabled = true;
            commandSprite.events.onInputDown.add(function (cs) {
                self.commands.push(cs.command);
                if (self.commands.length == 4) {
                    socket.emit('command', self.commands.map(function (c) {
                        return c.code;
                    }))
                }
            }, this);
        }
    },

    infoTextStyle: function () {
        return { font: "16px Arial", fill: "#ffffff", size: 16 };
    },

    createListener: function () {
        socket.on('result', function (result) {
            console.log(result);
        });
    }
};

