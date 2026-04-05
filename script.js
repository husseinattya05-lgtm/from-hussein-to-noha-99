const video = document.getElementById("video");
const image = document.getElementById("image");
const music = document.getElementById("music");
const notif = document.getElementById("notif");
const monthText = document.getElementById("monthText");
const text = document.getElementById("text");
const startBtn = document.getElementById("startBtn");

let images = [];
const months = [4,5,6,7,8,9,10,11,12,1,2,3];

months.forEach(month => {
  for(let i = 1; i <= 20; i++){
    images.push(`${i}-${month}.jpg`);
  }
});

let index = 0;

const monthNames = {
  4:"April 2025",
  5:"May 2025",
  6:"June 2025",
  7:"July 2025",
  8:"August 2025",
  9:"September 2025",
  10:"October 2025",
  11:"November 2025",
  12:"December 2025",
  1:"January 2026",
  2:"February 2026",
  3:"March 2026"
};

function getSpeed(){
  if(index < 10) return 1200;
  if(index < 40) return 250;
  return 120;
}

function showEnding(){

  image.src = "images/final.jpg";
  image.classList.add("show");

  monthText.innerText = "";

  const lines = [
    "NOHA… it was all worth it 🤍",
    "and I’d do it all over again 🤍",
    "still feels like it all just started…"
  ];

  let i = 0;

  function showLine(){
    if(i >= lines.length) return;

    text.innerText = lines[i];
    text.style.opacity = 1;

    setTimeout(() => {
      text.style.opacity = 0;
      setTimeout(() => {
        i++;
        showLine();
      }, 800);
    }, 3000);
  }

  setTimeout(showLine, 1500);
}

function showImage(){

  if(index >= images.length){
    showEnding();
    return;
  }

  const path = "images/" + images[index];

  image.classList.remove("show");

  setTimeout(() => {

    image.src = path;
    image.classList.add("show");

    const file = images[index].split(".")[0];
    const month = file.split("-")[1];

    monthText.innerText = monthNames[month] || "";

    notif.currentTime = 0;
    notif.play().catch(()=>{});

    index++;
    setTimeout(showImage, getSpeed());

  }, 100);
}

function start(){
  video.play().catch(()=>{});
  music.play().catch(()=>{});
  showImage();
}

startBtn.onclick = () => {
  startBtn.style.display = "none";
  start();
};