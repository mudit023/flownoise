// TO-DO
//  1. Add rounds functionality

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

const startButton = document.querySelector(".start-btn");

pomodoroTime.addEventListener("change", (e) => {
  pomodoroTimeValue = e.target.value;
  pomodoroTimeValue = pomodoroTimeValue * 60;
  POMODOROTIME = pomodoroTimeValue
  console.log(pomodoroTimeValue);
});
restTime.addEventListener("change", (e) => {
  restTimeValue = e.target.value;
  restTimeValue = restTimeValue * 60;
  RESTTIME = restTimeValue
  console.log(restTimeValue);
});
roundsNumber.addEventListener("change", (e) => {
  roundsNumberValue = e.target.value;
  ROUNDSLEFT = roundsNumberValue
  console.log(roundsNumberValue);
});

let setTime;
let setRestTime;



function pomodoroStart() {
  return new Promise((res, rej) => {
    setTime = setInterval(() => {
      let time = "";
      if (pomodoroTimeValue <= 1) {
        clrInterval(setTime);
        res();
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

function restStart() {
  return new Promise((res, rej)=>{
    setRestTime = setInterval(() => {
      let time = "";
      if (restTimeValue <= 1) {
        clrInterval(setRestTime);
        res()
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
    }, 1000)
  })
}

function reset(){
  // If we want to convert a sync function to async function then, it has to return a promise.
  // The fetch() return promise by default so we don't have to.
  // However in functions which are synchronous by default we have to return the promise explicitly like below👇
  return new Promise((res, req)=>{
    console.log("Inside Rounds: After Await");
    console.log('Rounds Left: '+ ROUNDSLEFT);
    ROUNDSLEFT--;
    displayRounds.innerHTML = ROUNDSLEFT;
    console.log('Pomodoro time:' + POMODOROTIME);
    pomodoroTimeValue = POMODOROTIME;
    restTimeValue = RESTTIME;
    // When we return promise explicitly, we also have to resolve/reject it explicilty by calling the resolve/reject function.
    // In this case res() to resolve and rej() to reject the promise. 
    // If the promise will not be resolved/rejected, it'll remain in the pending state 
    // and any code after this function call will not run.
    res()
  })
}

const mainFunction = async () => {
  for (let i = 1; i <= roundsNumberValue; i++) {
    console.log("Inside Rounds");
    await pomodoroStart()
    await restStart()
    await reset()
  }
};

function clrInterval(interval) {
  clearInterval(interval);
  console.log("Inside clr interval");
}

const startHandler = () => {
  document.querySelector(".display").classList.add("active");
  displayPomodoroTime.innerHTML = `${Math.floor(pomodoroTimeValue / 60)} : ${
    pomodoroTimeValue % 60
  }`;
  displayRestTime.innerHTML = `${Math.floor(restTimeValue / 60)} : ${
    restTimeValue % 60
  }`;
  displayRounds.innerHTML = roundsNumberValue;
  // pomodoroStart()
  mainFunction();
  // () => {
  //   console.log('Inside pomodoro callback');
  //   if(roundsNumberValue>1){
  //     pomodoroStart()
  //     roundsNumberValue--
  //     console.log('rounds: '+roundsNumberValue);
  //     displayRounds.innerHTML = roundsNumberValue
  //   }
  // }
};

startButton.addEventListener("click", startHandler);
