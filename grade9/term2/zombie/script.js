var playerX;
var playerY;
var playerRadius;
var playerColors;
var playerHealth;
var zombies;
var maxZombies;
var survivors;
var maxSurvivors;
var totalSaved;
var healthDisplay = document.getElementById("player-health");
var survivorsDisplay = document.getElementById("survivors");

function setup() {
  playerX = 0;
  playerY = 0;
  playerRadius = 50;
  playerColors = {"#ff9900", "#aeff00", "#60c194", "#d900ed", "#0000ff"};
  playerHealth = playerColors.length;
  zombies = [];
  maxZombies = 20;
  survivors = [];
  maxSurvivors = 5;
  totalSaved = 0;
  healthDisplay.innerHTML = playerHealth;
  survivorsDisplay.innerHTML = maxSurvivors - totalSaved;
  createCanvas(800, 500);
  createZombies(maxZombies);
  createSurvivors(maxSurvivors);
}

function draw() {
  background(51);
  animatePlayer();
  // animate each individual zombie
  for(var i = 0; i < zombies.length; i++) {
    if(!zombies[i].dead) {
      animateZombie(zombies[i]);
    }
  }
  // animate each individual survivor
  for(var i = 0; i < survivors.length; i++) {
    if(!survivors[i].saved) {
      animateSurvivor(survivors[i]);
    }
  }
}

function createZombies(num) {
  for(var i = 0; i < num; i++) {
    var zombie = {
      x:random(width),
      y:random(height),
      radius:random(20, 40),
      speed:random(10) / 100,
      color:"#ff0000",
      dead:false
    };
    zombies.push(zombie);
  }
}

function createSurvivors(num) {
  for(var i = 0; i < num; i++) {
    var survivor = {
      x:random(width),
      y:random(height),
      radius:random(10, 20),
      speed:0.1,
      color:"#00ffff",
      saved:false
    };
    survivors.push(survivor);
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
  // Collect survivors. Collect them all and you win!
  for(var i = 0; i < survivors.length; i++) {
    var distance = dist(survivors[i].x, survivors[i].y, playerX, playerY);
    if(distance <= (survivors[i].radius + playerRadius) / 2 && !survivors[i].saved) {
      survivors[i].saved = true;
      totalSaved++;
      survivorsDisplay.innerHTML = maxSurvivors - totalSaved;
      if(totalSaved === maxSurvivors) {
        alert("YOU WIN!");
        setup();
      }
    }
  }
  fill(playerColors[playerHealth - 1]);
  ellipse(playerX, playerY, playerRadius, playerRadius);
}

function animateZombie(zombie) {
  // Get distance between this zombie and the player
  var distance = dist(zombie.x, zombie.y, playerX, playerY);
  // If the player is far away, just get jiggy with it like Will Smiff.
  if(distance > 100) {
    zombie.x += random(-10, 10);
    zombie.y += random(-10, 10);
  }
  // If you see the player, chase them!
  else {
    zombie.x += (playerX - zombie.x) * zombie.speed;
    zombie.y += (playerY - zombie.y) * zombie.speed;
    //If you hit the player, player loses health and you self-destruct!
    if(distance <= (zombie.radius + playerRadius) / 2) {
      zombie.dead = true;
      playerHealth--;
      healthDisplay.innerHTML = playerHealth;
      if(playerHealth === 0) {
        alert("You Lose!");
        setup();
      }
    }
  }
  if(zombie.x < 0 || zombie.x > width ||
    zombie.y < 0 || zombie.y > height){
      zombie.x = random(width);
      zombie.y = random(height);
    }
  fill(zombie.color);
  ellipse(zombie.x, zombie.y, zombie.radius, zombie.radius);
}

// Survivors run away from zombies!
function animateSurvivor(survivor) {
  for(var i = 0; i < zombies.length; i++) {
    var distance = dist(survivor.x, survivor.y, zombies[i].x, zombies[i].y);
    if(distance < 50) {
      survivor.x -= (zombies[i].x - survivor.x) * survivor.speed;
      survivor.y -= (zombies[i].y - survivor.y) * survivor.speed;
    }
    if(survivor.x < 0 || survivor.x > width ||
      survivor.y < 0 || survivor.y > height){
        survivor.x = random(width);
        survivor.y = random(height);
    }
    fill(survivor.color);
    ellipse(survivor.x, survivor.y, survivor.radius, survivor.radius);
  }
}
