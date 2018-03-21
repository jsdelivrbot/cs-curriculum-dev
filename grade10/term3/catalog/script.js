var database = [
  {
    id:0,
    name:"Martin Luther King Jr.",
    born:"January 15, 1929",
    died:"April 4, 1968",
    picture:"img/martin_luther_king_jr.png",
    bio:"<b>Martin Luther King Jr.</b> was an American Baptist minister and activist who became the most visible spokesperson and leader in the civil rights movement from 1954 through 1968. He is best known for his role in the advancement of civil rights using the tactics of nonviolence and civil disobedience based on his Christian beliefs and inspired by the nonviolent activism of Mahatma Gandhi."
  },
  {
    id:1,
    name:"Dolores Huerta",
    born:"April 10, 1930",
    died:null,
    picture:"img/dolores_huerta.png",
    bio:"<b>Dolores Clara Fernández Huerta</b> is an American labor leader and civil rights activist who was the co-founder of the National Farmworkers Association, which later became the United Farm Workers (UFW). Huerta helped organize the Delano grape strike in 1965 in California and was the lead negotiator in the workers’ contract that was created after the strike."
  },
  {
    id:2,
    name:"Fred Ho",
    born:"August 10, 1957",
    died:"April 12, 2014",
    picture:"img/fred_ho.png",
    bio:"<b>Fred Ho</b> (Chinese: 侯维翰; pinyin: Hóu Wéihàn; born Fred Wei-han Houn) was an American jazz baritone saxophonist, composer, bandleader, playwright, writer and Marxist social activist. In 1988, he changed his surname to \"Ho\"."
  },
  {
    id:3,
    name:"Joan Baez",
    born:"January 9, 1941",
    died:null,
    picture:"img/joan_baez.png",
    bio:"<b>Joan Chandos Baez</b> is an American folk singer, songwriter, musician, and activist whose contemporary folk music often includes songs of protest or social justice, Baez has performed publicly for over 59 years, releasing over 30 albums. Fluent in Spanish and English, she has also recorded songs in at least six other languages. She is regarded as a folk singer, although her music has diversified since the counterculture days of the 1960s and now encompasses everything from folk rock and pop to country and gospel music. Although a songwriter herself, Baez generally interprets other composers' work, having recorded songs by Bob Dylan, the Allman Brothers Band, the Beatles, Jackson Browne, Leonard Cohen, Woody Guthrie, Violeta Parra, The Rolling Stones, Pete Seeger, Paul Simon, Stevie Wonder and many others. In recent years, she has found success interpreting songs of modern songwriters such as Ryan Adams, Josh Ritter, Steve Earle and Natalie Merchant. Her recordings include many topical songs and material dealing with social issues."
  }
];

var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var suggestions = document.getElementById("suggestions");
var display = document.getElementById("display");

searchBar.addEventListener("input", createSuggestions);
searchBar.addEventListener("keypress", checkEnter);
searchButton.addEventListener("click", processInput);

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
      var tempEntry = database[i];
      button.addEventListener("click", function() {
        showRecord(tempEntry);
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
  var databaseEntry = getRecord(parsedInput);
  if(databaseEntry != null) {
    showRecord(databaseEntry);
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
        showRecord(tempEntry);
      });
      display.appendChild(button);
    }
  }
  else {
    paragraph.innerHTML = "No results!";
    display.appendChild(paragraph);
  }
}

function showRecord(databaseEntry) {
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
