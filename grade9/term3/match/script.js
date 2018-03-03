// card images
var imageArray;
var backImage, boltImage, cloudImage, sunImage, moonImage, smileyImage, heartImage;
var transitionImage1, transitionImage2, transitionImage3;

// card animations
var boltAnimation, cloudAnimation, sunAnimation, moonAnimation, smileyAnimation,
heartAnimation;

// card sprites
var cardSpriteArray;
var boltCard1, boltCard2;
var cloudCard1, cloudCard2;
var sunCard1, sunCard2;
var moonCard1, moonCard2;
var smileyCard1, smileyCard2;
var heartCard1, heartCard2;

// card attributes
var cardWidth, cardHeight;
var cardXOffset, cardYOffset;

// sounds
var flipSound, matchSound, nopeSound, winSound, loseSound, bgMusic;

// game variables
var firstCard, secondCard;
var lives, matches;
var cardsActive;

// UI variables
var messageDisplay, livesDisplay, resetButton, musicButton;

function preload() {
  loadImages();
  loadAnimations();
  loadSounds();
}

function loadImages() {
  backImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/back.png");
  boltImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/bolt.png");
  cloudImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/cloud.png");
  sunImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/sun.png");
  moonImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/moon.png");
  smileyImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/smiley.png");
  heartImage = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/heart.png");
  transitionImage1 = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/transition1.png");
  transitionImage2 = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/transition2.png");
  transitionImage3 = loadImage("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/img/transition3.png");
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
  flipSound = loadSound("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/sound/flip.wav");
  matchSound = loadSound("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/sound/match.wav");
  nopeSound = loadSound("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/sound/nope.wav");
  winSound = loadSound("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/sound/win.wav");
  loseSound = loadSound("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/sound/lose.wav");
  bgMusic = loadSound("https://raw.githubusercontent.com/CodeNextCoaches/cs-curriculum-dev/master/grade9/term3/match/assets/sound/bgm.mp3");
}

function setup() {
  bgMusic.setVolume(0.1);
  bgMusic.loop();
  createCanvas(790, 370);
  messageDisplay = select("#message-display");
  livesDisplay = select("#lives-display");
  resetButton = select("#reset");
  musicButton = select("#music");
  resetButton.mousePressed(resetGame);
  musicButton.mousePressed(toggleMusic);
  cardWidth = 120;
  cardHeight = 168;
  init();
  imageArray = [backImage, boltImage, cloudImage, sunImage, moonImage,
                smileyImage, heartImage, transitionImage1, transitionImage2,
                transitionImage3];
  resizeImages();
  createSprites();
  cardSpriteArray = [boltCard1, boltCard2, cloudCard1, cloudCard2,
               sunCard1, sunCard2, moonCard1, moonCard2,
               smileyCard1, smileyCard2, heartCard1, heartCard2];
  addAnimations();
  shuffle(cardSpriteArray, true);
  placeCards();
  cardsActive = true;
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
  cardOne = undefined;
  cardTwo = undefined;
  cardXOffset = 70;
  cardYOffset = 95;
}

