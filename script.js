const inputContainer = document.querySelector("input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

// set date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);
