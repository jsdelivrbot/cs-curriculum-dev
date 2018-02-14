var card;

function preload() {
  card = loadAnimation("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0000.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0001.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0002.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0003.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0004.png");
}

function setup() {
  createCanvas(800,300);
  card.frameDelay = 10;
  card.looping = false;
  card.playing = false;
}

function draw() {
  background(255,255,255);
  animation(card, 300, 150);
}

function mousePressed() {
  card.playing = true;
  if(card.getFrame() === card.getLastFrame()) {
    card.goToFrame(0);
  }
  else if(card.getFrame() === 0) {
    card.goToFrame(card.getLastFrame());
  }
}
