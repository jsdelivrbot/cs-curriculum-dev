var cards, cardBacks, question, bolt, cloud, sun, moon, smiley, heart, anim1, anim2, anim3;

function preload() {
  question = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/question.png");
  bolt = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/bolt.png");
  cloud = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/cloud.png");
  sun = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/sun.png");
  moon = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/moon.png");
  smiley = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/smiley.png");
  heart = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/heart.png");
  anim1 = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/anim1.png");
  anim2 = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/anim2.png");
  anim3 = loadImage("https://codenextcoaches.github.io/cs-curriculum-dev/grade9/term3/match/assets/img/anim3.png");
}

function setup() {
  createCanvas(598, 360);
  var xOffset = 75;
  var yOffset = 100;
  cards = [];
  cardBacks = [];
  cardBacks.push(bolt, bolt, cloud, cloud, sun, sun, moon, moon, smiley, smiley, heart, heart);
  for(var i = 0; i < 12; i++) {
    var card = createSprite(xOffset, yOffset, 240, 336);
    var randBackIndex = int(random(cardBacks.length));
    card.addAnimation("flipping", question, anim1, anim2, anim3, cardBacks[randBackIndex]);
    cards.push(card);
    cardBacks.splice(randBackIndex, 1);
    console.log(cardBacks.length + " " + cards.length);
    if(cards.length % 3 === 0) {
      yOffset += card.height + 5;
      xOffset = 75;
    }
    else {
      xOffset += card.width + 5;
    }
  }
  for(var i = 0; i < cards.length; i++) {
    cards[i].animation.frameDelay = 10;
    cards[i].animation.looping = false;
    cards[i].animation.playing = false;
    cards[i].animation.mouseActive = true;
    cards[i].onMousePressed = function() {
      this.animation.playing = true;
      if(this.animation.getFrame() === this.animation.getLastFrame()) {
        this.animation.goToFrame(0);
      }
      else if(this.animation.getFrame() === 0) {
        this.animation.goToFrame(this.animation.getLastFrame());
      }
    };
  }
}

function draw() {
  background(20, 40, 60);
  drawSprites();
}
