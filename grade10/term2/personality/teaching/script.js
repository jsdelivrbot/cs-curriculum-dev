var topping = null;
var weapon = null;
var color = null;
var pageTitle = document.getElementById("page-title");
var pageTitleText = pageTitle.innerHTML;
var tryAgain = document.getElementById("try-again");
var quizWrapper = document.getElementById("quiz-wrapper");
var result = document.getElementById("result");
var formSubmit = document.getElementById("form-submit");
tryAgain.addEventListener("click", resetQuiz);
formSubmit.addEventListener("click", processResults);

function processResults() {
  topping = document.querySelector('input[name="toppings"]:checked');
  weapon = document.querySelector('input[name="weapons"]:checked');
  color = document.querySelector('input[name="colors"]:checked');
  if(topping === null || weapon === null || color === null){
    alert("Please answer every question!");
  }
  else {
    var personality = getPersonality();
    quizWrapper.style.display = "none";
    formSubmit.style.display = "none";
    result.style.display = "block";
    tryAgain.style.display = "block";
    if(personality === 0){
      pageTitle.innerHTML = "You are Leonardo!";
      result.style.backgroundImage = "url('img/leo.png')";
    }
    else if(personality === 1) {
      pageTitle.innerHTML = "You are Donatello!";
      result.style.backgroundImage = "url('img/don.png')";
    }
    else if(personality === 2) {
      pageTitle.innerHTML = "You are Raphael!";
      result.style.backgroundImage = "url('img/raph.png')";
    }
    else {
      pageTitle.innerHTML = "You are Michelangelo!";
      result.style.backgroundImage = "url('img/mike.png')";
    }
  }
}

function getPersonality() {
  var score = 0;
  if(topping.id === "pepperoni") {
    score += 1;
  }
  else if(topping.id === "green-peppers") {
    score += 2;
  }
  if(weapon.id === "bo-staff" || weapon.id === "sai-daggers") {
    score += 1;
  }
  else if(weapon.id === "nunchucks") {
    score += 2;
  }
  if(color.id === "blue") {
    score += 2;
  }
  else if(color.id === "purple") {
    score += 1;
  }
  else if(color.id === "orange") {
    score += 3;
  }
  if(score === 6 || score === 7) {
    return 0;
  }
  else if(score === 4 || score === 5) {
    return 1;
  }
  else if(score === 2 || score === 3) {
    return 2;
  }
  else {
    return 3;
  }
}

function resetQuiz() {
  pageTitle.innerHTML = pageTitleText;
  quizWrapper.style.display = "flex";
  result.style.display = "none";
  tryAgain.style.display = "none";
  formSubmit.style.display = "block";
  topping.checked = false;
  weapon.checked = false;
  color.checked = false;
  topping = null;
  weapon = null;
  color = null;
}
