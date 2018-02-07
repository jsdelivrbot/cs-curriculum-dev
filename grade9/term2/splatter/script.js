// declare global variables
var canvas;
var button;
var slider;
var canvasWidth = 500;
var canvasHeight = 400;
var spread;

/*
 * setup()
 */
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(65, 60, 88);
  canvas.parent("#canvas-area");
  canvas.mousePressed(drawSplatter);
  button = select("#clear-button");
  button.mousePressed(setup);
  slider = select("#slider");
  slider.input(updateSpread);
  updateSpread();
}

/*
 * drawEllipse()
 */
 function drawEllipse() {
   fill("#ff0000");
   ellipse(mouseX, mouseY, 100, 100);
 }

/*
 * updateSpread()
 * This function simply sets the spread variable to the value of the slider.
 * For example, if the slider is at 75, the spread will be set to 75 as well.
 */
function updateSpread() {
  spread = slider.value();
}

/*
 * drawSplatter()
 * Creates ellipses on the canvas around where the mouse is clicked.
 * Details:
 * -The function creates between 10 and 14 ellipses (random).
 * -Each ellipse will be a random color and have no outline.
 * -Each ellipse will have a random radius (5 to 14 pixels).
 * -Each ellipse's x and y values are calculated like this:
 *  x = random value between mouseX - spread and mouseX + spread
 *  y = random value between mouseY - spread and mouseY + spread
 */
function drawSplatter(){
  fill(random(100, 255), random(100, 255), random(100, 255));
  noStroke();
  var randomNum = random(10, 15);
  for(var i = 0; i < randomNum; i++) {
   	var randomSize = random(5, 15);
   	ellipse(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread), randomSize, randomSize);
  }
}
