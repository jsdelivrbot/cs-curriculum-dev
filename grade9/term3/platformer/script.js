// UI Variables
var gameScreen;
var musicButton;
var score;

// Platform Variables
var platforms; // p5.play sprite group
var platformImageFirst;
var platformImageMiddle;
var platformImageLast;

// Player Variables
var player; //p5.play sprite
var playerIdleAnimation, playerRunAnimation, playerJumpAnimation, playerFallAnimation;
var playerGrounded; // boolean
var playerStartX, playerStartY;

// Monster Variables
var monsters; // p5.play sprite group
var monsterWalkAnimation;
var monsterDefeatImage;

// Other Game Object Variables
var collectables;
var collectableImage;
var goal;
var goalImage;

// Physics Variables
const GRAVITY = 0.5;
const DEFAULT_VELOCITY = 5;
const DEFAULT_JUMP_FORCE = -5;
var currentJumpForce;
const maxJumpTime = 2000; //milliseconds
var currentJumpTime;

// Timing and Control Variables
var millis, deltaMillis;
var gameRunning;

// Sound, music, etc.
var hitSound, yahSound, ayeSound, jumpSound, winSound, yattaSound, loseSound, collectableSound, pauseSound;
var bgMusic;

// This allows the player to press any of the arrow keys (as well as spacebar, just
// in case you wanted to program that eventually) without interfering with the
// browser window.
window.addEventListener("keydown", function(e) {
  var key = e.which || e.keyCode;
  var gameKeys = [32, 37, 38, 39, 40];
  if(gameKeys.indexOf(key) >= 0) {
      e.preventDefault();
  }
});

function preload() {
  // load background image
  backgroundImage = loadImage("assets/img/backgrounds/BG.png");

  // load platform images
  platformImageFirst = loadImage("assets/img/tiles/Tile (14).png");
  platformImageMiddle = loadImage("assets/img/tiles/Tile (15).png");
  platformImageLast = loadImage("assets/img/tiles/Tile (16).png");

  // load player animations
  playerIdleAnimation = loadAnimation("assets/img/kunoichi/Idle__000.png", "assets/img/kunoichi/Idle__009.png");
  playerRunAnimation = loadAnimation("assets/img/kunoichi/Run__000.png", "assets/img/kunoichi/Run__009.png");
  playerJumpAnimation = loadAnimation("assets/img/kunoichi/Jump__004.png");
  playerFallAnimation = loadAnimation("assets/img/kunoichi/Jump__009.png");

  // load monster animations
  monsterWalkAnimation = loadAnimation("assets/img/monster/frame-1.png", "assets/img/monster/frame-10.png");
  monsterDefeatImage = loadImage("assets/img/monster/defeat-frame-3.png");

  // load other game object images
  collectableImage = loadImage("assets/img/kunoichi/Kunai.png");
  goalImage = loadImage("assets/img/objects/Goal.png");

  // load sounds and music
  soundFormats("mp3", "wav");
  hitSound = loadSound("assets/sound/hit.wav");
  yahSound = loadSound("assets/sound/yah.wav");
  ayeSound = loadSound("assets/sound/aye.wav");
  jumpSound = loadSound("assets/sound/jump.wav");
  winSound = loadSound("assets/sound/win.wav");
  yattaSound = loadSound("assets/sound/yatta.wav");
  loseSound = loadSound("assets/sound/lose.wav");
  collectableSound = loadSound("assets/sound/collectable.wav");
  pauseSound = loadSound("assets/sound/pause.wav");
  bgMusic = loadSound("assets/sound/bgm.mp3");
}

function setup() {
  bgMusic.setVolume(0.5);
  bgMusic.loop();
  gameScreen = createCanvas(1280, 720);
  gameScreen.parent("#game-screen");
  musicButton = select("#music");
  musicButton.mousePressed(toggleMusic);
  backgroundImage.resize(width, height);
  playerStartX = 50;
  playerStartY = 300;
  resetGame();
}

