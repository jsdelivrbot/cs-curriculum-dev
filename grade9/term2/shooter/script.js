// UI Variables
var canvas;
var canvasArea;
var shipSelectScreen;
var corvetteButton;
var destroyerButton;
var dreadnoughtButton;
var scoreDisplay;

// Game Variables
var ready;
var shooting;
var alienShooting;
var score;

// Ship Attributes
var shipName;
var shipColor;
var shipX;
var shipY;
var shipSize;
var shipSpeed;

// Bullet Attributes
var bulletSize;
var bulletX;
var bulletY;

// Alien Attributes
var alienX;
var alienY;
var alienSize;
var alienVelocity;

// Alien Bullet Attributes
var alienBulletSize;
var alienBulletX;
var alienBulletY;

function setup() {
  canvas = createCanvas(500, 400);
  background(20, 30, 40);
  canvasArea = select("#canvas-area");
  canvas.parent(canvasArea);
  // Access HTML elements with select()
  shipSelectScreen = select("#ship-select-screen");
  corvetteButton = select("#corvette-button");
  destroyerButton = select("#destroyer-button");
  dreadnoughtButton = select("#dreadnought-button");
  scoreDisplay = select("#score-display");
  // Add event listeners to HTML elements
  corvetteButton.mousePressed(function() {
    shipName = "Corvette";
    shipColor = "#ff0000";
    shipSize = 60;
    shipX = width / 2;
    shipY = height - shipSize  / 2;
    shipSpeed = 10;
    bulletSize = 20;
    ready = true;
    shipSelectScreen.hide();
    canvasArea.show();
  });
  destroyerButton.mousePressed(function() {
    shipName = "Destroyer";
    shipColor = "#00ff00";
    shipSize = 80;
    shipX = width / 2;
    shipY = height - shipSize  / 2;
    shipSpeed = 6;
    bulletSize = 30;
    ready = true;
    shipSelectScreen.hide();
    canvasArea.show();
  });
  dreadnoughtButton.mousePressed(function() {
    shipName = "Dreadnought";
    shipColor = "#0000ff";
    shipSize = 100;
    shipX = width / 2;
    shipY = height - shipSize  / 2;
    shipSpeed = 2;
    bulletSize = 40;
    ready = true;
    shipSelectScreen.hide();
    canvasArea.show();
  });
  alienSize = 40;
  alienBulletSize = 15;
  initGame();
}

function initGame() {
  canvasArea.hide();
  shipSelectScreen.show();
  alienX = alienSize / 2;
  alienY = alienSize / 2;
  alienVelocity = 10;
  ready = false;
  shooting = false;
  alienShooting = false;
  score = 0;
  scoreDisplay.html(score);
}

function draw() {
  if(ready) {
    background(20, 30, 40);
    drawShip();
    if(shooting) {
      drawBullet();
    }
    if(alienShooting) {
      drawAlienBullet();
    }
    drawAlien();
  }
}

function drawShip() {
  if(keyIsDown(LEFT_ARROW) && shipX > shipSize / 2) {
    shipX -= shipSpeed;
  }
  else if(keyIsDown(RIGHT_ARROW) && shipX + shipSize / 2 < width) {
    shipX += shipSpeed;
  }
  fill(shipColor);
  ellipse(shipX, shipY, shipSize, shipSize);
}

function keyPressed() {
  if(keyCode === 32 && shooting === false) {
    bulletY = shipY - shipSize / 2;
    bulletX = shipX;
    shooting = true;
  }
}

function drawBullet() {
  var hitAlien = checkCollision(alienX, alienY, alienSize, bulletX, bulletY, bulletSize);
  if(bulletY > 0 && !hitAlien) {
    fill("#ffff00");
    noStroke();
    ellipse(bulletX, bulletY, bulletSize, bulletSize);
    bulletY -= 10;
  }
  else if(hitAlien) {
    resetAlien();
    alienVelocity++;
    score++;
    scoreDisplay.html(score);
    shooting = false;
  }
  else {
    shooting = false;
  }
}

function drawAlien() {
  var hitShip = checkCollision(shipX, shipY, shipSize, alienX, alienY, alienSize);
  if((alienX - alienSize / 2 < width && alienY - alienSize / 2 < height) && !hitShip) {
    alienX += alienVelocity;
    if(alienX + alienSize / 2 >= width || alienX <= alienSize / 2) {
      alienVelocity *= -1;
      alienY += alienSize / 2;
    }
    fill("#ff00ff");
    ellipse(alienX, alienY, alienSize, alienSize);
    if(int(random(100)) < 25 && !alienShooting) {
      alienBulletY = alienY + alienSize / 2;
      alienBulletX = alienX;
      alienShooting = true;
    }
  }
  else if(hitShip) {
    alert("Game Over!");
    initGame();
  }
  else { //this should never happen since you can't dodge the alien!
    resetAlien();
  }
}

function resetAlien() {
  alienX = alienSize / 2;
  alienY = alienSize / 2;
  alienVelocity = abs(alienVelocity);
}

function drawAlienBullet() {
  var hitShip = checkCollision(shipX, shipY, shipSize, alienBulletX, alienBulletY, alienBulletSize);
  if(alienBulletY < height && !hitShip) {
    fill("#00ffff");
    noStroke();
    ellipse(alienBulletX, alienBulletY, alienBulletSize, alienBulletSize);
    alienBulletY += 10;
  }
  else if(hitShip) {
    alert("Game Over!");
    initGame();
  }
  else {
    alienShooting = false;
  }
}

function checkCollision(targetX, targetY, targetSize, myX, myY, mySize) {
  distance = dist(targetX, targetY, myX, myY);
  if(distance <= (targetSize + mySize) / 2) {
    return true;
  }
  else {
    return false;
  }
}
