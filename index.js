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

// Sounds Path
const nextRoundSound = "./Assests/sounds/next-round.mp3";
const finalRoundSound = "./Assests/sounds/final-round.mp3";
const taskDoneSound = "./Assests/sounds/task-done.mp3";
const restStartSound = "./Assests/sounds/rest-start.mp3";
const successSound = "./Assests/sounds/success.mp3";

const keyboardSoundPath = "./Assests/sounds/bgSounds/keyboard-white-noise.mp3";
const windSoundPath = "./Assests/sounds/bgSounds/wind-white-noise.mp3";
const forestSoundPath = "./Assests/sounds/bgSounds/forest-white-noise.mp3";
const publicPlaceSoundPath =
  "./Assests/sounds/bgSounds/public-place-white-noise.mp3";
const underwaterSoundPath = "./Assests/sounds/bgSounds/underwater-white-noise.mp3";
const staticSoundPath = "./Assests/sounds/bgSounds/static-white-noise.mp3";

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

// setInterval IDs
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
        playSound(restStartSound);
        clrInterval(setTime);
        // When we return promise explicitly, we also have to resolve/reject it explicilty by calling the resolve/reject function.
        // In this case res() to resolve and rej() to reject the promise.
        // If the promise will not be resolved/rejected, it'll remain in the pending state
        // and any code after this function call will not run.
        res();
      }
      if (resetFlag) {
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
      }
      if (resetFlag) {
        clrInterval(setRestTime);
        return;
      }
      if (restTimeValue == 10 && roundsNumberValue > 1) {
        notificationGenerator("Next Round in 10s, be ready!");
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
  roundsNumberValue--;
  if (roundsNumberValue > 1) {
    playSound(nextRoundSound);
  }
  if (roundsNumberValue === 1) {
    playSound(finalRoundSound);
  }
  displayRounds.innerHTML = roundsNumberValue;
  console.log("Pomodoro time:" + POMODOROTIME);
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  console.log("Rounds Left: " + roundsNumberValue);
}

// The function that will run all the other functions
const mainFunction = async () => {
  for (let i = 1; i <= ROUNDSLEFT; i++) {
    // For testing
    console.log("Inside Main Function: Rounds");
    await pomodoroStart();
    await restStart();
    reset();
  }
  playSound(taskDoneSound);
  notificationGenerator("You did it! You deserve a break.");
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  roundsNumberValue = ROUNDSLEFT;
  document.querySelector(".on-complete").classList.add("active");
  document.querySelector(".display").classList.remove("active");
  document.querySelector(".form").classList.remove("disable");
};

// Function to clear pomodoro and restStart setIntervals
function clrInterval(interval) {
  clearInterval(interval);
  // For testing
  console.log("Inside clr interval");
}

// ******************** Sounds ***********************
const playSound = (soundPath) => {
  let sound = new Audio(soundPath);
  sound.play();
};

// Background Sounds
const keyboardBtn = document.querySelector(".keyboard");
const windBtn = document.querySelector(".wind");
const underwaterBtn = document.querySelector(".underwater");
const forestBtn = document.querySelector(".forest");
const staticBtn = document.querySelector(".radio-static");
const publicPlaceBtn = document.querySelector(".public-place");

const keyboardVolumeBtn = document.querySelector("#keyboard");
const windVolumeBtn = document.querySelector("#wind");
const underwaterVolumeBtn = document.querySelector("#underwater");
const forestVolumeBtn = document.querySelector("#forest");
const staticVolumeBtn = document.querySelector("#radio-static");
const publicPlaceVolumeBtn = document.querySelector("#public-place");

const keyboardSound = new Audio(keyboardSoundPath);
const windSound = new Audio(windSoundPath);
const underwaterSound = new Audio(underwaterSoundPath);
const forestSound = new Audio(forestSoundPath);
const publicPlaceSound = new Audio(publicPlaceSoundPath);
const staticSound = new Audio(staticSoundPath);

const playPauseBgSound = (ele, audioObj) => {
  if(audioObj.paused===true){
    audioObj.play();
    audioObj.volume = 0.3;
    audioObj.loop = true;
    ele.classList.add("active");
    console.log('inside play');
  } else {
      audioObj.pause();
      ele.classList.remove("active");
      console.log('inside pause');
  }
};

const chnageVolume = (ele, audioObj) =>{
  audioObj.volume = ele.value;
}

keyboardBtn.addEventListener("click", ()=>{
  playPauseBgSound(keyboardBtn, keyboardSound);
});
windBtn.addEventListener("click", ()=>{
  playPauseBgSound(windBtn, windSound);
});
forestBtn.addEventListener("click", ()=>{
  playPauseBgSound(forestBtn, forestSound);
});
underwaterBtn.addEventListener("click", ()=>{
  playPauseBgSound(underwaterBtn, underwaterSound);
});
staticBtn.addEventListener("click", ()=>{
  playPauseBgSound(staticBtn, staticSound);
});
publicPlaceBtn.addEventListener("click", ()=>{
  playPauseBgSound(publicPlaceBtn, publicPlaceSound);
});

// Volume Controller
keyboardVolumeBtn.addEventListener('change', ()=>{
  chnageVolume(keyboardVolumeBtn, keyboardSound)
})
windVolumeBtn.addEventListener('change', ()=>{
  chnageVolume(windVolumeBtn, windSound)
})
underwaterVolumeBtn.addEventListener('change', ()=>{
  chnageVolume(underwaterVolumeBtn, underwaterSound)
})
forestVolumeBtn.addEventListener('change', ()=>{
  chnageVolume(forestVolumeBtn, forestSound)
})
staticVolumeBtn.addEventListener('change', ()=>{
  chnageVolume(staticVolumeBtn, staticSound)
})
publicPlaceVolumeBtn.addEventListener('change', ()=>{
  chnageVolume(publicPlaceVolumeBtn, publicPlaceSound)
})

// *********************** Notification *******************************
const notificationGenerator = (title) => {
  const logo = "./Assests/efficiency.png";
  const notification = new Notification("Do It Now", {
    body: title,
    icon: logo,
  });
};

// Reset Functionality
const resetHandler = () => {
  document.querySelector(".display").classList.remove("active");
  document.querySelector(".form").classList.remove("disable");
  resetFlag = true;
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  roundsNumberValue = ROUNDSLEFT;
};

// Start button functionality
const startHandler = () => {
  document.querySelector(".display").classList.add("active");
  document.querySelector(".form").classList.add("disable");
  document.querySelector(".on-complete").classList.remove("active");
  resetFlag = false;
  displayPomodoroTime.innerHTML = `${Math.floor(pomodoroTimeValue / 60)} : ${
    pomodoroTimeValue % 60
  }`;
  displayRestTime.innerHTML = `${Math.floor(restTimeValue / 60)} : ${
    restTimeValue % 60
  }`;
  displayRounds.innerHTML = roundsNumberValue;

  Notification.requestPermission().then((result) => {
    console.log(result);
  });
  mainFunction();
};

startButton.addEventListener("click", startHandler);
resetButton.addEventListener("click", resetHandler);