function draw() {
  if(gameRunning) {
    applyGravity();
    handleCollisions();
    updatePlayer();
    updateDisplay();
    drawSprites();
  }
}

// Called when game is reset or the player dies
function resetGame() {
  allSprites.clear();
  buildLevel();
  createPlayer();
  currentJumpForce = DEFAULT_JUMP_FORCE;
  currentJumpTime = maxJumpTime;
  playerGrounded = false;
  score = 0;
  gameRunning = true;
  loop();
}

function buildLevel() {
  // create groups
  platforms = new Group();
  monsters = new Group();
  collectables = new Group();

  // create platforms, monsters, and any other game objects
  // best method is to draw sprites from left to right on the screen
  createPlatform(50, 690, 5);
  createCollectable(300, 340);
  createMonster(500, 600, -2);
  createCollectable(700, 440);

  createPlatform(850, 645, 3);
  createMonster(1085, 530, 0);
  createCollectable(1085, 320);
  createCollectable(1300, 420);

  createPlatform(1450, 595, 4);
  createCollectable(1600, 320);
  createMonster(1730, 470, 0);
  createCollectable(1730, 220);
  createMonster(1860, 470, 0);

  createPlatform(2050, 470, 2);
  goal = createSprite(2115, 360);
  goal.addImage(goalImage);
}

function createPlayer() {
  player = createSprite(playerStartX, playerStartY, 0, 0);
  player.addAnimation("idle", playerIdleAnimation).looping = true;
  player.addAnimation("run", playerRunAnimation).looping = true;
  player.addAnimation("jump", playerJumpAnimation).looping = false;
  player.addAnimation("fall", playerFallAnimation).looping = false;
  player.scale = 0.25;
  player.setCollider("rectangle", 0, 0, 250, 490);
}

/*
  Draw a platform of specified length (len) at x, y
  Len must be at least 2.
*/
function createPlatform(x, y, len) {
  var first = createSprite(x, y, 0, 0);
  var last = createSprite(x + ((len - 1) * 128), y, 0, 0);
  first.addToGroup(platforms);
  last.addToGroup(platforms);
  first.addImage(platformImageFirst);
  last.addImage(platformImageLast);
  if(len > 2) {
    for(var i = 1; i < len - 1; i++) {
      var middle = createSprite(x + (128 * i), y, 0, 0);
      middle.addToGroup(platforms);
      middle.addImage(platformImageMiddle);
    }
  }
}

function createMonster(x, y, velocity) {
  var monster = createSprite(x, y, 0, 0);
  monster.addToGroup(monsters);
  monster.addAnimation("walk", monsterWalkAnimation).loop = true;
  monster.changeAnimation("walk");
  monster.scale = 0.25;
  monster.setCollider("rectangle", 0, 0, 380, 240);
  monster.velocity.x = velocity;
}

function createCollectable(x, y) {
  var collectable = createSprite(x, y, 0, 0);
  collectable.addToGroup(collectables);
  collectable.scale = 0.5;
  collectable.addImage(collectableImage);
}

function applyGravity() {
  player.velocity.y += GRAVITY;
  if(player.previousPosition.y !== player.position.y) {
    playerGrounded = false;
  }
  if(player.position.y >= height) {
    executeLoss();
  }
  for(var i = 0; i < monsters.length; i++) {
    monsters[i].velocity.y += GRAVITY;
    if(monsters[i].position.y >= height) {
        monsters[i].remove();
    }
  }
}

function handleCollisions() {
  player.collide(platforms, platformCollision);
  monsters.collide(platforms, platformCollision);
  player.collide(monsters, playerMonsterCollision);
  player.overlap(collectables, getCollectable);
  player.overlap(goal, executeWin);
}

