(function() {
  const billingSelector = document.querySelector("#billing_duration");
  const durationLabels = document.querySelectorAll(".billing_duration__text");
  const container = document.querySelector(".plan_select");



  /**
   * Handle the change event on the billing duration selector
   */
  const handleBillingSelectorChange = function() {
    if (!billingSelector.checked) {
      durationLabels[0].classList.add("billing_duration__text--selected");
      durationLabels[1].classList.remove("billing_duration__text--selected");
      container.classList.remove("plan_select--yearly");
    } else {
      durationLabels[1].classList.add("billing_duration__text--selected");
      durationLabels[0].classList.remove("billing_duration__text--selected");
      container.classList.add("plan_select--yearly");
    }
  };

  // initial setup
  handleBillingSelectorChange();

  billingSelector.addEventListener("change", handleBillingSelectorChange);
}());
