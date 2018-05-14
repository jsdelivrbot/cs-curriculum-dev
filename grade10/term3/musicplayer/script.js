var database;
var playlistScreen = document.getElementById("playlist-screen");
var playbackScreen = document.getElementById("playback-screen");

var seekSlider = document.getElementById("seek-slider");
var currentTimeDisplay = document.getElementById("current-time-display");
var maxTimeDisplay = document.getElementById("max-time-display");

var menuBackButton = document.getElementById("menu-back-button");
var repeatButton = document.getElementById("repeat-button");
var skipPreviousButton = document.getElementById("skip-previous-button");
var playButton = document.getElementById("play-button");
var skipNextButton = document.getElementById("skip-next-button");
var shuffleButton = document.getElementById("shuffle-button");

var nowPlayingImg = document.getElementById("now-playing-img");
var nowPlayingTitle = document.getElementById("now-playing-title");
var nowPlayingArtist = document.getElementById("now-playing-artist");
var nowPlayingAudio;

var audioArray = [];
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
  printSongTitles(); // debugging
  activateInterfaceButtons();
  createPlaylist();
}

function activateInterfaceButtons() {
  menuBackButton.addEventListener("click", function() {
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

function createPlaylist() {
  for(var i = 0; i < database.length; i++) {
    createAudioElement(database[i]);
    createSongDiv(database[i]);
  }
}

function createAudioElement(song) {
  var songAudio = document.createElement("audio");
  songAudio.src = song.musicLocation;
  audioArray.push(songAudio);
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
}

// create a single song for display and return it
function createSongDiv(song) {
  var songDiv = document.createElement("div");
  songDiv.className = "song-div";
  var songInput = document.createElement("input");
  songInput.type = "image";
  songInput.className = "song-input";
  songInput.src = song.imgLocation;
  var songTitle = document.createElement("figcaption");
  songTitle.className = "song-title";
  songTitle.innerHTML = song.title;
  var songArtist = document.createElement("figcaption");
  songArtist.className = "song-artist";
  songArtist.innerHTML = song.artist;
  songInput.addEventListener("click", function() {
    nowPlayingAudio = audioArray[database.indexOf(song)];
    nowPlayingAudio.load();
    nowPlayingAudio.play();
    playButton.innerHTML = "pause";
    menuBackButton.innerHTML = "arrow_back";
    playlistScreen.style.display = "none";
    playbackScreen.style.display = "block";
    updatePlayback(song);
  });
  songDiv.appendChild(songInput);
  songDiv.appendChild(songTitle);
  songDiv.appendChild(songArtist);
  playlistScreen.appendChild(songDiv);
}

function updatePlayback(song) {
  nowPlayingTitle.innerHTML = song.title;
  nowPlayingArtist.innerHTML = song.artist;
  nowPlayingImg.src = song.imgLocation;
}

function showPlaylist() {
  if(menuBackButton.innerHTML === "arrow_back") {
    menuBackButton.innerHTML = "menu";
    if(nowPlayingAudio !== undefined) {
      nowPlayingAudio.pause();
    }
    playButton.innerHTML = "play_arrow";
    playbackScreen.style.display = "none";
    playlistScreen.style.display = "grid";
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
    var randomIndex = audioArray.indexOf(nowPlayingAudio);
    while(randomIndex === audioArray.indexOf(nowPlayingAudio)) {
      randomIndex = Math.floor((Math.random() * (audioArray.length)));
    }
    nowPlayingAudio = audioArray[randomIndex];
    updatePlayback(database[randomIndex]);
  }
  else if(audioArray.indexOf(nowPlayingAudio) + 1 === audioArray.length) {
    nowPlayingAudio = audioArray[0];
    updatePlayback(database[0]);
  }
  else {
    nowPlayingAudio = audioArray[audioArray.indexOf(nowPlayingAudio) + 1];
    updatePlayback(database[audioArray.indexOf(nowPlayingAudio)]);
  }
  playButton.innerHTML = "pause";
  nowPlayingAudio.load();
  nowPlayingAudio.play();
}

function playPreviousSong() {
  nowPlayingAudio.pause();
  if(shuffleState) {
    var randomIndex = audioArray.indexOf(nowPlayingAudio);
    while(randomIndex === audioArray.indexOf(nowPlayingAudio)) {
      randomIndex = Math.floor((Math.random() * (audioArray.length)));
    }
    nowPlayingAudio = audioArray[randomIndex];
    updatePlayback(database[randomIndex]);
  }
  else if(audioArray.indexOf(nowPlayingAudio) - 1 < 0) {
    nowPlayingAudio = audioArray[audioArray.length - 1];
    updatePlayback(database[database.length - 1]);
  }
  else {
    nowPlayingAudio = audioArray[audioArray.indexOf(nowPlayingAudio) - 1];
    updatePlayback(database[audioArray.indexOf(nowPlayingAudio)]);
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
      nowPlayingAudio.load();
      nowPlayingAudio.play();
    }
  }
}

function updateTrackTime() {
  nowPlayingAudio.currentTime = seekSlider.value;
}
