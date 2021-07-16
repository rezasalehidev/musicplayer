const music = document.querySelector("audio");
const btnPlay = document.getElementById("play");
const btnforward = document.getElementById("next");
const btnback = document.getElementById("prev");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const durationEl = document.getElementById("duration");
const curentTimeEl = document.getElementById("current-time");
// progress
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const songs = [
  {
    name: "music-1",
    displayName: "Music1",
    artist: "musician",
  },
  {
    name: "music-2",
    displayName: "Music2",
    artist: "musician",
  },
  {
    name: "music-3",
    displayName: "Music3",
    artist: "musician",
  },
  {
    name: "metric-1",
    displayName: "Music4",
    artist: "Metric/musician",
  },
];

var isplaying = false;
function playSong() {
  isplaying = true;
  btnPlay.classList.replace("fa-play", "fa-pause");
  btnPlay.setAttribute("title", "pause");
  music.play();
}

function pauseSong() {
  isplaying = false;
  btnPlay.classList.replace("fa-pause", "fa-play");
  btnPlay.setAttribute("title", "play");
  music.pause();
}

btnPlay.addEventListener("click", () => (isplaying ? pauseSong() : playSong()));

function loadSongs(songs) {
  image.src = `img/${songs.name}.jpg`;
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
}

var indexSong = 0;

function prevMusic() {
  indexSong--;
  if (indexSong < 0) {
    indexSong = songs.length - 1;
  }
  loadSongs(songs[indexSong]);
  playSong();
}

function nextMusic() {
  indexSong++;
  if (indexSong > songs.length - 1) {
    indexSong = 0;
  }
  loadSongs(songs[indexSong]);
  playSong();
}

//load Song
loadSongs(songs[indexSong]);

function updateProgress(e) {
  if (isplaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPrecent = (currentTime / duration) * 100;
    progress.style.width = `${progressPrecent}%`;

    //duration time and plus to duratinEl
    var durationMinute = Math.floor(duration / 60);
    var durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    if (durationSecond) {
      durationEl.textContent = `${durationMinute}:${durationSecond}`;
    }

    //duration time and plus to duratinEl
    var currentMinute = Math.floor(currentTime / 60);
    var currentSecond = Math.floor(currentTime % 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    if (currentSecond) {
      curentTimeEl.textContent = `${currentMinute}:${currentSecond}`;
    }
  }
}

function progressFunc(e) {
  const width = this.clientWidth;
  const offsetx = e.offsetX;
  const { duration } = music;
  music.currentTime = (offsetx / width) * duration;
}

btnforward.addEventListener("click", nextMusic);
btnback.addEventListener("click", prevMusic);
music.addEventListener("timeupdate", updateProgress);
music.addEventListener("ended", nextMusic);
progressContainer.addEventListener("click", progressFunc);
