var database = [
  {
    name:"Martin Luther King Jr.",
    tags:["African American", "Peace", "Activist", "Civil Rights"],
    born:"January 15, 1929",
    died:"April 4, 1968",
    nationality:"American",
    picture:"https://codenextcoaches.github.io/cs-curriculum-dev/grade10/term3/catalog/img/mlk.png",
    bio:"<b>Martin Luther King Jr.</b> (January 15, 1929 – April 4, 1968) " +
    "was an American Baptist minister and activist who became the most visible " +
    "spokesperson and leader in the civil rights movement from 1954 through " +
    "1968.He is best known for his role in the advancement of civil rights " +
    "using the tactics of nonviolence and civil disobedience based on his " +
    "Christian beliefs and inspired by the nonviolent activism of Mahatma " +
    "Gandhi.",
  },
  {
    name:"Dolores Huerta",
    tags:["Labor", "Civil Rights", "Latin American", "Activist"],
    born:"April 10, 1930",
    died:null,
    nationality:"American",
    picture:"https://codenextcoaches.github.io/cs-curriculum-dev/grade10/term3/catalog/img/dolores_huerta.png",
    bio:"<b>Dolores Clara Fernández Huerta</b> (born April 10, 1930) is an " +
    "American labor leader and civil rights activist who was the co-founder " +
    "of the National Farmworkers Association, which later became the United " +
    "Farm Workers (UFW). Huerta helped organize the Delano grape strike in " +
    "1965 in California and was the lead negotiator in the workers’ contract " +
    "that was created after the strike."
  },
  {
    name:"Fred Ho",
    tags:["Musician", "Philosopher", "Artist", "Asian American", "Activist"],
    born:"August 10, 1957",
    died:"April 12, 2014",
    nationality:"American",
    picture:"https://codenextcoaches.github.io/cs-curriculum-dev/grade10/term3/catalog/img/fred_ho.png",
    bio:"Fred Ho (Chinese: 侯维翰; pinyin: Hóu Wéihàn; born Fred Wei-han Houn; " +
      "August 10, 1957 – April 12, 2014) was an American jazz baritone " +
      "saxophonist, composer, bandleader, playwright, writer and Marxist " +
      "social activist. In 1988, he changed his surname to \"Ho\"."
  }
];

var display = document.getElementById("display");
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var searchHelp = document.getElementById("search-help");
var searchTerms = [];

searchBar.addEventListener("keyup", checkKey);
searchButton.addEventListener("click", processInput);
searchHelp.addEventListener("click", function() {
  alert("You clicked");
});

init();

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
      searchHelp.innerHTML += result;
    }
  }
  for(var i = 0; i < searchTerms.length; i++) {
    var parsedSearchTerm = searchTerms[i].toLowerCase().trim();
    if(parsedSearchTerm.startsWith(parsedInput) && parsedInput.length > 0){
      var matching = searchTerms[i].substring(0, searchBar.value.length);
      var remaining = searchTerms[i].substring(searchBar.value.length);
      var result = matching + "<b>" + remaining + "</b><br>";
      searchHelp.innerHTML += result;
    }
  }
}

function processInput() {
  display.innerHTML = "";
  var words = searchBar.value.toLowerCase().trim().split(" ");
}

function init() {
  for(var i = 0; i < database.length; i++) {
    for(var j = 0; j < database[i].tags.length; j++) {
      var tag = database[i].tags[j];
      if(searchTerms.indexOf(tag) === -1) {
        searchTerms.push(tag);
      }
    }
  }
}
