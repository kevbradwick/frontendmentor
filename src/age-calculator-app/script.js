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

  // validate day
  if (!day.value || day.value < 1 || day.value > 31) {
    container.classList.add("error");
    day.nextElementSibling.classList.remove("hidden");
    return;
  }

  // validate month
  if (!month.value || month.value < 1 || month.value > 12) {
    container.classList.add("error");
    month.nextElementSibling.classList.remove("hidden");
    return;
  }

  // create a new Date object with the user's input
  const birthDate = new Date(year.value, month.value - 1, day.value);
  const now = new Date();

  if (birthDate > now) {
    container.classList.add("error");
    invalidMessage.classList.remove("hidden");
    return;
  }

  const diff = Math.floor(now - birthDate);
  const dayMs = 1000 * 60 * 60 * 24;

  const totalDays = Math.floor(diff / dayMs);
  const yearsOld = Math.floor(totalDays / 365);
  const monthsOld = Math.floor((totalDays % 365) / 30);
  const daysOld = Math.floor(totalDays - (yearsOld * 365) - (monthsOld * 30));

  outputYears.textContent = yearsOld;
  outputMonths.textContent = monthsOld;
  outputDays.textContent = daysOld;
});
