var database = [];
var display = document.getElementById("display");
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var searchHelp = document.getElementById("search-help");

searchBar.addEventListener("keyup", checkKey);
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

function checkKey(event) {
  var keyCode = event.which || event.keyCode;
  if(keyCode == "13") {
    processInput();
  }
  else {
    getHelpText();
  }
}

function getHelpText() {
  var parsedInput = searchBar.value.toLowerCase().trim();
  searchHelp.innerHTML = "";
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
      var tempEntry = database[i];
      button.addEventListener("click", function() {
        showEntry(tempEntry);
        searchHelp.innerHTML = "";
        searchHelp.style.display = "none";
        searchBar.value = "";
      });
      searchHelp.appendChild(button);
    }
  }
  if(searchHelp.hasChildNodes()) {
    searchHelp.style.display = "block";
  }
  else {
    searchHelp.style.display = "none";
  }
}

function getDatabaseEntry(parsedInput) {
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
  var parsedInput = searchBar.value.toLowerCase().trim();
  searchHelp.innerHTML = "";
  searchHelp.style.display = "none";
  display.innerHTML = "";
  searchBar.value = "";
  var databaseEntry = getDatabaseEntry(parsedInput);
  if(databaseEntry != null) {
    showEntry(databaseEntry);
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
      var tempEntry = suggestions[i];
      button.addEventListener("click", function() {
        showEntry(tempEntry);
      });
      display.appendChild(button);
    }
  }
  else {
    paragraph.innerHTML = "No results!";
    display.appendChild(paragraph);
  }
}

function showEntry(databaseEntry) {
  display.innerHTML = "";
  var entryName = document.createElement("h2");
  entryName.innerHTML = databaseEntry.name;
  var entryPicture = document.createElement("img");
  entryPicture.src = databaseEntry.picture;
  var entryBorn = document.createElement("p");
  entryBorn.innerHTML = "<b>Born:</b> " + databaseEntry.born;
  var entryDied = document.createElement("p");
  if(databaseEntry.died != null) {
    entryDied.innerHTML = "<b>Died:</b> " + databaseEntry.died;
  }
  else {
    entryDied.innerHTML = "<b>Died:</b> N/A";
  }
  var entryBio = document.createElement("p");
  entryBio.innerHTML = databaseEntry.bio;
  display.appendChild(entryName);
  display.appendChild(entryPicture);
  display.appendChild(entryBorn);
  display.appendChild(entryDied);
  display.appendChild(entryBio);
}
