var card;

function preload() {

}

function setup() {
  //createCanvas(800,300);
  createCanvas(800, 300);
  card = createSprite(width / 2, height / 2, 171, 158);
  card.addAnimation("flipping", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0000.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0001.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0002.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0003.png", "https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/card/card0004.png");
  card.animation.frameDelay = 10;
  card.animation.looping = false;
  card.animation.playing = false;
  card.animation.mouseActive = true;
  card.onMousePressed = function() {
    this.animation.playing = true;
    if(this.animation.getFrame() === this.animation.getLastFrame()) {
      this.animation.goToFrame(0);
    }
    else if(this.animation.getFrame() === 0) {
      this.animation.goToFrame(this.animation.getLastFrame());
    }
  };
}

function draw() {
  background(255,255,255);
  drawSprites();
}
