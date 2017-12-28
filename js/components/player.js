Player = function(game) {
    this.game   = game,
    this.name   = 'dude',
    this.image  = 'assets/images/hero.png',
    this.player = {},
    this.jumptimer = {};

    this.preload = function(){
        this.game.load.spritesheet(this.name, this.image, 64, 64);
    }

    this.createPlayer = function(x, y){
        this.player = this.game.add.sprite(x, y, this.name);
        this.game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(32,32,16,32);

        this.player.animations.add('right', [16, 17, 18], 10, true);
        this.player.animations.add('left', [34, 33, 32], 10, true);
        this.player.animations.add('iddle', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        this.player.animations.add('jump', [19, 20, 21, 22, 23], 10, true);
        this.player.animations.add('duck', [24, 25, 26, 27, 28, 29], 10, false);
        this.player.animations.add('dead', [8, 9, 10, 11, 12, 13, 14, 15], 8, false);

        this.jumptimer = this.game.time.create();
    }

    this.standBy = function(){
        this.player.body.velocity.x = 0;
        this.player.animations.play('iddle');
    }

    this.goLeft = function(){
        this.player.body.velocity.x = -150;
        this.player.animations.play('left');
    }

    this.goRight = function(){
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
    }

    this.jump = function(){
        if (this.player.body.touching.down)
        {
            this.jumptimer.start();
            this.player.body.velocity.y = -150;
        }
        else if (this.jumptimer.ms != 0)
        {
            if (this.jumptimer.ms > 600) {
                this.jumptimer.stop();
                this.jumptimer.ms = 0;
            }
            else
            {
                this.player.body.velocity.y = -150;
            }

        }
    }

    this.duck = function(){
        if(this.player.animations.currentAnim.name == 'duck') return;

        this.player.animations.play('duck');
        this.player.body.velocity.x = 0;
        this.player.body.velocity.x = 0;
    }

    this.dead = function(){
        if(this.player.animations.currentAnim.name == 'dead') return;

        this.player.animations.play('dead');
        this.player.body.velocity.x = 0;
        this.player.body.velocity.x = 0;
    }

}