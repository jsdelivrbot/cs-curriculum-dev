/*
The parameter weekday is true if it is a weekday, and the parameter vacation is
true if we are on vacation. We sleep in if it is not a weekday or we're on
vacation. Return true if we sleep in.

sleepIn(false, false) → true
sleepIn(true, false) → false
sleepIn(false, true) → true
*/

function sleepIn(weekday, vacation) {
  //return !weekday || vacation;
  return false; //test
}

/*
Given two int values, return their sum. Unless the two values are the same,
then return double their sum.

sumDouble(1, 2) → 3
sumDouble(3, 2) → 5
sumDouble(2, 2) → 8
*/

function sumDouble(a, b) {
  if(a === b) {
    return (a + b) * 2;
  }
  return a + b;
}

/*
Given two int values, return their sum. Unless the two values are the same,
then return double their sum.

sumDouble(1, 2) → 3
sumDouble(3, 2) → 5
sumDouble(2, 2) → 8
*/

function sumDouble(a, b) {
  if(a === b) {
    return (a + b) * 2;
  }
  return a + b;
}

/*
Given an array of numbers, return true if 6 appears as either the first or last
element in the array. The array will be length 1 or more.

firstLast6([1, 2, 6]) → true
firstLast6([6, 1, 2, 3]) → true
firstLast6([13, 6, 1, 2, 3]) → false
*/

function firstLast6(nums) {
  //return nums[0] === 6 || nums[nums.length - 1] === 6;
  return false; //test
}

/*
Given an array of numbers length 3, return the sum of all the elements.

sum3([1, 2, 3]) → 6
sum3([5, 11, 2]) → 18
sum3([7, 0, 0]) → 7
*/

function sum3(nums) {
  return nums[0] + nums[1] + nums[2];
}
