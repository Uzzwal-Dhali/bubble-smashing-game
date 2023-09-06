var timer = 10;
var score = 0;
var targetNum = 0;
let suggested = document.querySelector("#target");

var audio = document.getElementById("audio");
var ohNo = document.getElementById("ohNo");
var gameOver = document.getElementById("gameOver");

window.onload = () => {
  setTarget();
  runTimer();
  createBubbles();
  main();
}

function main() {

}

if(timer === 0) {
    document.getElementById("reset").addEventListener('click', function() {
      alert('Ok');
    });
  }

// Increase score to 10 while right clicked
function increaseScore() {
  audio.play();
  score += 10;
  document.querySelector("#score").innerHTML = score;
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
      document.querySelector('#body').innerHTML = `
      <div class='message'>
        <div class="over">Game Over</div>
        <div class="buttons_wrapper">
          <div id="startNew">Start New</div>
          <div id="reset">
            <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="matrix(0 1 1 0 2.5 2.5)"> <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"></path> <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"></path> </g> </g></svg>
          </div>
        </div>
      </div>
      `; // Setting game over message and start new button
      document.querySelector("#target").innerHTML = 0; // setting target value to zero

      // if clicked to startNew button
      document.querySelector('#startNew').addEventListener("click", function() {
        document.querySelector("#timer").textContent = 60;
        createBubbles();
        setTarget();
        timer = 10;
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
    setTarget();
  } else {
    ohNo.play();
  }
});
