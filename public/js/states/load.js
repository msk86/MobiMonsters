var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#000000';
        this.game.load.image('status-bar-1', '/assets/status-bar-1.png');
        this.game.load.image('status-bar-2', '/assets/status-bar-2.png');
        this.game.load.image('area-1', '/assets/area-1.png');
        this.game.load.image('area-2', '/assets/area-2.png');
        this.game.load.image('bar', '/assets/bar.png');
        this.game.load.image('m1', '/assets/m1.png');
        this.game.load.image('m2', '/assets/m2.png');
        this.game.load.image('bg', '/assets/bg.png');
    },

    create: function() {
        // When all assets are loaded, go to the 'play' state
        this.game.state.start('play');
    }
};