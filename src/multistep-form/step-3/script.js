(function() {
  // TODO get this value from local storage
  const priceType = "monthly";
  const isMonthly = priceType === "monthly";

  const priceMonthly = document.querySelectorAll(".add_on__price--monthly");
  const priceYearly = document.querySelectorAll(".add_on__price--yearly");

  priceMonthly.forEach((price) => {
    price.classList[isMonthly ? "remove" : "add"]("hidden");
  });

  priceYearly.forEach((price) => {
    price.classList[isMonthly ? "add" : "remove"]("hidden");
  });
}());
