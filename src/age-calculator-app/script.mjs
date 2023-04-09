document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");

  const container = document.querySelector("#input-fields");
  const invalidMessage = document.querySelector("#invalid-message");

  // validate day
  if (!day.value || day.value < 1 || day.value > 31) {
    container.classList.add("error");
    return;
  }

  // remove previous error message
  container.classList.remove("error");
  invalidMessage.classList.add("hidden");

  // create a new Date object with the user's input
  const birthDate = new Date(year.value, month.value - 1, day.value);
  const now = new Date();

  if (birthDate > now) {
    container.classList.add("error");
    invalidMessage.classList.remove("hidden");
    return;
  }

  // calculate how many years old the user is
  const years = new Date().getFullYear() - birthDate.getFullYear();
  // calculate how many months old the user is
  const months = new Date().getMonth() - birthDate.getMonth();
  // calculate how many days old the user is
  const days = new Date().getDate() - birthDate.getDate();
});
