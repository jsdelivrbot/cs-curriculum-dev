var database;

loadData();

function loadData() {
  fetch("database.json")
  .then(function(response) {
    response.json()
    .then(function(jsonObj) {
      database = jsonObj;
      console.log("Database Loaded Successfully");
    }).then(setup)
  });
}

function setup() {
  sortDatabase();
  printSongTitles(); // for debugging
}

// How to sort your database by song title
function sortDatabase() {
  database.sort(function(songOne, songTwo) {
    var songOneTitle = songOne.title.toLowerCase();
    var songTwoTitle = songTwo.title.toLowerCase();
    if(songOneTitle > songTwoTitle) {
      return 1;
    }
    else if(songOneTitle < songTwoTitle) {
      return -1;
    }
    else {
      return 0;
    }
  });
}

//For debugging
function printSongTitles() {
  for(var i = 0; i < database.length; i++) {
    console.log(database[i].title);
  }
}
