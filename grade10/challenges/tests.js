(function() {

  var testResults = document.getElementById("test-results");
  runTests();

  function runTests() {
    testSleepIn();
    testSumDouble();
  }

  function testSleepIn() {
    var tests = [
      {
        one:false,
        two:false,
        expected:true
      },
      {
        one:true,
        two:false,
        expected:false
      },
      {
        one:false,
        two:true,
        expected:true
      },
      {
        one:true,
        two:true,
        expected:true
      }
    ];
    var problemName = document.createElement("h2");
    problemName.innerHTML = "sleepIn()";
    testResults.appendChild(problemName);
    for(var i = 0; i < tests.length; i++) {
      var run = sleepIn(tests[i].one, tests[i].two); //edit this line
      displayResult("sleepIn", [tests[i].one, tests[i].two], run, tests[i].expected, i);
    }
  }

  function testSumDouble() {
    var tests = [
      {
        one:1,
        two:2,
        expected:3
      },
      {
        one:3,
        two:2,
        expected:5
      },
      {
        one:2,
        two:2,
        expected:8
      },
      {
        one:-1,
        two:0,
        expected:-1
      },
      {
        one:3,
        two:3,
        expected:12
      },
      {
        one:0,
        two:0,
        expected:0
      },
      {
        one:0,
        two:1,
        expected:1
      },
      {
        one:3,
        two:4,
        expected:7
      }
    ];
    var problemName = document.createElement("h2");
    problemName.innerHTML = "sumDouble()";
    testResults.appendChild(problemName);
    for(var i = 0; i < tests.length; i++) {
      var run = sumDouble(tests[i].one, tests[i].two); //edit this line
      displayResult("sumDouble", [tests[i].one, tests[i].two], run, tests[i].expected, i);
    }
  }

  function displayResult(functionName, inputs, run, expected, testNumber) {
    var status = run === expected;
    if(status) {
      run = "<span id=\"correct\">" + run + "</span>";
    }
    else {
      run = "<span id=\"incorrect\">" + run + "</span>";
    }
    var test = "<b>Test " + (testNumber + 1) + ":</b> " + functionName + "(";
    for(var i = 0; i < inputs.length; i++) {
      test += inputs[i];
      if(i < inputs.length - 1) {
        test += ", ";
      }
    }
    test += ") -> " + run + " (Expected: <b>" + expected + "</b>)";
    var display = document.createElement("p");
    display.innerHTML = test;
    testResults.appendChild(display);
  }
})();