function platformCollision(sprite, platform) {
  if(sprite === player && sprite.touching.bottom) {
    sprite.velocity.y = 0;
    currentJumpTime = maxJumpTime;
    currentJumpForce = DEFAULT_JUMP_FORCE;
    playerGrounded = true;
  }
  for(var i = 0; i < monsters.length; i++) {
    if(sprite === monsters[i] && sprite.touching.bottom) {
      sprite.velocity.y = 0;
    }
  }
}

function playerMonsterCollision(player, monster) {
  if(player.touching.bottom) {
    yahSound.play();
    hitSound.play();
    var defeatedMonster = createSprite(monster.position.x, monster.position.y, 50, 50);
    defeatedMonster.scale = 0.25;
    defeatedMonster.addImage(monsterDefeatImage);
    defeatedMonster.life = 40;
    monster.remove();
    currentJumpTime = maxJumpTime;
    currentJumpForce = DEFAULT_JUMP_FORCE;
    player.velocity.y = currentJumpForce;
    millis = new Date();
    score++;
  }
  else {
    executeLoss();
  }
}

function getCollectable(player, collectable) {
  collectableSound.play();
  collectable.remove();
  score++;
}

function updatePlayer() {
  //console.log(player.position);
  checkIdle();
  checkFalling();
  checkJumping();
  checkMovingLeftRight();
}

// If no button is being pressed and the player is grounded, show idle
// animation, and change x velocity to 0
function checkIdle() {
  if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && playerGrounded) {
    player.changeAnimation("idle");
    player.velocity.x = 0;
  }
}

function checkFalling() {
  if(!playerGrounded && player.velocity.y > 0) {
    player.changeAnimation("fall");
  }
}

function checkJumping() {
  if(player.velocity.y < 0) {
    player.changeAnimation("jump");
    if(keyIsDown(UP_ARROW) && currentJumpTime > 0) {
      player.velocity.y = currentJumpForce;
      deltaMillis = new Date();
      currentJumpTime -= deltaMillis - millis;
    }
  }
}

function checkMovingLeftRight() {
  if(keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    player.mirrorX(-1);
    if(playerGrounded) {
      player.changeAnimation("run");
    }
    player.velocity.x = -DEFAULT_VELOCITY;
  }
  else if(keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
    player.mirrorX(1);
    if(playerGrounded) {
      player.changeAnimation("run");
    }
    player.velocity.x = DEFAULT_VELOCITY;
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW && playerGrounded) {
    ayeSound.play();
    jumpSound.play();
    playerGrounded = false;
    player.velocity.y = currentJumpForce;
    millis = new Date();
  }
}

function keyReleased() {
  if(keyCode === UP_ARROW && player.velocity.y < 0) {
    currentJumpTime = 0;
  }
}

function keyTyped() {
  if(key === "p") {
    pauseSound.play();
    if(gameRunning) {
      gameRunning = false;
      noLoop();
      if(bgMusic.isPlaying()) {
        bgMusic.pause();
      }
    }
    else {
      gameRunning = true;
      loop();
      if(bgMusic.isPaused()) {
        bgMusic.loop();
      }
    }
  }
}

function updateDisplay() {
  // clear the screen
  background(0, 0, 0);

  // briefly turn off camera to get absolute position of display on canvas
  camera.off()

  // set the background image
  image(backgroundImage, 0, 0);

  // update score HUD
  textSize(32);
  fill(255);
  text("Score: " + score, 30, 50);

  // turn camera back on
  camera.on();

  // set camera's x position to player's x position
  camera.position.x = player.position.x;

  // animate collectables by rotating them clockwise
  for(var i = 0; i < collectables.length; i++) {
    collectables[i].rotation += 5;
  }
}

function executeWin() {
  winSound.play();
  yattaSound.play();
  gameRunning = false;
  noLoop();
  setTimeout(resetGame, 1000);
}

function executeLoss() {
  loseSound.play();
  gameRunning = false;
  noLoop();
  setTimeout(resetGame, 1000);
}

function toggleMusic() {
  if(bgMusic.isPlaying()) {
    bgMusic.pause();
  }
  else {
    bgMusic.loop();
  }
}
