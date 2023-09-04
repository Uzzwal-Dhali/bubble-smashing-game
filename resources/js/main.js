var timer = 60;
var score = 0;
var targetNum = 0;
let suggested = document.querySelector("#target");

var audio = document.getElementById("audio");
var ohNo = document.getElementById("ohNo");
var gameOver = document.getElementById("gameOver");

window.onload = () => {
  audio.play();
}

// Increase score to 10 while right clicked
function increaseScore() {
  audio.play();
  score += 10;
  document.querySelector("#score").innerHTML = score;
}

// Set the targeted Clik
function target() {
  targetNum = Math.floor(Math.random() * 10);
  suggested.innerHTML = targetNum;
  suggested.classList.add("hit")
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
      document.querySelector('#body').innerHTML = `
      <div class='message'>
        <div class="over">Game Over</div>
        <div id="startNew">Start New</div>
      </div>
      `; // Setting game over message and start new button
      document.querySelector("#target").innerHTML = 0; // setting target value to zero

      // if clicked to startNew button
      document.querySelector('#startNew').addEventListener("click", function() {
        document.querySelector("#timer").textContent = 30;
        createBubbles();
        target();
        timer = 60;
        runTimer();
      });
    }
  }, 1000)
}

document.querySelector('#body').addEventListener("click", function(details) {
  var clicked = Number(details.target.textContent);
  if(targetNum === clicked) {
    increaseScore();
    createBubbles();
    target();
  } else {
    ohNo.play();
  }
});

target()
runTimer()
createBubbles()
