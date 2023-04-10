/* global moment */
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const outputYears = document.querySelector("#output-years");
  const outputMonths = document.querySelector("#output-months");
  const outputDays = document.querySelector("#output-days");

  const container = document.querySelector("#input-fields");
  const invalidMessage = document.querySelector("#invalid-message");

  // remove previous error message
  container.classList.remove("error");
  invalidMessage.classList.add("hidden");
  container.querySelectorAll("p").forEach((e) => e.classList.add("hidden"));

  // reset counter
  outputYears.textContent = "--";
  outputMonths.textContent = "--";
  outputDays.textContent = "--";

  // use moment.js to validate date
  const birthDate = moment([year.value, month.value - 1, day.value]);
  if (!birthDate.isValid()) {
    container.classList.add("error");

    if (!year.value && !month.value && !day.value) {
      return;
    }

    if (birthDate.invalidAt() == 1) {
      year.nextElementSibling.classList.remove("hidden");
    }

    if (birthDate.invalidAt() == 2) {
      month.nextElementSibling.classList.remove("hidden");
    }

    if (birthDate.invalidAt() == 3) {
      day.nextElementSibling.classList.remove("hidden");
    }
    return;
  }

  // create a new Date object with the user's input
  const now = moment();

  if (birthDate > now) {
    container.classList.add("error");
    invalidMessage.classList.remove("hidden");
    return;
  }

  const diffDuration = moment.duration(now.diff(birthDate));

  outputYears.textContent = diffDuration.years();
  outputMonths.textContent = diffDuration.months();
  outputDays.textContent = diffDuration.days();
});
