var gameScreen;

var player;
var playerIdleAnimation, playerRunAnimation, playerJumpAnimation, playerFallAnimation;

var playerGrounded;
var playerJumping;
var platforms;
var platformImageFirst;
var platformImageMiddle;
var platformImageLast;

const DEFAULT_VELOCITY = 5;

const GRAVITY = 0.5;
const DEFAULT_JUMP_FORCE = -5;
var currentJumpForce;

const maxJumpTime = 2000; //milliseconds
var currentJumpTime;

var millis;
var deltaMillis;

var cameraCenter;
var cameraLeftBuffer;
var cameraRightBuffer;

var backgroundImage;

function preload() {
  backgroundImage = loadImage("assets/img/backgrounds/BG.png");
  platformImageFirst = loadImage("assets/img/tiles/Tile (14).png");
  platformImageMiddle = loadImage("assets/img/tiles/Tile (15).png");
  platformImageLast = loadImage("assets/img/tiles/Tile (16).png");
  playerIdleAnimation = loadAnimation("assets/img/kunoichi/Idle__000.png", "assets/img/kunoichi/Idle__009.png");
  playerRunAnimation = loadAnimation("assets/img/kunoichi/Run__000.png", "assets/img/kunoichi/Run__009.png");
  playerJumpAnimation = loadAnimation("assets/img/kunoichi/Jump__000.png", "assets/img/kunoichi/Jump__004.png");
  playerFallAnimation = loadAnimation("assets/img/kunoichi/Jump__005.png", "assets/img/kunoichi/Jump__009.png");
}

function setup() {
  gameScreen = createCanvas(1280, 720);
  gameScreen.parent("#game-screen");
  backgroundImage.resize(width * 2, height);
  platforms = new Group();
  buildLevel();
  player = createSprite(0, 0, 50, 50);
  player.addAnimation("idle", playerIdleAnimation).looping = true;
  player.addAnimation("run", playerRunAnimation).looping = true;
  player.addAnimation("jump", playerJumpAnimation).looping = false;
  player.addAnimation("fall", playerFallAnimation).looping = false;
  player.scale = 0.25;
  player.setCollider("rectangle", 0, 0, 300, 475);
  player.position.x = 0;

  currentJumpForce = DEFAULT_JUMP_FORCE;
  currentJumpTime = maxJumpTime;
  playerGrounded = false;
  playerJumping = false;

  camera.on();
  camera.zoom = 1;
  cameraLeftBuffer = player.position.x - 50;
  cameraRightBuffer = player.position.x + 50;
  camera.position.x = cameraRightBuffer + 150;
}

function draw() {
  background(20, 40, 60);
  handleCollisions();
  animatePlayer();
  updateCamera();
  player.debug = mouseIsPressed;
  image(backgroundImage, 0, 0);
  drawSprites();
}

function buildLevel() {
  drawPlatform(0, height, 5);
  drawPlatform(800, height - 75, 3);
  drawPlatform(1400, height - 125, 4);
  drawPlatform(2000, height - 225, 2);
}

function handleCollisions() {
  player.collide(platforms);
  if(player.touching.bottom) {
    currentJumpTime = maxJumpTime;
    player.velocity.y = 0;
    playerGrounded = true;
    currentJumpForce = DEFAULT_JUMP_FORCE;
    playerJumping = false;
  }
  else {
    playerGrounded = false;
  }
}

function animatePlayer() {
  player.velocity.y += GRAVITY;
  if(playerJumping) {
    player.changeAnimation("jump");
    player.animation.rewind();
  }
  else if(!playerGrounded) {
    player.changeAnimation("fall");
    player.animation.rewind();
  }
  if(keyIsDown(UP_ARROW) && playerJumping) {
    if(currentJumpTime > 0) {
      player.velocity.y = currentJumpForce;
      deltaMillis = new Date();
      currentJumpTime -= deltaMillis - millis;
    }
    else {
      playerJumping = false;
    }
  }
  if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    if(playerGrounded) {
      player.changeAnimation("idle");
    }
    else {
      player.changeAnimation("fall");
      player.animation.rewind();
    }
    player.velocity.x = 0; // comment out to make player "slide"
  }
  if(keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    player.mirrorX(-1);
    if(playerGrounded) {
      player.changeAnimation("run");
    }
    player.velocity.x = -DEFAULT_VELOCITY;
  }
  if(keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
    player.mirrorX(1);
    if(playerGrounded) {
      player.changeAnimation("run");
    }
    player.velocity.x = DEFAULT_VELOCITY;
  }
}

function updateCamera() {
  if(player.position.x >= cameraRightBuffer) {
    cameraRightBuffer = player.position.x;
    cameraLeftBuffer = player.position.x - 100;
    if(camera.position.x < cameraRightBuffer + 150) {
      camera.position.x += 20;
    }
    else {
      camera.position.x += player.velocity.x;
    }
  }
  if(player.position.x <= cameraLeftBuffer) {
    cameraLeftBuffer = player.position.x;
    cameraRightBuffer = player.position.x + 100;
    if(camera.position.x > cameraLeftBuffer - 150) {
      camera.position.x -= 20;
    }
    else {
      camera.position.x += player.velocity.x;
    }
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW && playerGrounded) {
    playerGrounded = false;
    player.velocity.y = currentJumpForce;
    playerJumping = true;
    millis = new Date();
  }
}

function keyReleased() {
  if(keyCode === UP_ARROW && playerJumping) {
    currentJumpTime = 0;
    playerJumping = false;
  }
}

/*
  Draw a platform of specified length (len) at x, y
  Len must be at least 2.
*/
function drawPlatform(x, y, len) {
  var first = createSprite(x, y, 128, 128);
  var last = createSprite(x + ((len - 1) * 128), y, 128, 128);
  first.addToGroup(platforms);
  last.addToGroup(platforms);
  first.addAnimation("first-platform", platformImageFirst);
  last.addAnimation("last-platform", platformImageLast);
  if(len > 2) {
    for(var i = 1; i < len - 1; i++) {
      var middle = createSprite(x + (128 * i), y, 128, 128);
      middle.addToGroup(platforms);
      middle.addAnimation("middie-platform", platformImageMiddle);
    }
  }
}
