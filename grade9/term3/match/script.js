// images
var imageArray;
var backImage, boltImage, cloudImage, sunImage, moonImage, smileyImage, heartImage;
var transitionImage1, transitionImage2, transitionImage3;

// animations
var boltAnimation, cloudAnimation, sunAnimation, moonAnimation, smileyAnimation,
heartAnimation;

// sprites
var spriteArray;
var boltSprite1, boltSprite2;
var cloudSprite1, cloudSprite2;
var sunSprite1, sunSprite2;
var moonSprite1, moonSprite2;
var smileySprite1, smileySprite2;
var heartSprite1, heartSprite2;

// sprite variables
var spriteWidth, spriteHeight;
var spriteX, spriteY;

// sounds
var flipSound, matchSound, nopeSound, winSound, loseSound, bgMusic;

// game variables
var firstsprite, secondsprite;
var lives, matches;
var spritesActive;

// UI variables
var gameScreen;
var messageDisplay, livesDisplay;
var resetButton, musicButton;

function preload() {
  loadImages();
  loadAnimations();
  loadSounds();
}

function loadImages() {
  backImage = loadImage("assets/img/back.png");
  boltImage = loadImage("assets/img/bolt.png");
  cloudImage = loadImage("assets/img/cloud.png");
  sunImage = loadImage("assets/img/sun.png");
  moonImage = loadImage("assets/img/moon.png");
  smileyImage = loadImage("assets/img/smiley.png");
  heartImage = loadImage("assets/img/heart.png");
  transitionImage1 = loadImage("assets/img/transition1.png");
  transitionImage2 = loadImage("assets/img/transition2.png");
  transitionImage3 = loadImage("assets/img/transition3.png");
}

function loadAnimations() {
  boltAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, boltImage);
  cloudAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, cloudImage);
  sunAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, sunImage);
  moonAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, moonImage);
  smileyAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, smileyImage);
  heartAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, heartImage);
}

function loadSounds() {
  soundFormats("mp3", "wav");
  flipSound = loadSound("assets/sound/flip.wav");
  matchSound = loadSound("assets/sound/match.wav");
  nopeSound = loadSound("assets/sound/nope.wav");
  winSound = loadSound("assets/sound/win.wav");
  loseSound = loadSound("assets/sound/lose.wav");
  bgMusic = loadSound("assets/sound/bgm.mp3");
}

function setup() {
  bgMusic.setVolume(0.1);
  bgMusic.loop();
  gameScreen = createCanvas(790, 370);
  gameScreen.parent("#game-screen");
  messageDisplay = select("#message-display");
  livesDisplay = select("#lives-display");
  resetButton = select("#reset");
  musicButton = select("#music");
  resetButton.mousePressed(resetGame);
  musicButton.mousePressed(toggleMusic);
  spriteWidth = 120;
  spriteHeight = 168;
  init();
  imageArray = [backImage, boltImage, cloudImage, sunImage, moonImage,
                smileyImage, heartImage, transitionImage1, transitionImage2,
                transitionImage3];
  resizeImages();
  createSprites();
  spriteArray = [boltSprite1, boltSprite2, cloudSprite1, cloudSprite2,
               sunSprite1, sunSprite2, moonSprite1, moonSprite2,
               smileySprite1, smileySprite2, heartSprite1, heartSprite2];
  addAnimations();
  shuffle(spriteArray, true);
  placeSprites();
  spritesActive = true;
}

function draw() {
  background(20, 40, 60);
  drawSprites();
}

function init() {
  resetButton.hide();
  musicButton.show();
  messageDisplay.html("Lives: ");
  lives = 5;
  livesDisplay.html(lives);
  matches = 0;
  spriteOne = undefined;
  spriteTwo = undefined;
  spriteX = 70;
  spriteY = 95;
}

function resetGame() {
  init();
  resetAllSprites(); // wait 1 second while sprites are resetting
  setTimeout(function() {
    shuffle(spriteArray, true);
    placeSprites();
    spritesActive = true;
  }, 1000);
}

function toggleMusic() {
  if(bgMusic.isPlaying()) {
    bgMusic.pause();
  }
  else {
    bgMusic.loop();
  }
}

function resizeImages() {
  for(var i = 0; i < imageArray.length; i++) {
    imageArray[i].resize(spriteWidth, spriteHeight);
  }
}

