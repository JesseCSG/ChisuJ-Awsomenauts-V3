game.PauseManager = Object.extend({
    init: function(x, y, settings) {
        //initailizes pausing and updates.
        this.now = new Date().getTime();
        this.lastPause = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
    },
    
    update: function() {
        // resets update function.
        this.now = new Date().getTime();
        // If "pause" is pressed and it's been already one second, then continue.
        if (me.input.isKeyPressed("pause") && this.now - this.lastPause >= 1000) {
            // resets this.lastPause
            this.lastPause = this.now;
            if (!this.pausing) {
                // If pausing is false, go to start Pausing.
                this.startPausing();
            } else {
                // If puasing is true, go to stop Pausing.
                this.stopPausing();
            }
            
        }     
        // returns true;
        return true;
    },
    
    startPausing: function() {
        // makes pausing true;
        this.pausing = true;
        // changes game screen to PLAY.
        me.state.pause(me.state.PLAY);
        // creates pausing position, and sets pause screen.
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("pause-screen"));
        game.data.pausescreen.updateWhenPaused = true;
        // sets opacity of screen.
        game.data.pausescreen.setOpacity(0.8);
        // loads in screen.
        game.data.player.body.setVelocity(0, 0);
        me.game.world.addChild(game.data.pausescreen, 34);
        // sets pause keys and text.
        this.setKeys();
        this.setPauseText();
    },
    
    setKeys: function() {
        //
        me.input.bindKey(me.input.KEY.F1, "F1", true);
    },
    
    setPauseText: function() {
        game.data.pausetext = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font('Times New Roman', 26, 'white');
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Screen Paused", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Press F1 To Resume", this.pos.x, this.pos.y + 50);

            }
        }));
        me.game.world.addChild(game.data.pausetext, 35);
    },
    
    stopPausing: function() {
        this.pausing = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.pausescreen);
        this.unsetKeys();
        me.game.world.removeChild(game.data.pausetext);
    },
    
    unsetKeys: function() {
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
    }
});