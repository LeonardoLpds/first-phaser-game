Player = function(game) {
    this.game   = game,
    this.name   = 'dude',
    this.image  = 'assets/images/dude.png',
    this.player = {}

    this.preload = function(){
        this.game.load.spritesheet(this.name, this.image, 32, 48);
    }

    this.createPlayer = function(x, y){
        this.player = this.game.add.sprite(x, y, this.name);
        this.game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    this.standBy = function(){
        this.player.body.velocity.x = 0;
        this.player.animations.stop();
        this.player.frame = 4;
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
        this.player.body.velocity.y = -350;
    }

}