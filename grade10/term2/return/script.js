// Write your JavaScript below!
function addTwoNums(a, b) {
  return a + b;
}

function subtractTwoNums(a, b) {
  return a - b;
}

function multiplyTwoNums(a, b) {
  return a * b;
}

function divideTwoNums(a, b) {
  return a / b;
}

function goodbye(str) {
  return "Goodbye " + str + "!";
}

function isEven(num) {
  if(num % 2 === 0) {
    return true;
  }
  else {
    return false;
  }
}

var z = addTwoNums(10, 2);
console.log(z); // 12
z = subtractTwoNums(z, 2);
console.log(z); // 10
z = multiplyTwoNums(z, z);
console.log(z); // 100
z = divideTwoNums(z, 50);
console.log(z); // 2
z = addTwoNums(addTwoNums(1, 1), z);
console.log(z); // 4
z = multiplyTwoNums(addTwoNums(100, z), subtractTwoNums(4, z));
console.log(z); // 0
console.log("10 is an even number: " + isEven(10));
console.log("11 is an even number: " + isEven(11));
console.log(goodbye("Code Next"));
