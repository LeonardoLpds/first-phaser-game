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
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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

    // Inicializa os grupos
    platform.initGroup();
    star.initGroup();

    // Cria plataformas
    platform.spawnPlatform(0, 550);
    platform.spawnPlatform(400, 550);
    platform.spawnPlatform(400, 400);
    platform.spawnPlatform(-150, 250);

    // Inicia o player
    player.createPlayer(32, 500);

    // Cria estrelas
    star.spawnStar(0,0);
    star.spawnStar(70,0);

    // Pontuação
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

}

function update() {
    game.physics.arcade.collide(player.player, platform.group);
    game.physics.arcade.collide(star.group, platform.group);
    game.physics.arcade.overlap(player.player, star.group, collectStar, null, this);

    if      (cursors.left.isDown)  player.goLeft();
    else if (cursors.right.isDown) player.goRight();
    else                           player.standBy();

    if (cursors.up.isDown && player.player.body.touching.down) player.jump();
}

function collectStar (player, star) {
    star.kill();

    score += 10;
    scoreText.text = 'Score: ' + score;
}