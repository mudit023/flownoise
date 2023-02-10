const pomodoroTime = document.querySelector("#pomodoro-time");
let pomodoroTimeValue = pomodoroTime.value * 60;
const restTime = document.querySelector("#rest-time");
let restTimeValue = restTime.value * 60;
const roundsNumber = document.querySelector("#rounds");
let roundsNumberValue = roundsNumber.value;

const displayPomodoroTime = document.querySelector(".pomodoro-time");
const displayRestTime = document.querySelector(".rest-time");
const displayRounds = document.querySelector(".rounds-left");
const displayTitle = document.querySelector("#title");

let POMODOROTIME = pomodoroTimeValue;
let RESTTIME = restTimeValue;
let ROUNDSLEFT = roundsNumberValue;
let resetFlag = false;
let muteSoundFlag = false;

// Sounds Path
const nextRoundSound = "./Assets/sounds/next-round.mp3";
const finalRoundSound = "./Assets/sounds/final-round.mp3";
const taskDoneSound = "./Assets/sounds/task-done.mp3";
const restStartSound = "./Assets/sounds/rest-start.mp3";
const bodyCareSound = "./Assets/sounds/body-care.mp3";

const keyboardSoundPath = "./Assets/sounds/bgSounds/keyboard-white-noise.mp3";
const windSoundPath = "./Assets/sounds/bgSounds/wind-white-noise.mp3";
const forestSoundPath = "./Assets/sounds/bgSounds/forest-white-noise.mp3";
const publicPlaceSoundPath =
  "./Assets/sounds/bgSounds/public-place-white-noise.mp3";
const fireSoundPath = "./Assets/sounds/bgSounds/fire-white-noise.mp3";
const staticSoundPath = "./Assets/sounds/bgSounds/static-white-noise.mp3";

const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".reset-btn");

pomodoroTime.addEventListener("change", (e) => {
  pomodoroTimeValue = e.target.value;
  pomodoroTimeValue = pomodoroTimeValue * 60;
  POMODOROTIME = pomodoroTimeValue;
});
restTime.addEventListener("change", (e) => {
  restTimeValue = e.target.value;
  restTimeValue = restTimeValue * 60;
  RESTTIME = restTimeValue;
});
roundsNumber.addEventListener("change", (e) => {
  roundsNumberValue = e.target.value;
  ROUNDSLEFT = roundsNumberValue;
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
        playBodyCareSound();
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
      displayTitle.innerHTML = "In Flow: Flownoise";
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
      displayTitle.innerHTML = "Recharging: Flownoise";
    }, 1000);
  });
}

// To reset the pomodoro and restStart functions and values. And to update the rounds
function reset() {
  roundsNumberValue--;
  if (roundsNumberValue > 1) {
    playSound(nextRoundSound);
  }
  if (roundsNumberValue === 1) {
    playSound(finalRoundSound);
  }
  displayTitle.innerHTML = "Flownoise";
  displayRounds.innerHTML = roundsNumberValue;
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
}

// The function that will run all the other functions
const mainFunction = async () => {
  for (let i = 1; i <= ROUNDSLEFT; i++) {
    await pomodoroStart();
    if (roundsNumberValue > 1) {
      await restStart();
      reset();
    } else {
      reset();
    }
  }
  displayTitle.innerHTML = "Flownoise";
  playSound(taskDoneSound);
  notificationGenerator("You did it! You deserve a break.");
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  roundsNumberValue = ROUNDSLEFT;
  document.querySelector(".on-complete").classList.add("flex");
  document.querySelector(".on-complete").classList.remove("hidden");
  document.querySelector(".display").classList.remove("felx");
  document.querySelector(".display").classList.add("hidden");
  document.querySelector(".form").classList.remove("hidden");
  document.querySelector(".form").classList.add("flex");
};

// Function to clear pomodoro and restStart setIntervals
function clrInterval(interval) {
  clearInterval(interval);
}

// ******************** Sounds ***********************
const playSound = (soundPath) => {
  let sound = new Audio(soundPath);
  sound.play();
  sound.volume = 0.7;
};

const playBodyCareSound = () => {
  if (roundsNumberValue > 1) {
    if (POMODOROTIME > 1500 || ROUNDSLEFT > 2) {
      playSound(restStartSound);
      setTimeout(() => {
        playSound(bodyCareSound);
      }, 5000);
    } else {
      playSound(restStartSound);
    }
  }
};

// Background Sounds
const keyboardBtn = document.querySelector(".keyboard");
const windBtn = document.querySelector(".wind");
const fireBtn = document.querySelector(".fire");
const forestBtn = document.querySelector(".forest");
const staticBtn = document.querySelector(".radio-static");
const publicPlaceBtn = document.querySelector(".public-place");

// Volume Controllers
const keyboardVolumeBtn = document.querySelector("#keyboard");
const windVolumeBtn = document.querySelector("#wind");
const fireVolumeBtn = document.querySelector("#fire");
const forestVolumeBtn = document.querySelector("#forest");
const staticVolumeBtn = document.querySelector("#radio-static");
const publicPlaceVolumeBtn = document.querySelector("#public-place");

