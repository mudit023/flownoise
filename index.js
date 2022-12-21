const pomodoroTime = document.querySelector("#pomodoro-time");
let pomodoroTimeValue = pomodoroTime.value * 60;
const restTime = document.querySelector("#rest-time");
let restTimeValue = restTime.value * 60;
const roundsNumber = document.querySelector("#rounds");
let roundsNumberValue = roundsNumber.value;

const displayPomodoroTime = document.querySelector(".pomodoro-time");
const displayRestTime = document.querySelector(".rest-time");
const displayRounds = document.querySelector(".rounds-left");

let POMODOROTIME = pomodoroTimeValue;
let RESTTIME = restTimeValue;
let ROUNDSLEFT = roundsNumberValue;
let resetFlag = false;

const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".reset-btn");

pomodoroTime.addEventListener("change", (e) => {
  pomodoroTimeValue = e.target.value;
  pomodoroTimeValue = pomodoroTimeValue * 60;
  POMODOROTIME = pomodoroTimeValue;
  // For Testing
  console.log(pomodoroTimeValue);
});
restTime.addEventListener("change", (e) => {
  restTimeValue = e.target.value;
  restTimeValue = restTimeValue * 60;
  RESTTIME = restTimeValue;
  // For Testing
  console.log(restTimeValue);
});
roundsNumber.addEventListener("change", (e) => {
  roundsNumberValue = e.target.value;
  ROUNDSLEFT = roundsNumberValue;
  // For Testing
  console.log(roundsNumberValue);
});

let setTime;
let setRestTime;

function pomodoroStart() {
  // If we want to convert a sync function to async function then, it has to return a promise.
  // The fetch() return promise by default so we don't have to.
  // However in functions which are synchronous by default we have to return the promise explicitly like below👇
  return new Promise((res, rej) => {
    setTime = setInterval(() => {
      let time = "";
      if (pomodoroTimeValue <= 1) {
        clrInterval(setTime);
        // When we return promise explicitly, we also have to resolve/reject it explicilty by calling the resolve/reject function.
        // In this case res() to resolve and rej() to reject the promise.
        // If the promise will not be resolved/rejected, it'll remain in the pending state
        // and any code after this function call will not run.
        res();
      } if(resetFlag){
          clrInterval(setTime);
          return;
        }
      pomodoroTimeValue--;
      if (pomodoroTimeValue / 60 < 10) {
        time = `0${Math.floor(pomodoroTimeValue / 60)}`;
      } else {
        time = `${Math.floor(pomodoroTimeValue / 60)}`;
      }
      if (pomodoroTimeValue % 60 < 10) {
        time = `${time} : 0${pomodoroTimeValue % 60}`;
      } else {
        time = `${time} : ${pomodoroTimeValue % 60}`;
      }
      displayPomodoroTime.innerHTML = time;
    }, 1000);
  });
}

// Rest time functionality
function restStart() {
  return new Promise((res, rej) => {
    setRestTime = setInterval(() => {
      let time = "";
      if (restTimeValue <= 1) {
        clrInterval(setRestTime);
        res();
      } if(resetFlag){
          clrInterval(setRestTime);
          return;
        }
      restTimeValue--;
      if (restTimeValue / 60 < 10) {
        time = `0${Math.floor(restTimeValue / 60)}`;
      } else {
        time = `${Math.floor(restTimeValue / 60)}`;
      }
      if (restTimeValue % 60 < 10) {
        time = `${time} : 0${restTimeValue % 60}`;
      } else {
        time = `${time} : ${restTimeValue % 60}`;
      }
      displayRestTime.innerHTML = time;
    }, 1000);
  });
}

// To reset the pomodoro and restStart functions and values. And to update the rounds
function reset() {
  console.log("Inside Reset: After Await");
  ROUNDSLEFT--;
  displayRounds.innerHTML = ROUNDSLEFT;
  console.log("Pomodoro time:" + POMODOROTIME);
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  console.log("Rounds Left: " + ROUNDSLEFT);
}

// The function that will run all the other functions
const mainFunction = async () => {
  for (let i = 1; i <= roundsNumberValue; i++) {
    // For testing
    console.log("Inside Main Function: Rounds");
    await pomodoroStart();
    await restStart();
    reset();
  }
  document.querySelector('.on-complete').classList.add('active');
  document.querySelector(".display").classList.remove("active");
  document.querySelector(".form").classList.remove("disable");
};

// Function to clear pomodoro and restStart setIntervals
function clrInterval(interval) {
  clearInterval(interval);
  // For testing
  console.log("Inside clr interval");
}

// Start button functionality
const startHandler = () => {
  document.querySelector(".display").classList.add("active");
  document.querySelector(".form").classList.add("disable");
  document.querySelector('.on-complete').classList.remove('active');
  resetFlag = false;
  displayPomodoroTime.innerHTML = `${Math.floor(pomodoroTimeValue / 60)} : ${
    pomodoroTimeValue % 60
  }`;
  displayRestTime.innerHTML = `${Math.floor(restTimeValue / 60)} : ${
    restTimeValue % 60
  }`;
  displayRounds.innerHTML = roundsNumberValue;
  mainFunction();
};

// Reset Functionality
const resetHandler = () => {
  document.querySelector(".display").classList.remove("active");
  document.querySelector(".form").classList.remove("disable");
  resetFlag = true;
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  ROUNDSLEFT = roundsNumberValue;
};
startButton.addEventListener("click", startHandler);
resetButton.addEventListener("click", resetHandler);
