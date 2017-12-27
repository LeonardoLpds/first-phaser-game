Platform = function(game) {
    this.game  = game,
    this.name  = 'ground',
    this.image = 'assets/images/platform.png',
    this.group = {},

    this.preload = function(){
        this.game.load.image(this.name, this.image);
    }

    this.initGroup = function(){
        this.group = this.game.add.group();
        this.group.enableBody = true;
    }

    this.spawnPlatform = function(x, y){
        var temp_platform = this.group.create(x, y, this.name);
        temp_platform.body.immovable = true;
    }
}