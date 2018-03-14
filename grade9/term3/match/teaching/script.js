// images
var imageArray;
var backImage, sunImage, moonImage;
var transitionImage1, transitionImage2, transitionImage3;

// animations
var sunAnimation, moonAnimation;

// sprites
var spriteArray;
var sunSprite1, sunSprite2;
var moonSprite1, moonSprite2;

// sprite properties
var spriteWidth, spriteHeight;
var spriteX, spriteY;

// game variables
var cardsActive;
var lives, matches;
var firstCard, secondCard;

// UI variables
var gameScreen;

/*
 * function loadImages()
 * Called in the preload() function. Loads all images from your GitHub
 * repository using the built-in p5.play function "loadImage()", with the
 * absolute URL to the image file itself as string input. You can obtain
 * an absolute "raw" URL to GitHub resources using https://rawgit.com/ (be
 * sure to use the "development" URL).
 * Example:
   function loadImages() {
     myImage = loadImage("https://rawgit.com/path/to/image.png");
   }
 */

 function loadImages() {
   backImage = loadImage("assets/img/back.png");
   sunImage = loadImage("assets/img/sun.png");
   moonImage = loadImage("assets/img/moon.png");
   transitionImage1 = loadImage("assets/img/transition1.png");
   transitionImage2 = loadImage("assets/img/transition2.png");
   transitionImage3 = loadImage("assets/img/transition3.png");
 }

/*
 * function loadAnimations()
 * Called in the preload() function. Loads all animations using the built-in
 * p5.play function "loadAnimation()". Therefore, this function is called after
 * loadImages(). The loadAnimation() function takes image input in the order
 * you'd like the animation to be played, from the first frame to the last.
 * Example:
   function loadAnimations() {
     myAnimation = loadAnimation(img1, img2, img3, img4);
   }
 */
 function loadAnimations() {
   sunAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, sunImage);
   moonAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, moonImage);
 }


/*
 * function preload()
 * Called automatically by p5.play. Loads all assets for your game (e.g.,
 * images, sounds) before p5 calls setup(), to ensure that the game does not
 * begin running until the assets are loaded and ready. Therefore, this function
 * is essentially a "pre-setup" function. It should only call loadImages() and
 * loadAnimations(), in that order.
 */
 function preload() {
   loadImages();
   loadAnimations();
 }

/*
 * function setup()
 * Called automatically by p5.js when the game begins, but after preload().
 * Therefore, assets are assumed to have been loaded and ready before this
 * function is called.
 */
 function setup() {
   gameScreen = createCanvas(790, 370);
   gameScreen.parent("#game-screen");
   spriteWidth = 120;
   spriteHeight = 168;
   imageArray = [backImage, sunImage, moonImage, transitionImage1, transitionImage2, transitionImage3];
   resizeImages();
   createSprites();
 }

/*
 * function draw()
 */

/*
 * function resizeImages()
 * Resizes all images in imageArray such that each image has a width of spriteWidth
 * and a height of spriteHeight.
 */
 function resizeImages() {
   for(var i = 0; i < imageArray.length; i++) {
     imageArray[i].resize(spriteWidth, spriteHeight);
   }
 }

/*
 * function createSprites()
 * Initializes each card sprite variable (e.g., sunSprite1) as a sprite object
 * through the createSprite(x, y, width, height) p5.play method. For all cards,
 * x and y parameters should be passed values 0 and 0 (cards are actually placed
 * in a separate function), while width and height correspond to spriteWidth and
 * spriteHeight.
 * Example:
 * function createSprites() {
     mySprite = createSprite(0, 0, spriteWidth, spriteHeight);
  }
 */
 function createSprites() {
   sunSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   sunSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
   moonSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   moonSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
 }

 /*
  * function addAnimations()
  * Adds an animation to each sprite in spriteArray (that is, each card).
  * The animations have already been loaded using loadAnimations(), so this
  * function is responsible for actually adding them to the sprites.
  * Additionally, this function initializes each animation's frameDelay, loop,
  * and playing properties. Finally, this function calls activateCard() with
  * each sprite, which is responsible for triggering animations to play when
  * sprites are clicked.
  */
  function addAnimations() {
    var spriteAnimations = [sunAnimation, sunAnimation, moonAnimation, moonAnimation];
    for(var i = 0; i < spriteArray.length; i++) {
      spriteArray[i].addAnimation(spriteAnimations[i]);
      spriteArray[i].animation.frameDelay = 10;
      spriteArray[i].animation.looping = false;
      spriteArray[i].animation.playing = false;
      // activateSprite(spriteArray[i]);
    }
  }

/*
 * function placeSprites()
 */
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

/*
 * function activateSprite(sprite)
 */

/*
 * function checkMatch()
 */



/*
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
var spriteWidth, spriteHeight;
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
  backImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/question.png");
  boltImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/bolt.png");
  cloudImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/cloud.png");
  sunImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/sun.png");
  moonImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/moon.png");
  smileyImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/smiley.png");
  heartImage = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/heart.png");
  transitionImage1 = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/anim1.png");
  transitionImage2 = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/anim2.png");
  transitionImage3 = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/anim3.png");
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
  flipSound = loadSound("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/sound/flip.wav");
  matchSound = loadSound("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/sound/match.wav");
  nopeSound = loadSound("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/sound/nope.wav");
  winSound = loadSound("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/sound/win.wav");
  loseSound = loadSound("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/sound/lose.wav");
  bgMusic = loadSound("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/sound/bgm.mp3");
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
  spriteWidth = 120;
  spriteHeight = 168;
  init();
  imageArray = [backImage, boltImage, cloudImage, sunImage, moonImage,
                smileyImage, heartImage, transitionImage1, transitionImage2,
                transitionImage3];
  resizeImages(imageArray);
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

function resizeImages(images) {
  for(var i = 0; i < images.length; i++) {
    images[i].resize(spriteWidth, spriteHeight);
  }
}

function createSprites() {
    boltCard1 = createSprite(0, 0, spriteWidth, spriteHeight);
    boltCard2 = createSprite(0, 0, spriteWidth, spriteHeight);
    cloudCard1 = createSprite(0, 0, spriteWidth, spriteHeight);
    cloudCard2 = createSprite(0, 0, spriteWidth, spriteHeight);
    sunCard1 = createSprite(0, 0, spriteWidth, spriteHeight);
    sunCard2 = createSprite(0, 0, spriteWidth, spriteHeight);
    moonCard1 = createSprite(0, 0, spriteWidth, spriteHeight);
    moonCard2 = createSprite(0, 0, spriteWidth, spriteHeight);
    smileyCard1 = createSprite(0, 0, spriteWidth, spriteHeight);
    smileyCard2 = createSprite(0, 0, spriteWidth, spriteHeight);
    heartCard1 = createSprite(0, 0, spriteWidth, spriteHeight);
    heartCard2 = createSprite(0, 0, spriteWidth, spriteHeight);
}

function placeCards() {
  for(var i = 0; i < cardSpriteArray.length; i++) {
    cardSpriteArray[i].position.x = cardXOffset;
    cardSpriteArray[i].position.y = cardYOffset;
    if((i + 1) % 6 === 0) {
      cardXOffset = 70;
      cardYOffset += spriteHeight + 10;
    }
    else {
      cardXOffset += spriteWidth + 10;
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
*/
