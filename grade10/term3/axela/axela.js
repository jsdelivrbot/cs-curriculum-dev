(function () {

  var input = document.getElementById("axela-input"),
      submit = document.getElementById("axela-submit"),
      message = document.getElementById("axela-message"),
      advancedDiv = document.getElementById("advanced"),
      errorText = "I don't understand you.",
      dunnoText = "I wasn't programmed to know that.",
      picture = null,
      greetings = ["hi", "sup", "hello", "hola", "wasup"];

  input.addEventListener("keypress", checkKey);
  submit.addEventListener("click", processInput);

  function checkKey(event) {
    var keyCode = event.which || event.keyCode;
    if(keyCode == "13") {
      processInput();
    }
  }

  function processInput() {
    if(advancedDiv.contains(picture)) {
      advancedDiv.removeChild(picture);
    }
    var words = input.value.toLowerCase().trim().split(" ");
    input.value = "";
    if(words.length === 1){
        if(greetings.indexOf(words[0]) !== -1){
          message.innerHTML = "Greetings!";
        }
        else {
          message.innerHTML = errorText;
        }
    }
    else if(words.length === 2) {
      switch(words[0]) {
        case "who":
          who(words[1]);
          break;
        case "what":
          what(words[1]);
          break;
        case "where":
          where(words[1]);
          break;
        case "tell":
          tell(words[1]);
          break;
        case "show":
          show(words[1]);
          break;
        default:
          message.innerHTML = errorText;
      }
    }
    else{
      message.innerHTML = errorText;
    }
  }

  function who(word) {
    switch(word){
      case "you":
        message.innerHTML = "I am Axela, of course.";
        break;
      case "president":
        message.innerHTML = "Unfortunately, it is <a href=\"https://en.wikipedia.org/wiki/Donald_Trump\">this creature</a>.";
        break;
      case "me":
        message.innerHTML = "You are you. Or are you... someone else?";
        break;
      default:
        message.innerHTML = dunnoText;
    }
  }

  function what(word) {
    switch(word){
      case "life":
        message.innerHTML = "Life can be explained with one number: 42.";
        break;
      case "pi":
        message.innerHTML = "Pi is approximately " + Math.PI;
        break;
      case "love":
        message.innerHTML = "Baby don't hurt me.";
        break;
      default:
        message.innerHTML = dunnoText;
    }
  }

  function where(word) {
    switch(word){
      case "me":
        message.innerHTML = "I actually know exactly where you are, but I shouldn't.";
        break;
      case "atlantis":
        message.innerHTML = "Atlantis is beneath the Atlantic Ocean. It's where the fish people live.";
        break;
      case "food":
        message.innerHTML = "I would cook for you but I don't have hands.";
        break;
      default:
        message.innerHTML = dunnoText;
    }
  }

  function tell(word) {
    switch(word){
      case "joke":
        message.innerHTML = "A man walks into a bar. <br>\"Ouch!\" he says.";
        break;
      case "poem":
        message.innerHTML = "<i>To see a World in a Grain of Sand<br>" +
                            "And a Heaven in a Wild Flower<br>" +
                            "Hold Infinity in the palm of your hand<br>" +
                            "And Eternity in an hour</i>";
        break;
      case "quote":
        message.innerHTML = "\"Man who runs in front of car gets tired.\" -Confucius";
        break;
      default:
        message.innerHTML = dunnoText;
    }
  }

  function show(word) {
    switch(word){
      case "dog":
        message.innerHTML = "Here is dog.";
        picture = document.createElement("img");
        picture.src = "img/dog.png";
        picture.style.display = "block";
        picture.style.margin = "0 auto 10px";
        advancedDiv.insertBefore(picture, input);
        break;
      default:
        message.innerHTML = dunnoText;
    }
  }

})();
