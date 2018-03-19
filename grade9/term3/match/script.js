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
  firstChoice = undefined;
  secondChoice = undefined;
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
      if(firstChoice === undefined) {
        firstChoice = s;
        flipSound.play();
        s.animation.goToFrame(s.animation.getLastFrame());
      }
      else if(s !== firstChoice) {
        secondChoice = s;
        flipSound.play();
        s.animation.goToFrame(s.animation.getLastFrame());
        checkMatch();
      }
    }
  }
}

function checkMatch() {
  var boltMatch = (firstChoice === boltSprite1 && secondChoice === boltSprite2) || (firstChoice === boltSprite2 && secondChoice === boltSprite1);
  var cloudMatch = (firstChoice === cloudSprite1 && secondChoice === cloudSprite2) || (firstChoice === cloudSprite2 && secondChoice === cloudSprite1);
  var sunMatch = (firstChoice === sunSprite1 && secondChoice === sunSprite2) || (firstChoice === sunSprite2 && secondChoice === sunSprite1);
  var moonMatch = (firstChoice === moonSprite1 && secondChoice === moonSprite2) || (firstChoice === moonSprite2 && secondChoice === moonSprite1);
  var smileyMatch = (firstChoice === smileySprite1 && secondChoice === smileySprite2) || (firstChoice === smileySprite2 && secondChoice === smileySprite1);
  var heartMatch = (firstChoice === heartSprite1 && secondChoice === heartSprite2) || (firstChoice === heartSprite2 && secondChoice === heartSprite1);
  if(boltMatch || cloudMatch || sunMatch || moonMatch || smileyMatch || heartMatch) {
    matches++;
    if(matches === spriteArray.length / 2) {
      winSound.play();
      messageDisplay.html("YOU WIN!!! YOU ARE A BEAST!!!");
      livesDisplay.html("");
      spritesActive = false;
      resetButton.show();
      musicButton.hide();
    }
    else {
      matchSound.play();
      firstChoice = undefined;
      secondChoice = undefined;
    }
  }
  else {
    lives--;
    livesDisplay.html(lives);
    spritesActive = false;
    if(lives === 0) {
      setTimeout(function() {
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
        firstChoice.animation.goToFrame(0);
        secondChoice.animation.goToFrame(0);
        firstChoice = undefined;
        secondChoice = undefined;
        spritesActive = true;
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
