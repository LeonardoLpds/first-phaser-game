Background = function(game) {
    this.game  = game,
    this.name  = 'background',
    this.image = 'assets/images/sky.png',

    this.preload = function(){
        this.game.load.image(this.name, this.image);
    }

    this.createBackground = function(){
        this.game.add.sprite(0, 0, this.name);
    }
}