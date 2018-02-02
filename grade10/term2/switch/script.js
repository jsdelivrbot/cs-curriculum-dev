/*
 * Write a function that prompts the user to enter a digit between 0 and 4.
 * The function should create an alert containing that number in word form.
 * For example, if the user enters 0, the function alerts "zero".
 * If the user doesn't enter a digit between 0 and 4, tell them they have
 * disobeyed your command!
 */

function firstWay() {
  var num = prompt("Please enter a digit between 0 and 4!");
  if(num == 0) {
    alert("zero");
  } else if(num == 1) {
      alert("one");
  } else if(num == 2) {
      alert("two");
  } else if(num == 3) {
      alert("three");
  } else if(num == 4) {
      alert("four");
  } else {
      alert("You have disobeyed my command!");
  }
}

firstWay();

function secondWay() {
  var num = prompt("Please enter a digit between 0 and 4!");
  switch (Number(num)) {
    case 0:
      alert("zero");
      break;
    case 1:
      alert("one");
      break;
    case 2:
      alert("two");
      break;
    case 3:
      alert("three");
      break;
    case 4:
      alert("four");
      break;
    default:
      alert("You have disobeyed my command!");
  }
}

secondWay();
