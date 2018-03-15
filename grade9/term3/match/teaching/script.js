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
var spritesActive;
var lives, matches;
var spriteOne, spriteTwo;

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
   spriteX = 70;
   spriteY = 95;
   imageArray = [backImage, sunImage, moonImage, transitionImage1, transitionImage2, transitionImage3];
   resizeImages();
   createSprites();
   spriteArray = [sunSprite1, sunSprite2, moonSprite1, moonSprite2];
   addAnimations();
   shuffle(spriteArray, true);
   placeSprites();
   spritesActive = true;
 }

/*
 * function draw()
 */
 function draw() {
   background(20, 40, 60);
   drawSprites();
 }

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
    var animations = [sunAnimation, sunAnimation, moonAnimation, moonAnimation];
    for(var i = 0; i < spriteArray.length; i++) {
      spriteArray[i].addAnimation("flip", animations[i]);
      spriteArray[i].animation.frameDelay = 10;
      spriteArray[i].animation.looping = false;
      spriteArray[i].animation.playing = false;
      // activateSprite(spriteArray[i]);
    }
  }

/*
 * function placeSprites()
 * Place all sprites in spriteArray on the game screen, according to any
 * pattern you like.
 */
 function placeSprites() {
   for(var i = 0; i < spriteArray.length; i++) {
     spriteArray[i].position.x = spriteX;
     spriteArray[i].position.y = spriteY;
     if((i + 1) % 2 === 0) {
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
