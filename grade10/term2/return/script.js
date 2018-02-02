// Write your JavaScript below!
function addTwoNums(a, b) {
  return a + b;
}

function subractTwoNums(a, b) {
  return a - b;
}

function multiplyTwoNums(a, b) {
  return a * b;
}

function divideTwoNums(a, b) {
  return a / b;
}

function goodbye(name) {
  return "Goodbye " + name + "!";
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
console.log(goodbye("Linus"));
