var playerX = 0;
var playerY = 0;
var playerRadius = 50;
var zombies = [];
var maxZombies = 20;

function setup() {
  createCanvas(600, 400);
  createZombies(maxZombies);
}

function draw() {
  background(51);
  animatePlayer();
  for(var i = 0; i < zombies.length; i++) {
    animateZombie(zombies[i]);
  }
  //drawPowerups();
}

function createZombies(num) {
  for(var i = 0; i < num; i++) {
    var zombieRadius = random(20, 40);
    var zombieSpeed = random(10) / 100;
    var zombie = {xPos:random(width), yPos:random(height), radius:zombieRadius, speed:zombieSpeed};
    zombies.push(zombie);
  }
}

function animatePlayer() {
  // Make player sprite follow the player's mouse/touch
  var distance = dist(mouseX, mouseY, playerX, playerY);
  if(distance > 1) {
    if(mouseX < width && mouseX > 0) {
      playerX += mouseX - playerX;
    }
    if(mouseY < height && mouseY > 0) {
      playerY += mouseY - playerY;
    }
  }
  fill("#0000ff");
  ellipse(playerX, playerY, playerRadius, playerRadius);
}

function animateZombie(zombie) {
  fill("#ff0000");
  // Get distance between this zombie and the player
  var distance = dist(zombie.xPos, zombie.yPos, playerX, playerY);
  // If the player is far away, just get jiggy with it like Will Smiff.
  if(distance > 75) {
    zombie.xPos += random(-10, 10);
    zombie.yPos += random(-10, 10);
  }
  // If you see the player, chase them!
  else {
    zombie.xPos += (playerX - zombie.xPos) * zombie.speed;
    zombie.yPos += (playerY - zombie.yPos) * zombie.speed;
    //If you hit the player, turn green.
    if(distance <= (zombie.radius + playerRadius) / 2) {
      fill("#00ff00");
    }
  }
  if(zombie.xPos < 0 || zombie.xPos > width ||
    zombie.yPos < 0 || zombie.yPos > height){
      zombie.xPos = random(width);
      zombie.yPos = random(height);
    }
  ellipse(zombie.xPos, zombie.yPos, zombie.radius, zombie.radius);
}

// TODO: This function creates "survivors" that the player has to save from zombies.
function createSurvivors() {

}
