// Write a function that prints a random number between 0 and 4.


// firstWay() uses a whole bunch of if-else statements.
function firstWay() {
  var num = random(5);
  if(num === 0) {
    console.log("It's 0");
  } else if(num === 1) {
      console.log("It's 1");
  } else if(num === 2) {
      console.log("It's 2");
  } else if(num === 3) {
      console.log("It's 3");
  } else if(num === 4) {
      console.log("It's 4");
  } else {
      console.log("Something broke...");
  }
}

// secondWay() uses a single switch statement
function secondWay() {
  var num = random(5);
  switch (num) {
    case 0:
      console.log("It's 0");
      break;
    case 1:
      console.log("It's 1");
      break;
    case 2:
      console.log("It's 2");
      break;
    case 3:
      console.log("It's 3");
      break;
    case 4:
      console.log("It's 4");
      break;
    default:
      console.log("Something broke");
  }
}

firstWay();
secondWay();
