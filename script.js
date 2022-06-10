const videos = [
  "https://cdn.videvo.net/videvo_files/video/free/2014-06/large_watermarked/Blue_Sky_and_Clouds_Timelapse_0892__Videvo_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2020-05/large_watermarked/3d_ocean_1590675653_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2018-01/large_watermarked/171124_H1_006_preview.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4",
];
const auds = [
  "https://muzzonas.ru/upload/files/2019-06/moldanazar-mahabbatym_(muzzona.kz).mp3",
  "https://jesusful.com/wp-content/uploads/music/2022/06/Harry_Styles_-_As_It_Was_(Jesusful.com).mp3",
  "https://dl.muzoff.net/files/music/2020/11/Mr.Kitty_-_After_Dark.mp3",
  "https://music2019.su/uploads/files/2022-04/dominic-fike-politics-amp-violence_69923548.mp3",
  "https://now.morsmusic.org/load/423380314/Videoclub_-_Amour_plastique_(musmore.com).mp3",
]
const songwriters = [
  "Moldanazar",
  "Harry Styles",
  "Mr.Kitty",
  "Dominic Fike",
  "Videoclub",
]
const songNames = [
  "Mahabbatym",
  "As It Was",
  "After Dark",
  "Polics and Violence",
  "Amour plastique"
]


const vid = document.getElementById("video-background");
const vidSrc = document.getElementById("vidSrc");
const audSrc = document.getElementById("audSrc");
const aud = document.getElementById("audio");
const btnPlay = document.getElementById("btnPlayVid");
const btnAud = document.getElementById("btnAudPlay");
const btnChangeVid = document.getElementById("btnChangeVid");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

const btnSound1 = document.getElementById("btnSound1");
const btnSound2 = document.getElementById("btnSound2");
const btnSound3 = document.getElementById("btnSound3");
const btnSound4 = document.getElementById("btnSound4");
const btnSound5 = document.getElementById("btnSound5");

const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");
const sound4 = document.getElementById("sound4");
const sound5 = document.getElementById("sound5");

let order = [0, 1, 2 ,3 ,4];
let index = 0;
let shuffled = false;

function shuffling(array){
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
function shuffle(){
  btnPrev.setAttribute("style", "color:black");
  if(shuffled){
    shuffled = false;
    order = [0, 1, 2 ,3 ,4];
    index = 0;
    document.getElementById("btnChangeVid").setAttribute("style", "color:#537d8d8f");
    changeMusic(order[0]);
  } else {
    index = 0;
    shuffled = true;
    order = shuffling(order)
    document.getElementById("btnChangeVid").setAttribute("style", "color:537D8D");
    changeMusic(order[0]);
  }
}
function nextMusic() {
  btnPrev.setAttribute("style", "color:#537D8D");
  if(order.length-1 == index){
    btnNext.setAttribute("style", "color:#537d8d8f");
    btnNext.disabled = true;
  }
  else{
    index += 1;
    btnNext.setAttribute("style", "color:#537D8D");
    changeMusic(order[index]);
  }
}
function prevMusic() {
  btnNext.setAttribute("style", "color:#537D8D");
  if(0 == index){
    btnPrev.setAttribute("style", "color:#537d8d8f");
    btnPrev.disabled = true;
  }
  else{
    index -= 1;
    btnPrev.setAttribute("style", "color:#537D8D");
    changeMusic(order[index]);
  }
}
function changeMusic(i){
  if (aud.paused) {
    vidSrc.setAttribute("src",videos[i]);
    audSrc.setAttribute("src",auds[i]);
    vid.load();
    aud.load();
    document.getElementById("song").innerText = songNames[i];
    document.getElementById("songwriter").innerText = songwriters[i];
    document.getElementById("btnAudPlay").setAttribute("class", "fa fa-play-circle fa-3x");
  } else {
    vidSrc.setAttribute("src",videos[i]);
    audSrc.setAttribute("src",auds[i]);
    vid.load();
    aud.load();
    vid.play();
    aud.play();
    
    document.getElementById("song").innerText = songNames[i];
    document.getElementById("songwriter").innerText = songwriters[i];
    document.getElementById("btnAudPlay").setAttribute("class", "fa fa-pause-circle fa-3x");
  }
}

function playMusic() {
  initProgressBar();
  if (aud.paused) {
    aud.play();
    vid.play();
    document.getElementById("btnAudPlay").setAttribute("class", "fa fa-pause-circle fa-3x");
  } else {
    aud.pause();
    vid.pause();
    document.getElementById("btnAudPlay").setAttribute("class", "fa fa-play-circle fa-3x");
  }
}
function playSound1() {
  sound1.play();
  initProgressBar();
}
function playSound2() {
  sound2.play();
}
function playSound3() {
  sound3.play();
}
function playSound4() {
  sound4.play();
}
function playSound5() {
  sound5.play();
}

function initProgressBar() {
  let len = Math.floor(aud.duration);
  let current_time = aud.currentTime;
  let totalTime = calculateTotalValue(len);
  document.getElementById("endTime").innerHTML = totalTime;
  let currentTime = calculateCurrentValue(current_time);
  document.getElementById("startTime").innerHTML = currentTime;
  const progressbar = document.getElementById("progressbar");
  progressbar.value = aud.currentTime / aud.duration;
  progressbar.addEventListener("click", seek);
  function seek(event) {
    let percent = event.offsetX / this.offsetWidth;
    aud.currentTime = percent * aud.duration;
    progressbar.value = percent / 100;
  }
}

function calculateTotalValue(length) {
  let minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = (seconds_int.toString() == 0 ? "00" : seconds_int.toString()),
    seconds = seconds_str.substring(0, 2),
    time = minutes + ":" + seconds;
  return time;
}

function calculateCurrentValue(currentTime) {
  let current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time =
      (current_minute < 10 ? "0" + current_minute : current_minute) +
      ":" +
      (current_seconds < 10 ? "0" + current_seconds : current_seconds);
  return current_time;
}
