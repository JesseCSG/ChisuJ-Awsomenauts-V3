game.MiniPlayerLocation = me.Entity.extend({
    init: function(x, y, settings) {
        this.settings = settings;
        // initializes functions and location.
        this.r = 5;
        this.diameter = (this.r + 2) * 2;
        this.anchorPiont = new me.Vector2d(0, 0);
        this.loc = x, y;
        // sets w+h to diameter.
        this.settings.width = this.diameter;
        this.settings.height = this.diameter;
        this.settings.spritewidth = this.diameter;
        this.settings.spriteheightheight = this.diameter;
        // is floating.
        this.floating = true;
        // creates 2d image on canvas.
        this.image = me.video.createCanvas(this.settings.width, this.settings.height);
        var ctx = me.video.renderer.getContext2d(this.image);
        // initializes color of entity.
        ctx.fillStyle = "rgba (0, 192, 32, 0.75)";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        // creates size and depth of entity.
        ctx.arc(this.r + 2, this.r + 2, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        var my = this;
        // initiallizes hitbox an functions.
        this._super(me.Entity, 'init', [x, y, {
                width: 14,
                height: 14,
                spritewidth: 14,
                spriteheight: 14,
                getShape: function() {  
                    return (new me.Rect(0, 0, 14, 14)).toPolygon();
                }
            }]);
    },
    
    draw: function(renderer) {
        // draws entity, is floating, and draws image.
        this._super(me.Entity, 'draw', [renderer]);
        this.floating = true;
        renderer.drawImage(
                this.image,
                0, 0, this.width, this.height,
                this.pos.x, this.pos.y, this.width, this.height                
                );
    },
    
    update: function() {
        // updates position of entity, reutrns true.
        this.pos.x = (10 + (game.data.player.pos.x *0.14));
        this.pos.y = (10 + (game.data.player.pos.y *0.14));
        return true;
    }
});

