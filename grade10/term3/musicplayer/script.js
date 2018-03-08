(function() {

  var trackTable = document.getElementById("table");
  var playButton = document.getElementById("play-button");
  var volumeSlider = document.getElementById("volume-slider");
  var audioFiles = document.getElementById("audio-files");
  var currentTrackDisplay = document.getElementById("current-track-display");
  var artistImage = document.getElementById("artist-image");
  var currentTrackTimeDisplay = document.getElementById("current-time");
  var maxTrackTimeDisplay = document.getElementById("max-time");
  var trackSeeker = document.getElementById("seek-slider");
  var loopAudio = document.getElementById("loop-button");
  var trackData;
  var currentTrack;
  var currentTrackIndex = 0;
  var trackTime;
  var loopState = 0;

  playButton.addEventListener("click", togglePlayPause);
  volumeSlider.addEventListener("input", changeVolume);
  trackSeeker.addEventListener("input", updateTrackTime);
  loopAudio.addEventListener("click", function() {
    loopState++;
    if(loopState > 2) {
      loopState = 0;
    }
    if(loopState === 0) {
      loopAudio.innerHTML = "Loop: None";
      currentTrack.loop = false;
    }
    else if(loopState === 1) {
      loopAudio.innerHTML = "Loop: Track";
      currentTrack.loop = true;
    }
    else {
      loopAudio.innerHTML = "Loop: All";
      currentTrack.loop = false;
    }
  });

  loadData();

  function loadData() {
    fetch("https://rawgit.com/CodeNextCoaches/cs-curriculum-dev/master/grade10/term3/musicplayer/database.json")
    .then(function(response) {
      response.json()
      .then(function(jsonObj) {
        trackData = jsonObj.tracks;
        console.log(trackData);
      }).then(setupTracks)
    });
  }

  function setupTracks() {
    for(var i = 0; i < trackData.length; i++) {
      createAudioElement(i);
      createTableElement(i);
    }
    currentTrack = audioFiles.childNodes[0];
    updateCurrentTrackDisplay();
    changeVolume();
  }

  function createAudioElement(trackIndex) {
    var audio = document.createElement("audio");
    audio.src = trackData[trackIndex].mp3Location;
    audio.type = "audio/mpeg";
    audio.addEventListener("timeupdate", updateTrackSeeker);
    audioFiles.appendChild(audio);
  }

  function createTableElement(trackIndex) {
    var row = document.createElement("div");
    row.className = "row";
    var titleDiv = document.createElement("div");
    titleDiv.className = "td";
    var titleButton = document.createElement("button");
    titleButton.className = "track-select";
    titleButton.innerHTML = trackData[trackIndex].title;
    titleButton.addEventListener("click", setCurrentTrack(trackIndex));
    var durationDiv = document.createElement("div");
    durationDiv.className = "td";
    var durationSpan = document.createElement("span");
    durationSpan.className = "track-duration";
    durationSpan.innerHTML = trackData[trackIndex].duration;
    var artistDiv = document.createElement("div");
    artistDiv.className = "td";
    var artistSpan = document.createElement("span");
    artistSpan.className = "track-artist";
    artistSpan.innerHTML = trackData[trackIndex].artist;

    titleDiv.appendChild(titleButton);
    durationDiv.appendChild(durationSpan);
    artistDiv.appendChild(artistSpan);

    row.appendChild(titleDiv);
    row.appendChild(durationDiv);
    row.appendChild(artistDiv);

    trackTable.appendChild(row);
  }

  function setCurrentTrack(trackIndex) {
    return function() {
      pauseTrack();
      currentTrack = audioFiles.childNodes[trackIndex];
      currentTrackIndex = trackIndex;
      console.log("current trackID is " + currentTrack.title);
      currentTrack.load();
      updateCurrentTrackDisplay();
      togglePlayPause();
    }
  }

  function playTrack() {
    console.log("Playing");
    changeVolume();
    currentTrack.play();
    currentTrack.loop = loopState === 1;
    playButton.id = "pause-button";
    playButton.title = "Pause";
    var artURL = trackData[currentTrackIndex].artLocation;
    artistImage.style.backgroundImage = "url(" + artURL + ")";
  }

  function pauseTrack() {
    console.log("Pausing");
    currentTrack.pause();
    playButton.id = "play-button";
    playButton.title = "Play";
  }

  function togglePlayPause() {
    if(currentTrack.paused) {
      playTrack();
    }
    else {
      pauseTrack();
    }
  }

  function changeVolume() {
    currentTrack.volume = volumeSlider.value / 100;
    var currentVolume = Math.round(currentTrack.volume * 100) + "%";
    volumeSlider.title = "Volume: " + currentVolume;
    console.log("Current volume: " + currentTrack.volume);
  }

  function updateCurrentTrackDisplay() {
    currentTrackDisplay.innerHTML = trackData[currentTrackIndex].title;
    currentTrackTimeDisplay.innerHTML = "0:00";
    maxTrackTimeDisplay.innerHTML = trackData[currentTrackIndex].duration;
  }

  function updateTrackSeeker() {
    trackSeeker.value = currentTrack.currentTime;
    trackSeeker.max = currentTrack.duration;
    var seconds = currentTrack.currentTime;
    var minutes = Math.floor(seconds / 60);
    if(minutes < 1) {
      minutes = "0";
    }
    seconds = Math.floor(seconds % 60);
    if(seconds < 10) {
      seconds = "0" + seconds;
    }
    trackSeeker.title = "Seek: " + minutes + ":" + seconds + " / " + trackData[currentTrackIndex].duration;
    currentTrackTimeDisplay.innerHTML = minutes + ":" + seconds;
    if(currentTrack.currentTime >= currentTrack.duration) {
      if(loopState === 0) {  // reset position to beginning of track
        trackSeeker.value = 0;
        currentTrackTimeDisplay.innerHTML = "0:00";
        pauseTrack();
      }
      else if(loopState === 1) { //loop current track
        trackSeeker.value = 0;
        playTrack();
      }
      else { //play next track
        if(currentTrackIndex < audioFiles.childNodes.length - 1) {
          setCurrentTrack(currentTrackIndex + 1)();
        }
        else {
          setCurrentTrack(0)();
        }
      }
    }
  }

  function updateTrackTime() {
    currentTrack.currentTime = trackSeeker.value;
  }

})();
