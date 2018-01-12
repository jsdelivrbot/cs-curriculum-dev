(function() {

  var playButton = document.getElementById("play-button");

  var volumeSlider = document.getElementById("volume-slider");

  var trackButtons = document.getElementsByClassName("track-select");
  var tracks = document.getElementsByClassName("track");

  var currentTrackID = 0;
  var currentTrack = tracks[currentTrackID];
  var currentTrackDisplay = document.getElementById("current-track-display");

  var artistImage = document.getElementById("artist-image");

  var trackDurations = document.getElementsByClassName("track-duration");
  var trackSeeker = document.getElementById("seek-slider");
  var trackTime = currentTrack.currentTime;

  var loopAudio = document.getElementById("loop-button");
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

  setupTracks();
  activateButtons();
  changeVolume();
  updateCurrentTrackDisplay();

  function setupTracks() {
    for(var i = 0; i < tracks.length; i++) {
      tracks[i].addEventListener("durationchange", setTrackDuration(i));
      tracks[i].addEventListener("timeupdate", updateTrackSeeker);
    }
  }

  function setTrackDuration(trackID) {
    return function() {
      var seconds = tracks[trackID].duration;
      var minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      if(seconds < 10) {
        seconds = "0" + seconds;
      }
      trackDurations[trackID].innerHTML = minutes + ":" + seconds;
    }
  }

  function activateButtons() {
    for(var i = 0; i < trackButtons.length; i++) {
      trackButtons[i].addEventListener("click", setCurrentTrack(i));
    }
  }

  function setCurrentTrack(trackID) {
    return function() {
      pauseTrack();
      currentTrackID = trackID;
      currentTrack = tracks[currentTrackID];
      console.log("current trackID is " + currentTrackID);
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
    artistImage.style.backgroundImage = "url(\"img/" + currentTrack.dataset.artistImage + "\")";
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
    currentTrackDisplay.innerHTML = trackButtons[currentTrackID].textContent;
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
    var durationSeconds = currentTrack.duration;
    var durationMinutes = Math.floor(durationSeconds / 60);
    durationSeconds = Math.floor(durationSeconds % 60);
    if(durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    } 
    trackSeeker.title = "Seek: " + minutes + ":" + seconds + " / " + durationMinutes + ":" + durationSeconds;
    if(currentTrack.currentTime >= currentTrack.duration) {
      if(loopState === 0) {  // reset position to beginning of track
        trackSeeker.value = 0;
        pauseTrack();
      }
      else if(loopState === 1) { //loop current track
        trackSeeker.value = 0;
        playTrack();
      }
      else { //play next track
        if(currentTrackID < tracks.length - 1) {
          setCurrentTrack(currentTrackID + 1)();
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