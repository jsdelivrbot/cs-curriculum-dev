// the song database
let database;

// "menu/back" element
let menuBackButton = document.getElementById("menu-back-button");

// “screen” elements
let playlistScreen = document.getElementById("playlist-screen");
let playbackScreen = document.getElementById("playback-screen");

// (playback) "now playing" elements
let nowPlayingAudio;
let nowPlayingImg = document.getElementById("now-playing-img");
let nowPlayingTitle = document.getElementById("now-playing-title");
let nowPlayingArtist = document.getElementById("now-playing-artist");

// (playback) "seek slider" and "time display" elements
let seekSlider = document.getElementById("seek-slider");
let currentTimeDisplay = document.getElementById("current-time-display");
let maxTimeDisplay = document.getElementById("max-time-display");

// (playback) "song control" elements
let repeatButton = document.getElementById("repeat-button");
let skipPreviousButton = document.getElementById("skip-previous-button");
let playButton = document.getElementById("play-button");
let skipNextButton = document.getElementById("skip-next-button");
let shuffleButton = document.getElementById("shuffle-button");

// other important letiables
let audioArray = [];
let repeatState = 0;
let shuffleState = false;

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
  createPlaylist();
  activateInterfaceButtons();
}

function activateInterfaceButtons() {
  menuBackButton.addEventListener("click", showPlaylist);
  repeatButton.addEventListener("click", toggleRepeat);
  skipPreviousButton.addEventListener("click", playPreviousSong);
  skipNextButton.addEventListener("click", playNextSong);
  playButton.addEventListener("click", togglePlay);
  shuffleButton.addEventListener("click", toggleShuffle);
  seekSlider.addEventListener("input", updateAudioPosition);
}

// How to sort your database by song title
function sortDatabase() {
  database.sort(function(songOne, songTwo) {
    let songOneTitle = songOne.title.toLowerCase();
    let songTwoTitle = songTwo.title.toLowerCase();
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
  for(let i = 0; i < database.length; i++) {
    createAudioElement(database[i]);
    createSongDiv(database[i]);
  }
}

function createAudioElement(song) {
  let songAudio = document.createElement("audio");
  songAudio.src = song.musicLocation;
  audioArray.push(songAudio);
  songAudio.addEventListener("timeupdate", updateSeekSlider);
  songAudio.addEventListener("durationchange", function() {
    let seconds = songAudio.duration;
    let minutes = Math.floor(seconds / 60);
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

// create a single song for display
function createSongDiv(song) {
  let songDiv = document.createElement("div");
  songDiv.className = "song-div";
  let songInput = document.createElement("input");
  songInput.type = "image";
  songInput.className = "song-input";
  songInput.src = song.imgLocation;
  songInput.addEventListener("click", function() {
    if(nowPlayingAudio !== undefined) {
      nowPlayingAudio.pause();
    }
    nowPlayingAudio = audioArray[database.indexOf(song)];
    nowPlayingAudio.load();
    nowPlayingAudio.play();
    playButton.innerHTML = "pause";
    menuBackButton.innerHTML = "arrow_back";
    playlistScreen.style.display = "none";
    playbackScreen.style.display = "block";
    updatePlayback(song);
  });
  let songTitle = document.createElement("figcaption");
  songTitle.className = "song-title";
  songTitle.innerHTML = song.title;
  let songArtist = document.createElement("figcaption");
  songArtist.className = "song-artist";
  songArtist.innerHTML = song.artist;
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
  if(repeatState === 0) {
    repeatButton.style.fontWeight = "900";
    repeatButton.style.color = "red";
    repeatState++;
  }
  else if(repeatState === 1) {
    repeatState++;
    repeatButton.innerHTML = "repeat_one";
  }
  else if(repeatState === 2) {
    repeatState = 0;
    repeatButton.innerHTML = "repeat";
    repeatButton.style.fontWeight = "normal";
    repeatButton.style.color = "black";
  }
}

function playNextSong() {
  nowPlayingAudio.pause();
  if(shuffleState) {
    let randomIndex = audioArray.indexOf(nowPlayingAudio);
    while(randomIndex === audioArray.indexOf(nowPlayingAudio)) {
      randomIndex = Math.floor(Math.random() * audioArray.length);
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
    let randomIndex = audioArray.indexOf(nowPlayingAudio);
    while(randomIndex === audioArray.indexOf(nowPlayingAudio)) {
      randomIndex = Math.floor(Math.random() * audioArray.length);
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
  for(let i = 0; i < database.length; i++) {
    console.log(database[i].title);
  }
}

function updateSeekSlider() {
  seekSlider.value = nowPlayingAudio.currentTime;
  seekSlider.max = nowPlayingAudio.duration;
  let seconds = nowPlayingAudio.currentTime;
  let minutes = Math.floor(seconds / 60);
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
    if(repeatState === 0) {  // reset position to beginning of track
      seekSlider.value = 0;
      currentTimeDisplay.innerHTML = "0:00";
      nowPlayingAudio.pause();
      playButton.innerHTML = "play_arrow";
    }
    else if(repeatState === 1) { // play next track
      playNextSong();
    }
    else { // loop current track
      seekSlider.value = 0;
      nowPlayingAudio.load();
      nowPlayingAudio.play();
    }
  }
}

function updateAudioPosition() {
  nowPlayingAudio.currentTime = seekSlider.value;
}
