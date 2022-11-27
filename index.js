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
let roundsLeft = roundsNumberValue;

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
  roundsLeft = roundsNumberValue
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
        // restStart()
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
  return new Promise((res, req)=>{
    console.log("Inside Rounds: After Await");
    console.log('Rounds Left: '+ roundsLeft);
    roundsLeft--;
    displayRounds.innerHTML = roundsLeft;
    console.log('Pomodoro time:' + POMODOROTIME);
    pomodoroTimeValue = POMODOROTIME;
    restTimeValue = RESTTIME;
    res()
  })
}

const xyz = async () => {
  for (let i = 1; i <= roundsNumberValue; i++) {
    console.log("Inside Rounds");
    await pomodoroStart()
      .then( async () => {
        console.log("Rest Start");
        await restStart().then(async()=>{
          await reset()
          console.log('Inside reset then()');
        })
        
      })
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
  xyz();
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