function resetGame() {
  init();
  resetAllCards(); // wait 1 second while cards are resetting
  setTimeout(function() {
    shuffle(cardSpriteArray, true);
    placeCards();
    cardsActive = true;
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
    imageArray[i].resize(cardWidth, cardHeight);
  }
}

function createSprites() {
    boltCard1 = createSprite(0, 0, cardWidth, cardHeight);
    boltCard2 = createSprite(0, 0, cardWidth, cardHeight);
    cloudCard1 = createSprite(0, 0, cardWidth, cardHeight);
    cloudCard2 = createSprite(0, 0, cardWidth, cardHeight);
    sunCard1 = createSprite(0, 0, cardWidth, cardHeight);
    sunCard2 = createSprite(0, 0, cardWidth, cardHeight);
    moonCard1 = createSprite(0, 0, cardWidth, cardHeight);
    moonCard2 = createSprite(0, 0, cardWidth, cardHeight);
    smileyCard1 = createSprite(0, 0, cardWidth, cardHeight);
    smileyCard2 = createSprite(0, 0, cardWidth, cardHeight);
    heartCard1 = createSprite(0, 0, cardWidth, cardHeight);
    heartCard2 = createSprite(0, 0, cardWidth, cardHeight);
}

function placeCards() {
  for(var i = 0; i < cardSpriteArray.length; i++) {
    cardSpriteArray[i].position.x = cardXOffset;
    cardSpriteArray[i].position.y = cardYOffset;
    if((i + 1) % 6 === 0) {
      cardXOffset = 70;
      cardYOffset += cardHeight + 10;
    }
    else {
      cardXOffset += cardWidth + 10;
    }
  }
}

function addAnimations() {
  var cardAnimations = [boltAnimation, boltAnimation, cloudAnimation, cloudAnimation,
                        sunAnimation, sunAnimation, moonAnimation, moonAnimation,
                        smileyAnimation, smileyAnimation, heartAnimation, heartAnimation];
  for(var i = 0; i < cardSpriteArray.length; i++) {
    cardSpriteArray[i].addAnimation("flip", cardAnimations[i]);
    cardSpriteArray[i].animation.frameDelay = 10;
    cardSpriteArray[i].animation.looping = false;
    cardSpriteArray[i].animation.playing = false;
    activateCard(cardSpriteArray[i]);
  }
}

function activateCard(card) {
  card.onMousePressed = function() {
    if(cardsActive && card.animation.getFrame() !== card.animation.getLastFrame()) {
      if(cardOne === undefined) {
        flipSound.play();
        card.animation.playing = true;
        card.animation.goToFrame(card.animation.getLastFrame());
        cardOne = card;
        cardTwo = undefined;
      }
      else if(card !== cardOne) {
        flipSound.play();
        card.animation.playing = true;
        card.animation.goToFrame(card.animation.getLastFrame());
        cardTwo = card;
        checkMatch();
      }
    }
  }
}

function checkMatch() {
  var boltMatch = (cardOne === boltCard1 && cardTwo === boltCard2) || (cardOne === boltCard2 && cardTwo === boltCard1);
  var cloudMatch = (cardOne === cloudCard1 && cardTwo === cloudCard2) || (cardOne === cloudCard2 && cardTwo === cloudCard1);
  var sunMatch = (cardOne === sunCard1 && cardTwo === sunCard2) || (cardOne === sunCard2 && cardTwo === sunCard1);
  var moonMatch = (cardOne === moonCard1 && cardTwo === moonCard2) || (cardOne === moonCard2 && cardTwo === moonCard1);
  var smileyMatch = (cardOne === smileyCard1 && cardTwo === smileyCard2) || (cardOne === smileyCard2 && cardTwo === smileyCard1);
  var heartMatch = (cardOne === heartCard1 && cardTwo === heartCard2) || (cardOne === heartCard2 && cardTwo === heartCard1);
  if(boltMatch || cloudMatch || sunMatch || moonMatch || smileyMatch || heartMatch) {
    matches++;
    //console.log("Match!");
    if(matches === cardSpriteArray.length / 2) {
      winSound.play();
      messageDisplay.html("YOU WIN!!! YOU ARE A BEAST!!!");
      livesDisplay.html("");
      //console.log("You win!");
      cardsActive = false;
      resetButton.show();
      musicButton.hide();
    }
    else {
      matchSound.play();
      cardOne = undefined;
      cardTwo = undefined;
    }
  }
  else {
    lives--;
    livesDisplay.html(lives);
    //console.log("No Match!");
    cardsActive = false;
    //console.log("cards active: " + cardsActive);
    if(lives === 0) {
      setTimeout(function() {
        //console.log("You lose!");
        loseSound.play();
        messageDisplay.html("YOU LOSE!!! DANG!!!");
        livesDisplay.html("");
        flipAllCards();
        resetButton.show();
        musicButton.hide();
      }, 2000);
    }
    else {
      setTimeout(function() {
        nopeSound.play();
        cardOne.animation.goToFrame(0);
        cardTwo.animation.goToFrame(0);
        cardOne = undefined;
        cardTwo = undefined;
        cardsActive = true;
        //console.log("cards active: " + cardsActive);
      }, 2000);
    }
  }
}

function flipAllCards() {
  for(var i = 0; i < cardSpriteArray.length; i++) {
    cardSpriteArray[i].animation.goToFrame(cardSpriteArray[i].animation.getLastFrame());
  }
}

function resetAllCards() {
  for(var i = 0; i < cardSpriteArray.length; i++) {
    cardSpriteArray[i].animation.goToFrame(0);
  }
}
