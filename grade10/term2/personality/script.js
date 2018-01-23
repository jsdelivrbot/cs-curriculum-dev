(function () {

  var pageTitle = document.getElementById("page-title"),
      pageTitleText = pageTitle.innerHTML,
      tryAgain = document.getElementById("try-again"),
      quiz = document.getElementById("quiz"),
      result = document.getElementById("result"),
      topping = null,
      weapon = null,
      color = null,
      submitButton = document.getElementById("form-submit");
  submitButton.addEventListener("click", processResults);
  tryAgain.addEventListener("click", resetQuiz);

  function processResults() {
    topping = document.querySelector('input[name="toppings"]:checked');
    weapon = document.querySelector('input[name="weapons"]:checked');
    color = document.querySelector('input[name="colors"]:checked');
    if(topping === null || weapon === null || color === null){
      alert("Please answer every question!");
    }
    else {
      var personality = getPersonality();
      quiz.style.display = "none";
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
    if(score === 4 || score == 5) {
      return 0; // Leonardo
    }
    else if(score === 2 || score === 3) {
      return 1; // Donatello
    }
    else if (score === 1 || score === 2) {
      return 2; // Raphael
    }
    else {
      return 3; //Michelangelo
    }
  }

  function resetQuiz() {
    pageTitle.innerHTML = pageTitleText;
    quiz.style.display = "grid";
    result.style.display = "none";
    tryAgain.style.display = "none";
    quiz.reset();
  }

})();
