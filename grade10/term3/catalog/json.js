var database = [];
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var suggestions = document.getElementById("suggestions");
var display = document.getElementById("display");

searchBar.addEventListener("input", createSuggestions);
searchBar.addEventListener("keypress", checkEnter);
searchButton.addEventListener("click", processInput);

loadData();

function loadData() {
  searchBar.style.display = "none";
  searchButton.style.display = "none";
  fetch("database.json")
  .then(function(response) {
    response.json()
    .then(function(jsonObj) {
      database = jsonObj.data;
      console.log("Database Loaded Successfully");
    }).then(function() {
      searchBar.style.display = "block";
      searchButton.style.display = "block";
    })
  });
}

function checkEnter(event) {
  var key = event.which || event.keyCode;
  if(key == 13) {
    processInput();
  }
}

function createSuggestions() {
  var parsedInput = searchBar.value.toLowerCase().trim();
  suggestions.innerHTML = "";
  for(var i = 0; i < database.length; i++) {
    var parsedName = database[i].name.toLowerCase().trim();
    if(parsedName.startsWith(parsedInput) && parsedInput.length > 0) {
      var matching = database[i].name.substring(0, searchBar.value.length);
      var remaining = database[i].name.substring(searchBar.value.length);
      var result = matching + "<b>" + remaining + "</b><br>";
      var button = document.createElement("button");
      button.innerHTML = result;
      button.style.display = "block";
      button.className = "suggestion";
      var tempRecord = database[i];
      button.addEventListener("click", function() {
        showRecord(tempRecord);
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        searchBar.value = "";
      });
      suggestions.appendChild(button);
    }
  }
  if(suggestions.hasChildNodes()) {
    suggestions.style.display = "block";
  }
  else {
    suggestions.style.display = "none";
  }
}

function getRecord(parsedInput) {
  for(var i = 0; i < database.length; i++) {
    var parsedName = database[i].name.toLowerCase().trim();
    if(parsedName == parsedInput) {
      return database[i];
    }
  }
  return null;
}

function getSuggestions(parsedInput) {
  var suggestions = [];
  for(var i = 0; i < database.length; i++) {
    var parsedName = database[i].name.toLowerCase().trim();
    if(parsedName.startsWith(parsedInput) && parsedInput.length > 0) {
      suggestions.push(database[i]);
    }
  }
  return suggestions;
}

function processInput() {
  console.log("processing input");
  var parsedInput = searchBar.value.toLowerCase().trim();
  suggestions.innerHTML = "";
  suggestions.style.display = "none";
  display.innerHTML = "";
  searchBar.value = "";
  var databaseRecord = getRecord(parsedInput);
  if(databaseRecord != null) {
    showRecord(databaseRecord);
  }
  else {
    showSuggestions(getSuggestions(parsedInput));
  }
}

function showSuggestions(suggestions) {
  var paragraph = document.createElement("p");
  if(suggestions.length > 0) {
    paragraph.innerHTML = "Did you mean:";
    display.appendChild(paragraph);
    for(var i = 0; i < suggestions.length; i++) {
      var button = document.createElement("button");
      button.innerHTML = suggestions[i].name;
      button.style.display = "block";
      button.className = "suggestion";
      var tempRecord = suggestions[i];
      button.addEventListener("click", function() {
        showRecord(tempRecord);
      });
      display.appendChild(button);
    }
  }
  else {
    paragraph.innerHTML = "No results!";
    display.appendChild(paragraph);
  }
}

function showRecord(databaseRecord) {
  display.innerHTML = "";
  var recordName = document.createElement("h2");
  recordName.innerHTML = databaseRecord.name;
  var recordPicture = document.createElement("img");
  recordPicture.src = databaseRecord.picture;
  var recordBorn = document.createElement("p");
  recordBorn.innerHTML = "<b>Born:</b> " + databaseRecord.born;
  var recordDied = document.createElement("p");
  if(databaseRecord.died != null) {
    recordDied.innerHTML = "<b>Died:</b> " + databaseRecord.died;
  }
  else {
    recordDied.innerHTML = "<b>Died:</b> N/A";
  }
  var recordBio = document.createElement("p");
  recordBio.innerHTML = databaseRecord.bio;
  display.appendChild(recordName);
  display.appendChild(recordPicture);
  display.appendChild(recordBorn);
  display.appendChild(recordDied);
  display.appendChild(recordBio);
}
