// script.js
const bucket = document.getElementById("bucket");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const timeDisplay = document.getElementById("time");

// Title screen elements
const titleScreen = document.getElementById("title-screen");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

const successScreen = document.getElementById("success-screen");
const failScreen = document.getElementById("fail-screen");
const successResetBtn = document.getElementById("success-reset-btn");
const failResetBtn = document.getElementById("fail-reset-btn");
const goalPointsDisplay = document.getElementById("goal-points");

const quitBtn = document.getElementById("quit-btn");
const successQuitBtn = document.getElementById("success-quit-btn");
const failQuitBtn = document.getElementById("fail-quit-btn");
const titleQuitBtn = document.getElementById("title-quit-btn");

let score = 0;
let level = 1;
let time = 30;
let gameInterval;
let dropletInterval;
let goalPoints = 50;

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
      checkGoal();
      droplet.remove();
      clearInterval(fall);
    } else if (y > gameArea.clientHeight) {
      droplet.remove();
      clearInterval(fall);
    }
  }, 30);
}

function checkGoal() {
  // No longer ends the game immediately when reaching the goal
}

function updateTime() {
  time--;
  timeDisplay.textContent = time;
  if (time <= 0) {
    clearInterval(gameInterval);
    clearInterval(dropletInterval);
    if (score >= goalPoints) {
      if (successScreen) successScreen.style.display = "flex";
    } else {
      if (failScreen) failScreen.style.display = "flex";
    }
  }
}

function startGame() {
  // Hide overlays
  if (titleScreen) titleScreen.style.display = "none";
  if (successScreen) successScreen.style.display = "none";
  if (failScreen) failScreen.style.display = "none";
  // Reset game state
  score = 0;
  level = 1;
  time = 30;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  timeDisplay.textContent = time;
  goalPointsDisplay.textContent = `Goal: ${goalPoints}`;
  // Remove all droplets
  const droplets = document.querySelectorAll('.droplet');
  droplets.forEach(droplet => droplet.remove());
  // Start game loops
  gameInterval = setInterval(updateTime, 1000);
  dropletInterval = setInterval(spawnDroplet, 800);
}

function resetGame() {
  // Hide overlays
  if (titleScreen) titleScreen.style.display = "none";
  if (successScreen) successScreen.style.display = "none";
  if (failScreen) failScreen.style.display = "none";
  // Reset game state
  score = 0;
  level = 1;
  time = 30;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  timeDisplay.textContent = time;
  goalPointsDisplay.textContent = `Goal: ${goalPoints}`;
  // Remove all droplets
  const droplets = document.querySelectorAll('.droplet');
  droplets.forEach(droplet => droplet.remove());
  // Restart game loops
  clearInterval(gameInterval);
  clearInterval(dropletInterval);
  gameInterval = setInterval(updateTime, 1000);
  dropletInterval = setInterval(spawnDroplet, 800);
}

function quitToTitle() {
  // Hide overlays and game area, show title screen
  if (titleScreen) titleScreen.style.display = "flex";
  if (successScreen) successScreen.style.display = "none";
  if (failScreen) failScreen.style.display = "none";
  // Reset game state
  score = 0;
  level = 1;
  time = 30;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  timeDisplay.textContent = time;
  goalPointsDisplay.textContent = `Goal: ${goalPoints}`;
  // Remove all droplets
  const droplets = document.querySelectorAll('.droplet');
  droplets.forEach(droplet => droplet.remove());
  // Stop intervals
  clearInterval(gameInterval);
  clearInterval(dropletInterval);
}

window.addEventListener("mousemove", moveBucket);
window.addEventListener("touchmove", moveBucket);

if (startBtn) {
  startBtn.addEventListener("click", startGame);
  startBtn.addEventListener("click", () => {
    window.addEventListener("mousemove", moveBucket);
    window.addEventListener("touchmove", moveBucket);
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetGame);
}
if (successResetBtn) {
  successResetBtn.addEventListener("click", resetGame);
}
if (failResetBtn) {
  failResetBtn.addEventListener("click", resetGame);
}
if (quitBtn) {
  quitBtn.addEventListener("click", quitToTitle);
}
if (successQuitBtn) {
  successQuitBtn.addEventListener("click", quitToTitle);
}
if (failQuitBtn) {
  failQuitBtn.addEventListener("click", quitToTitle);
}
if (titleQuitBtn) {
  titleQuitBtn.addEventListener("click", quitToTitle);
}
