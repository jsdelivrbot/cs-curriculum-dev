// Altering text
var changeMe = document.getElementById("change-me");
console.log(changeMe.innerHTML);
changeMe.innerHTML = "totally";

// Creating a new element.
var paragraph = document.createElement("p");
paragraph.innerHTML = "It's the best.";
var myDiv = document.getElementById("my-div");
myDiv.appendChild(paragraph);
var firstParagraph = document.querySelector("p");
var heading = document.createElement("h2");
heading.innerHTML = "Ladies and Gentlemen!";
myDiv.insertBefore(heading, firstParagraph);

// Removing an element
myDiv.removeChild(paragraph);

// Replacing an element
var span = document.createElement("span");
span.innerHTML = "magnificent";
span.setAttribute("id", "my-span");
span.style.fontSize = "1.5em";
var strong = document.querySelector("strong");
firstParagraph.replaceChild(span, strong);

// Creating Events - Buttons
var button = document.createElement("button");
button.innerHTML = "Click me!";
myDiv.appendChild(button);
button.addEventListener("click", buttonEvent);

// Creating Events - altering style
var button2 = document.createElement("button");
button2.innerHTML = "Hide!";
button2.addEventListener("click", buttonEvent2);
myDiv.appendChild(button2);

span.style.color = "black";
var button3 = document.createElement("button");
button3.innerHTML = "Change to red!";
button3.addEventListener("click", buttonEvent3);
myDiv.appendChild(button3);

// Button functions
function buttonEvent() {
  alert("You clicked me!");
}

function buttonEvent2() {
  var headingDisplay = heading.style.display;
  if(headingDisplay != "none") {
    heading.style.display = "none";
    button2.innerHTML = "Show!";
  }
  else {
    heading.style.display = "block";
    button2.innerHTML = "Hide!";
  }
}

function buttonEvent3() {
  var spanColor = span.style.color;
  if(spanColor == "black") {
    span.style.color = "red";
    button3.innerHTML = "Change to black!";
  }
  else {
    span.style.color = "black";
    button3.innerHTML = "Change to red!";
  }
}
