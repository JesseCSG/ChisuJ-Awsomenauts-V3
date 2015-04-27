game.MiniPlayerLocation = Object.extend({
    init: function(x, y, settings) {
        this.settings = settings;
        this.r = 5;
        this.diameter = (this.r+2)*2;
        this.anchorPiont = new me.Vector2d(0, 0);
        this.loc = x, y;
        this.settings.width = this.diameter;
        this.settings.height = this.diameter;
        this.settings.spritewidth = this.diameter;
        this.settings.spriteheightheight = this.diameter;
        this.floating = true;
        this.image = me.video.createCanvas(this.settings.width, this.settings.height);
        var ctx = me.video.renderer.getContext2d(this.image);
        
        ctx.fillStyle = "rgba (0, 192, 32, 0.75)";
    },
    
    draw: function() {
        
    },
    
    update: function() {
        
    }
});

