// UI Variables
var canvas;
var gameScreen;
var gameOverScreen;
var shipSelectScreen;
var corvetteButton;
var destroyerButton;
var dreadnoughtButton;
var playAgainButton;
var scoreDisplays;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipName;
var shipColor;
var shipX;
var shipY;
var shipDiameter;
var shipSpeed;

// Bullet Variables
var bulletX;
var bulletY;
var bulletDiameter;

// Alien Variables
var alienX;
var alienY;
var alienDiameter;
var alienVelocity;

// Alien Bullet Variables
var alienBulletX;
var alienBulletY;
var alienBulletDiameter;


/*
 * setup()
 * This function is called once. Sets up the canvas, access HTML elements with
 * select(), and adds event listeners to those elements. Sets initial values of
 * non-resettable "permanent" variables (like alienDiameter) and calls
 * resetGame() to setup "resettable" variables (like alienX and alienY).
 */


/*
 * gameOver()
 * This function stops the game from running, hides the game screen, and shows
 * the game over screen.
 */


/*
 * resetGame()
 * This function "resets the game". Hides the game over screen, calls
 * resetVariables() and updateScoreDisplays(), and shows the ship selection
 * screen.
 */


/*
 * resetVariables()
 * This function sets most non-ship variables to their original values.
 * These include all alien variables, the score, and the two "shooting"
 * variables.
 */


/*
 * updateScoreDisplays()
 * This function simply updates all of the HTML elements that display the score.
 */


/*
 * draw()
 * This function animates the ship, alien, and both kinds of bullets.
 */


/*
 * drawShip()
 * This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */


/*
 * keyPressed()
 * This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */


/*
 * drawBullet()
 * This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */


/*
 * drawAlien()
 * This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, it triggers a game over, then resets the game.
 */


/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */


/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */


/*
 * checkCollision()
 * This function calculates the distance between two circles. If the circles
 * are touching, the function returns "true", meaning there is a collision.
 * Otherwise, if the circles are not touching, the function returns false.
 * Circles are considered touching if:
 * (distance <= (circleOneDiameter + circleTwoDiameter) / 2)
 */
