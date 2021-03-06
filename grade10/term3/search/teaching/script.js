var database = [
  {
    name:"Martin Luther King Jr.",
    born:"January 15, 1929",
    died:"April 4, 1968",
    picture:"img/martin_luther_king_jr.png",
    bio:"<b>Martin Luther King Jr.</b> was an American Baptist minister and activist who became the most visible spokesperson and leader in the civil rights movement from 1954 through 1968. He is best known for his role in the advancement of civil rights using the tactics of nonviolence and civil disobedience based on his Christian beliefs and inspired by the nonviolent activism of Mahatma Gandhi."
  },
  {
    name:"Dolores Huerta",
    born:"April 10, 1930",
    died:null,
    picture:"img/dolores_huerta.png",
    bio:"<b>Dolores Clara Fernández Huerta</b> is an American labor leader and civil rights activist who was the co-founder of the National Farmworkers Association, which later became the United Farm Workers (UFW). Huerta helped organize the Delano grape strike in 1965 in California and was the lead negotiator in the workers’ contract that was created after the strike."
  },
  {
    name:"Fred Ho (musician)",
    born:"August 10, 1957",
    died:"April 12, 2014",
    picture:"img/fred_ho.png",
    bio:"<b>Fred Ho</b> (Chinese: 侯维翰; pinyin: Hóu Wéihàn; born Fred Wei-han Houn) was an American jazz baritone saxophonist, composer, bandleader, playwright, writer and Marxist social activist. In 1988, he changed his surname to \"Ho\"."
  },
  {
    name:"Fred Ho (politician)",
    born:"August 10, 1957",
    died:"April 12, 2014",
    picture:"img/fred_ho.png",
    bio:"This is a dummy record."
  }
];

var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var autoSuggestions = document.getElementById("auto-suggestions");
var display = document.getElementById("display");

searchBar.addEventListener("keypress", checkKey);
searchBar.addEventListener("input", getAutoSuggestions);
searchButton.addEventListener("click", processInput);

function checkKey(e) {
  var key = e.which || e.keyCode;
  if(key == 13) {
    processInput();
  }
}

function processInput() {
  var cleanedInput = searchBar.value.toLowerCase().trim();
  autoSuggestions.innerHTML = "";
  autoSuggestions.style.display = "none";
  searchBar.value = "";
  var databaseRecord = getRecord(cleanedInput);
  if(databaseRecord != null) {
    displayRecord(databaseRecord);
  }
  else {
    displaySuggestions(getSuggestions(cleanedInput));
  }
}

function getRecord(cleanedInput) {
  for(var i = 0; i < database.length; i++) {
    var cleanedRecordName = database[i].name.toLowerCase().trim();
    if(cleanedRecordName === cleanedInput) {
      return database[i];
    }
  }
  return null;
}

function displayRecord(databaseRecord) {
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

function getAutoSuggestions() {
  var cleanedInput = searchBar.value.toLowerCase().trim();
  autoSuggestions.innerHTML = "";
  for(var i = 0; i < database.length; i++) {
    var cleanedRecordName = database[i].name.toLowerCase().trim();
    if(cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0) {
      var matching = database[i].name.substring(0, searchBar.value.length);
      var remaining = database[i].name.substring(searchBar.value.length);
      var result = matching + "<b>" + remaining + "</b>";
      var button = document.createElement("button");
      button.innerHTML = result;
      button.style.display = "block";
      button.className = "suggestion";
      activateSuggestionButton(button, database[i]);
      autoSuggestions.appendChild(button);
    }
  }
  if(autoSuggestions.hasChildNodes()) {
    autoSuggestions.style.display = "block";
  }
  else {
    autoSuggestions.style.display = "none";
  }
}

function activateSuggestionButton(button, record) {
  button.addEventListener("click", function() {
    displayRecord(record);
    autoSuggestions.innerHTML = "";
    autoSuggestions.style.display = "none";
    searchBar.value = "";
  });
}

function getSuggestions(cleanedInput) {
  var suggestions = [];
  for(var i = 0; i < database.length; i++) {
    var cleanedRecordName = database[i].name.toLowerCase().trim();
    if(cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0) {
      suggestions.push(database[i]);
    }
  }
  return suggestions;
}

function displaySuggestions(suggestions) {
  display.innerHTML = "";
  var paragraph = document.createElement("p");
  if(suggestions.length > 0) {
    paragraph.innerHTML = "Did you mean:";
    display.appendChild(paragraph);
    for(var i = 0; i < suggestions.length; i++) {
      var button = document.createElement("button");
      button.innerHTML = suggestions[i].name;
      button.style.display = "block";
      button.className = "suggestion";
      activateSuggestionButton(button, suggestions[i]);
      display.appendChild(button);
    }
  }
  else {
    paragraph.innerHTML = "No results!";
    display.appendChild(paragraph);
  }
}
