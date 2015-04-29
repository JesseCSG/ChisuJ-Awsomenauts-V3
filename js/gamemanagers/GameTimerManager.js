game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        return true;
    },
    
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1 + 1);
        }
    },
    
    creepTimerCheck: function() {
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            if ("PlayerCreep") {
                this.lastCreep = this.now;
                var creepp = me.pool.pull("PlayerCreep", 0, 10, {});
                me.game.world.addChild(creepp, 10);
            } else if ("EnemyCreep") {
                this.lastCreep = this.now;
                var creepe = me.pool.pull("EnemyCreep", 3360, 0, {});
                me.game.world.addChild(creepe, 10);
            }
            return true;
        }
    }
});




