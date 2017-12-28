var game;
var platform;
var background;
var player;
var stars;
var scoreText;
var cursors;
var score = 0;

window.onload = function () {
    // Inicia o game
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update,  render: render });

    // Inicia components
    platform   = new Platform(game);
    background = new Background(game);
    player     = new Player(game);
    star       = new Star(game);
}

function preload() {
    // Carrega os sripts dos components
    platform.preload();
    background.preload();
    player.preload();
    star.preload();
}

function create() {
    // Inicia a física
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Inicia controles
    cursors = game.input.keyboard.createCursorKeys();

    // Cria background
    background.createBackground();

    game.world.setBounds(0, 0, 1920, 1200);

    // Inicializa os grupos
    platform.initGroup();
    star.initGroup();

    // Cria plataformas
    platform.spawnPlatform(0, 550);
    platform.spawnPlatform(400, 550);
    platform.spawnPlatform(400, 400);
    platform.spawnPlatform(-150, 250);

    // Inicia o player
    player.createPlayer(32, 400);

    game.camera.follow(player.player);

    // Cria estrelas
    star.spawnStar(32,200);
    star.spawnStar(70,200);
    star.spawnStar(70,400);

    // Pontuação
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}


function update() {
    game.physics.arcade.collide(player.player, platform.group);
    game.physics.arcade.collide(star.group, platform.group);
    game.physics.arcade.overlap(player.player, star.group, collectStar, null, this);

    if      (cursors.left.isDown)  player.goLeft();
    else if (cursors.right.isDown) player.goRight();
    else if (cursors.down.isDown)  player.duck();
    else                           player.standBy();

    if (cursors.up.isDown)         player.jump();
    else if (player.jumptimer != 0)
    {
        player.jumptimer.stop();
        player.jumptimer.ms = 0;
    }
}

function render () {
    // game.debug.body(player.player);
}

function collectStar (player, star_collected) {
    star_collected.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}