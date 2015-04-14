game.HeroDeathManager = Object.extend({
    
    init: function(x, y, settings) {
        this.alwayeUpdate = true;
    },
    
    update: function() {
        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(0, 620);
        }
    }
});