function createSprites() {
    boltSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
    boltSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
    cloudSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
    cloudSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
    sunSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
    sunSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
    moonSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
    moonSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
    smileySprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
    smileySprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
    heartSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
    heartSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
}

function placeSprites() {
  for(var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].position.x = spriteX;
    spriteArray[i].position.y = spriteY;
    if((i + 1) % 6 === 0) {
      spriteX = 70;
      spriteY += spriteHeight + 10;
    }
    else {
      spriteX += spriteWidth + 10;
    }
  }
}

function addAnimations() {
  var animations = [boltAnimation, boltAnimation, cloudAnimation, cloudAnimation,
                        sunAnimation, sunAnimation, moonAnimation, moonAnimation,
                        smileyAnimation, smileyAnimation, heartAnimation, heartAnimation];
  for(var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].addAnimation("flip", animations[i]);
    spriteArray[i].animation.frameDelay = 10;
    spriteArray[i].animation.looping = false;
    spriteArray[i].animation.playing = false;
    activateSprite(spriteArray[i]);
  }
}


function activateSprite(s) {
  s.onMousePressed = function() {
    if(spritesActive && s.animation.getFrame() !== s.animation.getLastFrame()) {
      if(spriteOne === undefined) {
        spriteOne = s;
        flipSound.play();
        s.animation.goToFrame(s.animation.getLastFrame());
      }
      else if(s !== spriteOne) {
        spriteTwo = s;
        flipSound.play();
        s.animation.goToFrame(s.animation.getLastFrame());
        checkMatch();
      }
    }
  }
}

function checkMatch() {
  var boltMatch = (spriteOne === boltSprite1 && spriteTwo === boltSprite2) || (spriteOne === boltSprite2 && spriteTwo === boltSprite1);
  var cloudMatch = (spriteOne === cloudSprite1 && spriteTwo === cloudSprite2) || (spriteOne === cloudSprite2 && spriteTwo === cloudSprite1);
  var sunMatch = (spriteOne === sunSprite1 && spriteTwo === sunSprite2) || (spriteOne === sunSprite2 && spriteTwo === sunSprite1);
  var moonMatch = (spriteOne === moonSprite1 && spriteTwo === moonSprite2) || (spriteOne === moonSprite2 && spriteTwo === moonSprite1);
  var smileyMatch = (spriteOne === smileySprite1 && spriteTwo === smileySprite2) || (spriteOne === smileySprite2 && spriteTwo === smileySprite1);
  var heartMatch = (spriteOne === heartSprite1 && spriteTwo === heartSprite2) || (spriteOne === heartSprite2 && spriteTwo === heartSprite1);
  if(boltMatch || cloudMatch || sunMatch || moonMatch || smileyMatch || heartMatch) {
    matches++;
    //console.log("Match!");
    if(matches === spriteArray.length / 2) {
      winSound.play();
      messageDisplay.html("YOU WIN!!! YOU ARE A BEAST!!!");
      livesDisplay.html("");
      //console.log("You win!");
      spritesActive = false;
      resetButton.show();
      musicButton.hide();
    }
    else {
      matchSound.play();
      spriteOne = undefined;
      spriteTwo = undefined;
    }
  }
  else {
    lives--;
    livesDisplay.html(lives);
    //console.log("No Match!");
    spritesActive = false;
    //console.log("sprites active: " + spritesActive);
    if(lives === 0) {
      setTimeout(function() {
        //console.log("You lose!");
        loseSound.play();
        messageDisplay.html("YOU LOSE!!! DANG!!!");
        livesDisplay.html("");
        flipAllSprites();
        resetButton.show();
        musicButton.hide();
      }, 2000);
    }
    else {
      setTimeout(function() {
        nopeSound.play();
        spriteOne.animation.goToFrame(0);
        spriteTwo.animation.goToFrame(0);
        spriteOne = undefined;
        spriteTwo = undefined;
        spritesActive = true;
        //console.log("sprites active: " + spritesActive);
      }, 2000);
    }
  }
}

function flipAllSprites() {
  for(var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].animation.goToFrame(spriteArray[i].animation.getLastFrame());
  }
}

function resetAllSprites() {
  for(var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].animation.goToFrame(0);
  }
}
