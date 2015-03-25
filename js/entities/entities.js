game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
       
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation();
        
        this.renderable.setCurrentAnimation("idle");
    },
    
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    
    setFlags: function() {
         // Keeps track of which direction your character is going.
        this.facing = "right";
        this.dead = false;

    },
    
    addAnimation: function() {        
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

    },
    
    update: function(delta) {
        this.now = new Date().getTime();
        
        this.dead = checkIfDead();

        if (me.input.isKeyPressed("right")) {
            //Sets the position of my x by the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);

        } else if (me.input.isKeyPressed("left")) {
            //Sets the position of my x by the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
            this.flipX(false);

        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump")) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }

        }

        if (me.input.isKeyPressed("attack")) {
            // Sets the current animation to attack and ocne done,
            // sets it back to idle.
            if (!this.renderable.isCurrentAnimation("attack")) {
                this.renderable.setCurrentAnimation("attack", "idle");
                // Makes sure that the nexxt time that we use this animation, 
                // that we save the animation even if we swit
                this.renderable.setAnimationFrame();
            }

        } else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");

            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    checkIfDead: function() {        
        if (this.health <= 0) {
            return true;
        }
        return false;
    },
    
    loseHealth: function(damage) {
        this.health = this.health - damage;

    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;

            if (ydif < -40 && xdif < 70 && xdif > -35) {

                this.body.falling = false;
                //this.body.vel.y = -1;

            } else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {

                this.body.vel.x = 0;
                //this.pos.x = this.pos.x - 1;

            } else if (xdif < 70 && this.facing === 'left' && (xdif > 0)) {

                this.body.vel.x = 0;
                //this.pos.x = this.pos.x + 1;

            }

            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
                console.log("PlayerAttack: ", game.data.playerAttackTimer);
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);

            }
        } else if (response.b.type === "EnemyCreep") {
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            console.log("booya");

            if (xdif > 0) {
                //this.pos.x = this.pos.x + 1;
                if (this.facing === "left") {
                    this.body.vel.x = 0;
                }
            } else {
                //this.pos.x = this.pos.x - 1;
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            }

            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <= 40) &&
                    (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))) {

                this.lastHit = this.now;
                if (response.b.health <= this.attack) {
                    game.data.gold += 2;
                }
                response.b.loseHealth(game.data.playerAttack);
            }
        }

    }
});







