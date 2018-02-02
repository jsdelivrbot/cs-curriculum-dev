// Write a function called "powerOfZero(num)" that takes a number and
// returns the zero power of that number (i.e., 1)
function powerOfZero(num) {
  return 1;
}

// Write a function called "powerOfOne(num)" that takes a number and
// returns the first power of that number. You MUST use powerOfZero(num)
// as part of the calculation!
function powerOfOne(num) {
  return powerOfZero(num) * num;
}

// Write a function called "powerOfTwo(num)" that takes a number and
// returns the second power of that number. You MUST use powerOfOne(num)
// as part of the calculation!
function powerOfTwo(num) {
  return powerOfOne(num) * num;
}

// Write a function called "powerOfThree(num)" that takes a number and returns
// the third power of that number. You MUST use powerOfTwo(num) as part of the
// calculation!
function powerOfThree(num) {
  return powerOfTwo(num) * num;
}

// Write a function called "powerOfFour(num)" that takes a number and returns
// the fourth power of that number. You MUST use powerOfThree(num) as part of
// the calculation!
function powerOfFour(num) {
  return powerOfThree(num) * num;
}

// Write a function called "calculate" that prompts the user for a number and
// alerts all powers of that number from 0 to 4. Use the functions above!
function calculate() {
  var num = Number(prompt("Please enter a number."));
  alert(num + " to the power of 0 is " + powerOfZero(num));
  alert(num + " to the power of 1 is " + powerOfOne(num));
  alert(num + " to the power of 2 is " + powerOfTwo(num));
  alert(num + " to the power of 3 is " + powerOfThree(num));
  alert(num + " to the power of 4 is " + powerOfFour(num));
}

// Call calculate() below and test in your browser.
calculate();
