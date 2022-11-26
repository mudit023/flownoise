// TO-DO
//  1. Add rounds functionality

const pomodoroTime = document.querySelector('#pomodoro-time')
let pomodoroTimeValue = pomodoroTime.value*60
const restTime = document.querySelector('#rest-time')
let restTimeValue = restTime.value*60
const roundsNumber = document.querySelector('#rounds')
let roundsNumberValue = roundsNumber.value

const displayPomodoroTime = document.querySelector('.pomodoro-time')
const displayRestTime = document.querySelector('.rest-time')
const displayRounds = document.querySelector('.rounds-left')

const startButton = document.querySelector('.start-btn')


pomodoroTime.addEventListener('change', (e)=>{
  pomodoroTimeValue = e.target.value
  pomodoroTimeValue = pomodoroTimeValue*60 
  console.log(pomodoroTimeValue);
})
restTime.addEventListener('change', (e)=>{
  restTimeValue = e.target.value
  restTimeValue = restTimeValue*60
  console.log(restTimeValue);
})
roundsNumber.addEventListener('change', (e)=>{
  roundsNumberValue = e.target.value
  console.log(roundsNumberValue);
})
let roundsLeft = roundsNumberValue
let setTime;
let setRestTime;


function pomodoroStart(){
  setTime = setInterval(()=>{
    let time = ''
    if(pomodoroTimeValue<=1){
      clrInterval(setTime)
      restStart()
    }
    pomodoroTimeValue--
    if(pomodoroTimeValue/60<10){
      time = `0${Math.floor(pomodoroTimeValue/60)}`
    } else{
      time = `${Math.floor(pomodoroTimeValue/60)}`
    }
    if(pomodoroTimeValue%60<10){
      time = `${time} : 0${pomodoroTimeValue%60}` 
    } else{
      time = `${time} : ${pomodoroTimeValue%60}` 
    }
    displayPomodoroTime.innerHTML = time
  }, 1000)
}

function restStart(){
  setRestTime = setInterval(()=>{
    let time = ''
    if(restTimeValue<=1){
      clrInterval(setRestTime)
    }
    restTimeValue--
    if(restTimeValue/60<10){
      time = `0${Math.floor(restTimeValue/60)}`
    } else{
      time = `${Math.floor(restTimeValue/60)}`
    }
    if(restTimeValue%60<10){
      time = `${time} : 0${restTimeValue%60}` 
    } else{
      time = `${time} : ${restTimeValue%60}` 
    }
    displayRestTime.innerHTML = time
  }, 1000)
}

function clrInterval(interval){
  clearInterval(interval);
  console.log('Inside clr interval');
}

const startHandler = ()=>{
  document.querySelector('.display').classList.add('active')
  displayPomodoroTime.innerHTML = `${Math.floor(pomodoroTimeValue/60)} : ${pomodoroTimeValue%60}`
  displayRestTime.innerHTML = `${Math.floor(restTimeValue/60)} : ${restTimeValue%60}`
  displayRounds.innerHTML = roundsNumberValue
  pomodoroStart()
}

startButton.addEventListener('click', startHandler)