// Audio Objects
const keyboardSound = new Audio(keyboardSoundPath);
const windSound = new Audio(windSoundPath);
const fireSound = new Audio(fireSoundPath);
const forestSound = new Audio(forestSoundPath);
const publicPlaceSound = new Audio(publicPlaceSoundPath);
const staticSound = new Audio(staticSoundPath);

// BG sound play-pause function
const playPauseBgSound = (ele, audioObj) => {
  if (audioObj.paused === true) {
    audioObj.play();
    audioObj.volume = 0.3;
    audioObj.loop = true;
    ele.classList.add("dark:border");
    ele.classList.add("dark:bg-slate-800");
    ele.classList.add("dark:border-slate-100");
    ele.classList.add("border");
    ele.classList.add("border-orange-900");
    ele.classList.add("bg-orange-100");
  } else {
    audioObj.pause();
    ele.classList.remove("dark:border");
    ele.classList.remove("dark:bg-slate-800");
    ele.classList.remove("dark:border-slate-100");
    ele.classList.remove("border");
    ele.classList.remove("border-orange-900");
    ele.classList.remove("bg-orange-100");
  }
};

// Volume change function
const chnageVolume = (ele, audioObj) => {
  audioObj.volume = ele.value;
};

// Mute
const muteMessage = document.querySelector(".mute-message");
const muteSound = (audioObj) => {
  muteMessage.classList.add("flex");
  muteMessage.classList.remove("hidden");
  audioObj.muted = true;
};
const unmuteSound = (audioObj) => {
  muteMessage.classList.add("hidden");
  muteMessage.classList.remove("flex");
  audioObj.muted = false;
};
const muteHandler = () => {
  if (!muteSoundFlag) {
    muteSound(keyboardSound);
    muteSound(windSound);
    muteSound(fireSound);
    muteSound(forestSound);
    muteSound(staticSound);
    muteSound(publicPlaceSound);
    muteSoundFlag = true;
  } else {
    unmuteSound(keyboardSound);
    unmuteSound(windSound);
    unmuteSound(fireSound);
    unmuteSound(forestSound);
    unmuteSound(staticSound);
    unmuteSound(publicPlaceSound);
    muteSoundFlag = false;
  }
};

// BG sounds buttons
keyboardBtn.addEventListener("click", () => {
  playPauseBgSound(keyboardBtn, keyboardSound);
});
windBtn.addEventListener("click", () => {
  playPauseBgSound(windBtn, windSound);
});
forestBtn.addEventListener("click", () => {
  playPauseBgSound(forestBtn, forestSound);
});
fireBtn.addEventListener("click", () => {
  playPauseBgSound(fireBtn, fireSound);
});
staticBtn.addEventListener("click", () => {
  playPauseBgSound(staticBtn, staticSound);
});
publicPlaceBtn.addEventListener("click", () => {
  playPauseBgSound(publicPlaceBtn, publicPlaceSound);
});

// Volume Controller
keyboardVolumeBtn.addEventListener("change", () => {
  chnageVolume(keyboardVolumeBtn, keyboardSound);
});
windVolumeBtn.addEventListener("change", () => {
  chnageVolume(windVolumeBtn, windSound);
});
fireVolumeBtn.addEventListener("change", () => {
  chnageVolume(fireVolumeBtn, fireSound);
});
forestVolumeBtn.addEventListener("change", () => {
  chnageVolume(forestVolumeBtn, forestSound);
});
staticVolumeBtn.addEventListener("change", () => {
  chnageVolume(staticVolumeBtn, staticSound);
});
publicPlaceVolumeBtn.addEventListener("change", () => {
  chnageVolume(publicPlaceVolumeBtn, publicPlaceSound);
});

// *********************** Notification *******************************
const notificationGenerator = (title) => {
  const logo = "./Assets/efficiency.png";
  const notification = new Notification("Flownoise", {
    body: title,
    icon: logo,
  });
};

// Reset Functionality
const resetHandler = () => {
  document.querySelector(".display").classList.remove("flex");
  document.querySelector(".display").classList.add("hidden");
  document.querySelector(".form").classList.remove("hidden");
  document.querySelector(".form").classList.add("flex");
  document.querySelector(".on-complete").classList.add("hidden");
  resetFlag = true;
  pomodoroTimeValue = POMODOROTIME;
  restTimeValue = RESTTIME;
  roundsNumberValue = ROUNDSLEFT;
  displayTitle.innerHTML = "Flownoise";
};

// Start button functionality
const startHandler = () => {
  document.querySelector(".display").classList.add("flex");
  document.querySelector(".display").classList.remove("hidden");
  document.querySelector(".form").classList.add("hidden");
  document.querySelector(".on-complete").classList.add("hidden");
  // document.querySelector(".on-complete").classList.remove("active");
  resetFlag = false;
  displayPomodoroTime.innerHTML = `${Math.floor(pomodoroTimeValue / 60)} : ${
    pomodoroTimeValue % 60
  }`;
  displayRestTime.innerHTML = `${Math.floor(restTimeValue / 60)} : ${
    restTimeValue % 60
  }`;
  displayRounds.innerHTML = roundsNumberValue;

  Notification.requestPermission().then((result) => {});
  mainFunction();
};

startButton.addEventListener("click", startHandler);
resetButton.addEventListener("click", resetHandler);
window.addEventListener("keypress", (e) => {
  if (e.key === "m") {
    muteHandler();
  }
});
