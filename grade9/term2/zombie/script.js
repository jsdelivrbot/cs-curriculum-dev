var playerX;
var playerY;
var zombieCoordinates = [];
var maxZombies;
var zombieSpeed = 0.01;

function setup() {
  createCanvas(600, 400);
  playerX = 0;
  playerY = 0;
  maxZombies = 20;
  livingZombies = 0;
  while(livingZombies < maxZombies * 2) {
    zombieCoordinates[livingZombies] = random(width);
    livingZombies++;
    zombieCoordinates[livingZombies] = random(height);
    livingZombies++;
  }
}

function draw() {
  background(51);
  animatePlayer();
  for(var i = 0; i < zombieCoordinates.length; i += 2) {
    animateZombie(i, i + 1);
  }
  //drawPowerups();
}

function animatePlayer() {
  var dx = mouseX - playerX;
  if(abs(dx) > 1 && mouseX < width && mouseX > 0) {
    playerX += dx;
  }
  var dy = mouseY - playerY;
  if(abs(dy) > 1 && mouseY < height && mouseY > 0) {
    playerY += dy;
  }
  fill("#0000ff");
  ellipse(playerX, playerY, 50, 50);
}

function animateZombie(coordX, coordY) {
  var zombieX = zombieCoordinates[coordX];
  var zombieY = zombieCoordinates[coordY];
  var dx = playerX - zombieX;
  if(abs(dx) < 75) {
    zombieX += dx * zombieSpeed;
  }
  else if(zombieX < width && zombieX > 0) {
    zombieX += random(-10, 10);
  }
  else {
    zombieX = random(width);
  }
  var dy = playerY - zombieY;
  if(abs(dy) < 75) {
    zombieY += dy * zombieSpeed;
  }
  else if(zombieY < height && zombieY > 0) {
    zombieY += random(-10, 10);
  }
  else {
    zombieY = random(height);
  }
  fill("#ff0000");
  ellipse(zombieX, zombieY, 20, 20);
  zombieCoordinates[coordX] = zombieX;
  zombieCoordinates[coordY] = zombieY;
}

function drawPowerups() {

}

function checkCollision() {

}
