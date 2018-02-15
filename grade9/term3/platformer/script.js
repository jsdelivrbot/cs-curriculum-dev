var minHeight;
var maxHeight;
var playerSprite;
var falling;

function setup() {
  createCanvas(800, 300);
  minHeight = 250;
  maxHeight = 150;
  playerSprite = createSprite(width / 2, minHeight, 50, 50);
  falling = false;
}

function draw() {
  background(20, 40, 60);
  animatePlayer();
  drawSprites();
}

function animatePlayer() {
  if(!falling && keyIsDown(UP_ARROW) && playerSprite.position.y > maxHeight) {
    playerSprite.velocity.y = -5;
  }
  else {
    falling = true;
    if(playerSprite.position.y < minHeight){
      playerSprite.velocity.y += 0.5;
    }
    else {
      playerSprite.velocity.y = 0;
      falling = false;
    }
  }
  if(keyIsDown(RIGHT_ARROW)) { // accelerate right
    if(playerSprite.position.x < width - playerSprite.width / 2) {
      if(playerSprite.velocity.x < 5) {
        playerSprite.velocity.x += 0.5;
      }
    }
    else {
      playerSprite.velocity.x = 0;
    }
  }
  else if(keyIsDown(LEFT_ARROW)) { // accelerate left
    if(playerSprite.position.x > 0 + playerSprite.width / 2) {
      if(playerSprite.velocity.x > -5) {
        playerSprite.velocity.x -= 0.5;
      }
    }
    else {
      playerSprite.velocity.x = 0;
    }
  }
  else { // decelerate
    var d = playerSprite.getDirection();
    if(d > -90 && d < 90) {
      if(playerSprite.position.x >= width - playerSprite.width / 2) {
        playerSprite.velocity.x = 0;
      }
      else if(playerSprite.velocity.x > 0){
        playerSprite.velocity.x -= 0.5;
      }
    }
    else if(d > 90 || d < -90) {
      if(playerSprite.position.x <= 0 + playerSprite.width / 2) {
        playerSprite.velocity.x = 0;
      }
      else if(playerSprite.velocity.x < 0){
        playerSprite.velocity.x += 0.5;
      }
    }
  }
}
