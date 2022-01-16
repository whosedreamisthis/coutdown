const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

const countdownEl = document.querySelector("#countdown");
const countdownElTitle = document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll("span");

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

function updateDOM() {
  intervalId = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log("distance", distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // populate count
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;

    timeElements[2].textContent = `${minutes}`;

    timeElements[3].textContent = `${seconds}`;

    console.log(days, hours, minutes, seconds);
    inputContainer.hidden = true;
    countdownEl.hidden = false;
  }, second);
}

//intervalId = setInterval(updat

// Take Values from form input
function updateCountdown(e) {
  console.log(e.target, e.target[0], e.target[1]);

  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  console.log(countdownTitle, countdownDate);
  //get number version of current Date, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  console.log("countdownValue:", countdownValue);
  updateDOM();
}
// reset all values
function reset() {
  console.log("yeah baby");
  inputContainer.hidden = false;
  countdownEl.hidden = true;
  countdownTitle = "";
  countdownDate = "";
  clearInterval(intervalId);
}
//event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
