// the song database
var database; 

// "menu/back" element
var menuBackButton;

// “screen” elements
var playlistScreen;      
var playbackScreen;

// (playback) "now playing" elements
var nowPlayingAudio;
var nowPlayingImg;
var nowPlayingTitle;
var nowPlayingArtist;

// (playback) "seek slider" and "time display" elements
var seekSlider;        
var currentTimeDisplay;
var maxTimeDisplay;      

// (playback) "song control" elements
var repeatButton;
var skipPreviousButton;
var playButton;
var skipNextButton;
var shuffleButton;

// other important variables
var audioArray = [];
var loopState = 0;
var shuffleState = false;

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
