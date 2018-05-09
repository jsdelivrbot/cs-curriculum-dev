var database;
var playlist = document.getElementById("playlist");
var playback = document.getElementById("playback");

// button variables
var backButton = document.getElementById("back-button");
var searchButton = document.getElementById("search-button");

var seekSlider = document.getElementById("seek-slider");
var currentTimeDisplay = document.getElementById("current-time-display");
var maxTimeDisplay = document.getElementById("max-time-display");

var repeatButton = document.getElementById("repeat-button");
var skipPreviousButton = document.getElementById("skip-previous-button");
var playButton = document.getElementById("play-button");
var skipNextButton = document.getElementById("skip-next-button");
var shuffleButton = document.getElementById("shuffle-button");

var largeSongArt = document.getElementById("large-song-art");

var nowPlayingTitle = document.getElementById("now-playing-title");
var audioArray = [];
var artArray = [];
var titleArray = [];
var nowPlayingAudio;
var loopState = 0;
var shuffleState = false;


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
  printSongTitles();
  activateInterfaceButtons();
  createLayout();
}

function activateInterfaceButtons() {
  backButton.addEventListener("click", function() {
    showPlaylist();
  });
  repeatButton.addEventListener("click", function() {
    toggleRepeat();
  });
  skipPreviousButton.addEventListener("click", function() {
    playPreviousSong();
  });
  skipNextButton.addEventListener("click", function() {
    playNextSong();
  });
  playButton.addEventListener("click", function() {
    togglePlay();
  });
  shuffleButton.addEventListener("click", function() {
    toggleShuffle();
  });
  seekSlider.addEventListener("input", updateTrackTime);
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

function createLayout() {
  for(var i = 0; i < database.length; i++) {
    createSong(database[i]);
  }
}

// create a single song for display and return it
function createSong(song) {
  var songDiv = document.createElement("div");
  songDiv.className = "song";
  var songArt = document.createElement("input");
  songArt.type = "image";
  songArt.className = "song-art";
  songArt.src = song.artLocation;
  artArray.push(songArt.src);
  var songTitle = document.createElement("figcaption");
  songTitle.className = "song-title";
  songTitle.innerHTML = song.title;
  titleArray.push(songTitle.innerHTML);
  // create audio below
  var songAudio = document.createElement("audio");
  songAudio.src = song.mp3Location;
  songAudio.type = "audio/mpeg";
  audioArray.push(songAudio);

  // add event listeners
  songArt.addEventListener("click", function() {
    nowPlayingAudio = songAudio;
    nowPlayingAudio.load();
    nowPlayingAudio.play();
    playButton.innerHTML = "pause";
    showPlayback(songTitle.innerHTML, songArt.src);
  });
  songAudio.addEventListener("timeupdate", updateTrackSeeker);
  songAudio.addEventListener("durationchange", function() {
    var seconds = songAudio.duration;
    var minutes = Math.floor(seconds / 60);
    if(minutes < 1) {
      minutes = "0";
    }
    seconds = Math.floor(seconds % 60);
    if(seconds < 10) {
      seconds = "0" + seconds;
    }
    maxTimeDisplay.innerHTML = minutes + ":" + seconds;
  });

  //add all elements to the songDiv, in order
  songDiv.appendChild(songArt);
  songDiv.appendChild(songTitle);
  songDiv.appendChild(songAudio);
  playlist.appendChild(songDiv);
}

function showPlayback(songTitle, songArtSource) {
  backButton.innerHTML = "arrow_back";
  playlist.style.display = "none";
  playback.style.display = "block";
  nowPlayingTitle.innerHTML = songTitle;
  largeSongArt.src = songArtSource;
}

function showPlaylist() {
  if(backButton.innerHTML === "arrow_back") {
    backButton.innerHTML = "menu";
    nowPlayingAudio.pause();
    playButton.innerHTML = "play_arrow";
    playback.style.display = "none";
    playlist.style.display = "grid";
  }
}

function toggleRepeat() {
  if(loopState === 0) {
    repeatButton.style.fontWeight = "900";
    repeatButton.style.color = "red";
    loopState++;
  }
  else if(loopState === 1) {
    loopState++;
    repeatButton.innerHTML = "repeat_one";
  }
  else if(loopState === 2) {
    loopState = 0;
    repeatButton.innerHTML = "repeat";
    repeatButton.style.fontWeight = "normal";
    repeatButton.style.color = "black";
  }
}

function playNextSong() {
  nowPlayingAudio.pause();
  if(shuffleState) {
    var randomIndex = artArray.indexOf(largeSongArt.src);
    while(randomIndex === artArray.indexOf(largeSongArt.src)) {
      randomIndex = Math.floor((Math.random() * (artArray.length)));
    }
    largeSongArt.src = artArray[randomIndex];
    nowPlayingTitle.innerHTML = titleArray[randomIndex];
    nowPlayingAudio = audioArray[randomIndex];
  }
  else if(artArray.indexOf(largeSongArt.src) + 1 === artArray.length) {
    largeSongArt.src = artArray[0];
    nowPlayingTitle.innerHTML = titleArray[0];
    nowPlayingAudio = audioArray[0];
  }
  else {
    largeSongArt.src = artArray[artArray.indexOf(largeSongArt.src) + 1];
    nowPlayingTitle.innerHTML = titleArray[titleArray.indexOf(nowPlayingTitle.innerHTML) + 1];
    nowPlayingAudio = audioArray[audioArray.indexOf(nowPlayingAudio) + 1];
  }
  playButton.innerHTML = "pause";
  nowPlayingAudio.load();
  nowPlayingAudio.play();
}

function playPreviousSong() {
  nowPlayingAudio.pause();
  if(shuffleState) {
    var randomIndex = artArray.indexOf(largeSongArt.src);
    while(randomIndex === artArray.indexOf(largeSongArt.src)) {
      randomIndex = Math.floor((Math.random() * (artArray.length)));
    }
    largeSongArt.src = artArray[randomIndex];
    nowPlayingTitle.innerHTML = titleArray[randomIndex];
    nowPlayingAudio = audioArray[randomIndex];
  }
  else if(artArray.indexOf(largeSongArt.src) - 1 < 0) {
    largeSongArt.src = artArray[artArray.length - 1];
    nowPlayingTitle.innerHTML = titleArray[titleArray.length - 1];
    nowPlayingAudio = audioArray[audioArray.length - 1];
  }
  else {
    largeSongArt.src = artArray[artArray.indexOf(largeSongArt.src) - 1];
    nowPlayingTitle.innerHTML = titleArray[titleArray.indexOf(nowPlayingTitle.innerHTML) - 1];
    nowPlayingAudio = audioArray[audioArray.indexOf(nowPlayingAudio) - 1];
  }
  playButton.innerHTML = "pause";
  nowPlayingAudio.load();
  nowPlayingAudio.play();
}

function togglePlay() {
  if(playButton.innerHTML === "play_arrow") {
    playButton.innerHTML = "pause";
    nowPlayingAudio.play();
  }
  else if(playButton.innerHTML === "pause") {
    playButton.innerHTML = "play_arrow";
    nowPlayingAudio.pause();
  }
}

function toggleShuffle() {
  if(!shuffleState) {
    shuffleButton.style.fontWeight = "900";
    shuffleButton.style.color = "red";
    shuffleState = true;
  }
  else {
    shuffleButton.style.fontWeight = "normal";
    shuffleButton.style.color = "black";
    shuffleState = false;
  }
}

//For debugging
function printSongTitles() {
  for(var i = 0; i < database.length; i++) {
    console.log(database[i].title);
  }
}

function updateTrackSeeker() {
  seekSlider.value = nowPlayingAudio.currentTime;
  seekSlider.max = nowPlayingAudio.duration;
  var seconds = nowPlayingAudio.currentTime;
  var minutes = Math.floor(seconds / 60);
  if(minutes < 1) {
    minutes = "0";
  }
  seconds = Math.floor(seconds % 60);
  if(seconds < 10) {
    seconds = "0" + seconds;
  }
  seekSlider.title = "Seek: " + minutes + ":" + seconds + " / " + maxTimeDisplay.innerHTML;
  currentTimeDisplay.innerHTML = minutes + ":" + seconds;
  if(nowPlayingAudio.currentTime >= nowPlayingAudio.duration) {
    if(loopState === 0) {  // reset position to beginning of track
      seekSlider.value = 0;
      currentTimeDisplay.innerHTML = "0:00";
      nowPlayingAudio.pause();
      playButton.innerHTML = "play_arrow";
    }
    else if(loopState === 1) { // play next track
      playNextSong();
    }
    else if(loopState === 2) { // loop current track
      seekSlider.value = 0;
      nowPlayingAudio.play();
    }
  }
}

function updateTrackTime() {
  nowPlayingAudio.currentTime = seekSlider.value;
}
