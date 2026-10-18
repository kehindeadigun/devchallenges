// VARIABLE DECLARATIONS

const pausePlayButton = document.querySelector(".song__play-pause");
const nextButton = document.querySelector(".song__next");
const prevButton = document.querySelector(".song__prev");
const audio = document.querySelector("audio");
const seekBar = document.querySelector(".song__audio > input[type='range']");

let songs;
let currentSong;

try {
  let songsResponse = await fetch("./songs.json");
  if (songsResponse.ok) {
    songs = await songsResponse.json();
  } else {
    songs = [];
  }
} catch (err) {
  console.log(err);
  songs = [];
}

// FUNCTIONS DECLARATIONS

function playPauseMusic(event) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function setSong(index, play = false) {
  if (songs && index >= 0 && index < songs.length) {
    let songTitle = document.querySelector(".song__title");
    let songArtist = document.querySelector(".song__artist");
    let songArt = document.querySelector(".song__art");
    let audioSource = audio.querySelector("source");
    let isPlaying = !audio.paused;

    currentSong = songs[index];
    songTitle.textContent = currentSong.name;
    songArtist.textContent = currentSong.artist;
    songArt.src = currentSong.cover;
    songArt.alt = currentSong.alt;
    audioSource.src = currentSong.src;
    audio.load();
    if (play || isPlaying) {
      audio.play();
    }
  }
}

function nextSong(event) {
  let index = songs.indexOf(currentSong);
  setSong(index + 1, event.type === "ended");
}

function prevSong(event) {
  let index = songs.indexOf(currentSong);
  setSong(index - 1);
}

function formatTimeText(timeInSecs, fullText = false) {
  let minutes = 0;
  let seconds = 0;
  let totalSeconds = Math.floor(timeInSecs);
  if (timeInSecs) {
    minutes = Math.floor(totalSeconds / 60);
    seconds = Math.floor(totalSeconds % 60);
  }
  if (!fullText) {
    return `${minutes}`.padStart(2, "0") + ":" + `${seconds}`.padStart(2, "0");
  } else {
    const minText = minutes === 1 ? "1 minute" : `${minutes} minutes`;
    const secText = seconds === 1 ? "1 second" : `${seconds} seconds`;
    return `${minText} and ${secText}`;
  }
}

// FUNCTIONS CALLS

setSong(0);

audio.addEventListener("playing", (event) => {
  let icon = pausePlayButton.querySelector("img");
  pausePlayButton.ariaLabel = "Pause song";
  icon.src = "./resources/pause_fill.svg";
});

audio.addEventListener("loadedmetadata", (event) => {
  const songTime = document.querySelector(".song__curr-time");
  const songDuration = document.querySelector(".song__duration");

  seekBar.max = audio.duration;
  songTime.textContent = formatTimeText(audio.currentTime);
  songDuration.textContent = formatTimeText(audio.duration);
  songTime.dateTime = `PT${audio.currentTime.toFixed(2)}S`;
  songDuration.dateTime = `PT${audio.duration.toFixed(2)}S`;
});

audio.addEventListener("timeupdate", (event) => {
  const songTime = document.querySelector(".song__curr-time");
  songTime.textContent = formatTimeText(audio.currentTime);
  songTime.dateTime = `PT${audio.currentTime.toFixed(2)}S`;
  seekBar.value = audio.currentTime;
  seekBar.ariaValueText = formatTimeText(audio.currentTime, true);
});

audio.addEventListener("pause", (event) => {
  let icon = pausePlayButton.querySelector("img");
  pausePlayButton.ariaLabel = "Play song";
  icon.src = "./resources/play_fill.svg";
});

audio.addEventListener("ended", (event) => {
  nextSong(event);
});

seekBar.addEventListener("input", (event) => {
  audio.currentTime = event.target.value;
});

pausePlayButton.addEventListener("click", playPauseMusic);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
