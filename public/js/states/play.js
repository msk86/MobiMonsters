var play_state = {
    create: function() {
        this.createBackground();
        this.createMyArea();
        this.createEnemyArea();
        this.createMyMonster();
        this.createEnemyMonster();
        this.createMyStatusBar();
        this.createEnemyStatusBar();
        this.createInfoArea();
    },

    createMyStatusBar: function() {
        var x = 10, y = 285;
        this.game.add.sprite(x, y, 'status-bar-1');
    },
    createEnemyStatusBar: function() {
        var x = 440, y = 10;
        this.game.add.sprite(x, y, 'status-bar-2');
    },
    createMyMonster: function() {
        var x = 460, y = 130;
        this.game.add.sprite(x, y, 'm1');
    },
    createEnemyMonster: function() {
        var x = 70, y = 40;
        this.game.add.sprite(x, y, 'm2');
    },
    createBackground: function() {
        this.game.add.sprite(0, 0, 'bg');
    },
    createMyArea: function() {
        var x = 310, y = 340;
        this.game.add.sprite(x, y, 'area-1');
    },
    createEnemyArea: function() {
        var x = 0, y = 10;
        this.game.add.sprite(x, y, 'area-2');
    },
    createInfoArea: function() {
        var x = 10, y = 350;
        this.game.add.sprite(x, y, 'bar');


        var infoText = this.game.add.text(x + 10, y + 10, 'Start fight!',this.infoTextStyle());
        infoText.wordWrap = true;
        infoText.wordWrapWidth = 380;
    },

    infoTextStyle: function() {
        return { font:"16px Arial", fill:"#ffffff" };
    }
};

