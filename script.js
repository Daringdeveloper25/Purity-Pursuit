// script.js
const bucket = document.getElementById("bucket");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const timeDisplay = document.getElementById("time");

let score = 0;
let level = 1;
let time = 60;
let gameInterval;
let dropletInterval;

function moveBucket(e) {
  const areaWidth = gameArea.clientWidth;
  const bucketWidth = bucket.offsetWidth;
  let x;

  if (e.type === "mousemove") {
    x = e.clientX - bucketWidth / 2;
  } else if (e.type === "touchmove") {
    x = e.touches[0].clientX - bucketWidth / 2;
  }

  x = Math.max(0, Math.min(x, areaWidth - bucketWidth));
  bucket.style.left = `${x}px`;
}

function spawnDroplet() {
  const droplet = document.createElement("div");
  droplet.classList.add("droplet");

  const isClean = Math.random() > 0.4;
  droplet.classList.add(isClean ? "clean" : "dirty");

  droplet.style.left = `${Math.random() * (gameArea.clientWidth - 20)}px`;
  droplet.style.top = "-30px";
  gameArea.appendChild(droplet);

  let y = -30;
  const fall = setInterval(() => {
    y += 4 + level;
    droplet.style.top = `${y}px`;

    const dropletRect = droplet.getBoundingClientRect();
    const bucketRect = bucket.getBoundingClientRect();

    if (
      dropletRect.bottom >= bucketRect.top &&
      dropletRect.left < bucketRect.right &&
      dropletRect.right > bucketRect.left
    ) {
      if (droplet.classList.contains("clean")) {
        score += 10;
      } else {
        score -= 5;
      }
      scoreDisplay.textContent = score;
      droplet.remove();
      clearInterval(fall);
    } else if (y > gameArea.clientHeight) {
      droplet.remove();
      clearInterval(fall);
    }
  }, 30);
}

function updateTime() {
  time--;
  timeDisplay.textContent = time;
  if (time <= 0) {
    clearInterval(gameInterval);
    clearInterval(dropletInterval);
    alert("Time's up! Final Score: " + score);
  } else if (score >= 100 * level && level < 3) {
    level++;
    levelDisplay.textContent = level;
  }
}

function startGame() {
  gameInterval = setInterval(updateTime, 1000);
  dropletInterval = setInterval(spawnDroplet, 800);
}

window.addEventListener("mousemove", moveBucket);
window.addEventListener("touchmove", moveBucket);

window.onload = startGame;
