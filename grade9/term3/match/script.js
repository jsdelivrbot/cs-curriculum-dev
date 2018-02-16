var cards, cardBacks, question, bolt, cloud, sun, moon, smiley, heart, anim1, anim2, anim3;
var cardWidth, cardHeight;
var attempts, currentCard;
var cardsActive, matchedCards;
var triesDisplay, attemptsDisplay, resetButton;

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
  matchedCards = [];
  cardsActive = true;
  attempts = 7;
  cardWidth = 120;
  cardHeight = 168;
  createCanvas(790, 370);
  attemptsDisplay = select("#attempts-display");
  triesDisplay = select("#tries");
  resetButton = select("#reset");
  attemptsDisplay.html(attempts);
  resetButton.mousePressed(function () {
    window.location.reload();
  });
  resetButton.hide();
  images = [];
  images.push(question, bolt, cloud, sun, moon, smiley, heart, anim1, anim2, anim3);
  for(var i = 0; i < images.length; i++) {
    images[i].resize(cardWidth, cardHeight);
  }
  cards = [];
  cardBacks = [];
  cardBacks.push(bolt, bolt, cloud, cloud, sun, sun, moon, moon, smiley, smiley, heart, heart);
  var xOffset = 70;
  var yOffset = 95;
  for(var i = 0; i < 12; i++) {
    var card = createSprite(xOffset, yOffset, cardWidth, cardHeight);
    var randBackIndex = int(random(cardBacks.length));
    card.addAnimation("flipping", question, anim1, anim2, anim3, cardBacks[randBackIndex]);
    cards.push(card);
    cardBacks.splice(randBackIndex, 1);
    if(cards.length % 6 === 0) {
      yOffset += card.height + 10;
      xOffset = 70;
    }
    else {
      xOffset += card.width + 10;
    }
  }
  for(var i = 0; i < cards.length; i++) {
    cards[i].animation.frameDelay = 10;
    cards[i].animation.looping = false;
    cards[i].animation.playing = false;
    cards[i].onMousePressed = function() {
      if(cardsActive && attempts > 0) {
        //console.log("Index " + matchedCards.indexOf(this));
        if(matchedCards.indexOf(this) === -1) {
          if(currentCard === undefined) {
            this.animation.playing = true;
            this.animation.goToFrame(this.animation.getLastFrame());
            currentCard = this;
          }
          else if(currentCard != this) {
            var currentCardLastImage = currentCard.animation.getImageAt(currentCard.animation.getLastFrame());
            var thisCardLastImage = this.animation.getImageAt(this.animation.getLastFrame());
            //console.log("currentLastCardImage: " + currentCardLastImage);
            //console.log("thisLastCardImage: " + thisCardLastImage);
            this.animation.playing = true;
            this.animation.goToFrame(this.animation.getLastFrame());
            if(currentCardLastImage == thisCardLastImage) {
              //console.log("Match!");
              //alert("Match!");
              matchedCards.push(this);
              matchedCards.push(currentCard);
              currentCard = undefined;
              if(matchedCards.length === cards.length) {
                triesDisplay.html("YOU WIN!!!");
                cardsActive = false;
                resetButton.show();
              }
            }
            else {
              //console.log("Nope!");
              attempts--;
              attemptsDisplay.html(attempts);
              if(attempts === 0) {
                cardsActive = false;
                setTimeout(function() {
                  triesDisplay.html("YOU LOSE!!!");
                  flipAllCards();
                  resetButton.show();
                }, 2000);
              }
              else {
                var self = this;
                var storedCard = currentCard;
                cardsActive = false;
                console.log("cards active: " + cardsActive);
                setTimeout(function() {
                  self.animation.goToFrame(0);
                  storedCard.animation.goToFrame(0);
                  currentCard = undefined;
                  cardsActive = true;
                  console.log("cards active: " + cardsActive);
                }, 2000);
              }
            }
          }
        }
        else {
          console.log("Already matched!");
        }
      }
      else{
        console.log("Cards inactive! Attempts: " + attempts);
      }
    };
  }
}

function flipAllCards() {
  for(var i = 0; i < cards.length; i++) {
    cards[i].animation.playing = true;
    cards[i].animation.goToFrame(cards[i].animation.getLastFrame());
  }
}

function draw() {
  background(20, 40, 60);
  drawSprites();
}
