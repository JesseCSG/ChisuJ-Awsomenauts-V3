game.MiniMap = me.Entity.extend({
    init: function(x, y, settings) {
        // initializes hitbox and functions.
        this._super(me.Entity, 'init', [x, y, {
                image: 'minimap',
                width: 506,
                height: 183,
                spritewidth: "506",
                spriteheight: "183",
                getShape: function() {
                    return (new me.Rect(0, 0, 506, 183)).toPolygon();
                }
            }]);
        // entity is floating.
        this.floating = true;
    }
});


