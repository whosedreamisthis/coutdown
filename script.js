const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

const countdownEl = document.querySelector("#countdown");
const countdownElDate = document.querySelector("#date");
const countdownElTitle = document.querySelector("#countdown-title");

const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll("span");

const complete = document.querySelector("#complete");
const completeInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");

// set date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

let countdownTitle = "";
let countdownDate = "";

let countdownValue = Date;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let intervalId;
let savedCountdown;
function updateDOM() {
  intervalId = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(intervalId);
      complete.hidden = false;
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    } else {
      complete.hidden = true;

      countdownEl.hidden = false;
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;

      timeElements[2].textContent = `${minutes}`;

      timeElements[3].textContent = `${seconds}`;
    }
  }, second);
}

// Take Values from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  //check for valid date
  if (countdownDate === "") {
    alert("Please pick a date for the countdown.");
  } else {
    //get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}
// reset all values
function reset() {
  inputContainer.hidden = false;
  countdownEl.hidden = true;
  complete.hidden = true;

  countdownTitle = "";
  countdownDate = "";
  clearInterval(intervalId);
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // get countdown from localStorage if avail

  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));

    if (savedCountdown) {
      countdownTitle = savedCountdown.title;
      countdownDate = savedCountdown.date;
      countdownValue = new Date(countdownDate).getTime();
      updateDOM();
    }
  }
}
//event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
if (completeBtn) {
  completeBtn.addEventListener("click", reset);
}
// check for saved countdown
restorePreviousCountdown();
