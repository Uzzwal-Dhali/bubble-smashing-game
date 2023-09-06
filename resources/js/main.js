var timer = 60;
var score = 0;
var targetNum = 0;
let suggested = document.querySelector("#target");
let currentScore = document.querySelector("#score");

var audio = document.getElementById("audio");
var ohNo = document.getElementById("ohNo");
var gameOver = document.getElementById("gameOver");

let bubblesWrapper = document.getElementById('body');
let gameOverMsg = document.querySelector('.message');

window.onload = () => {
  setTarget();
  runTimer();
  createBubbles();
  main();
}

function main() {

}

document.getElementById("reset").addEventListener('click', function() {
  currentScore.innerHTML = 0;
  bubblesWrapper.classList.remove('hide');
  gameOverMsg.classList.remove('show');
  document.querySelector("#timer").textContent = 60;
  score = 0;
  createBubbles();
  setTarget();
  timer = 60;
  runTimer();
});

// Increase score to 10 while right clicked
function increaseScore() {
  audio.play();
  score += 10;
  currentScore.innerHTML = score;
}

// Creating bubbles
function createBubbles() {
  var bubbles = "";
  for(var i = 1; i<=50; i++) {
    var num = Math.floor(Math.random() * 10)
    bubbles += `
      <figure class="ball bubble"><text>${num}</text></figure>
    `;
  };
  document.getElementById("body").innerHTML = bubbles
}

// Set the targeted Clik
function setTarget() {
  targetNum = Math.floor(Math.random() * 10);
  suggested.innerHTML = targetNum;
  suggested.classList.add("hit")
}

// decreasing time
function runTimer() {
  var timerInterval = setInterval(function() {
    if(timer > 0) {
      timer--;
      document.querySelector("#timer").textContent = timer;
    } else {
      clearInterval(timerInterval); // Clearing interval time so that it can't be negative like -1, -10
      gameOver.play();
      suggested.classList.remove("hit");
      bubblesWrapper.classList.add('hide');
      gameOverMsg.classList.add('show');
      document.querySelector("#target").innerHTML = 0; // setting target value to zero
    }
  }, 1000)
}

// if clicked to startNew button
document.querySelector('#startNew').addEventListener("click", function() {
  bubblesWrapper.classList.remove('hide');
  gameOverMsg.classList.remove('show');
  document.querySelector("#timer").textContent = 60;
  createBubbles();
  setTarget();
  timer = 60;
  runTimer();
});

document.querySelector('#body').addEventListener("click", function(details) {
  var clicked = Number(details.target.textContent);
  if(targetNum === clicked) {
    increaseScore();
    createBubbles();
    setTarget();
  } else {
    ohNo.play();
  }
});
