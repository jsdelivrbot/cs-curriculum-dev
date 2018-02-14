var card;

function preload() {
  card = loadAnimation("assets/card/1.png", "assets/card/2.png", "assets/card/3.png", "assets/card/4.png");
}

function setup() {
  createCanvas(800,300);
}

function draw() {
  background(255,255,255);
  animation(card, 300, 150);
}
