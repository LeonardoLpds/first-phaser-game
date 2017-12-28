Star = function(game) {
    this.game  = game,
    this.name  = 'star',
    this.image = 'assets/images/star.png',
    this.group = {},

    this.preload = function(){
        this.game.load.image(this.name, this.image);
    }

    this.initGroup = function(){
        this.group = this.game.add.group();
        this.group.enableBody = true;
    }

    this.spawnStar = function(x, y){
        var temp_star = this.group.create(x, y, this.name);
        temp_star.body.immovable = true;
    }
}