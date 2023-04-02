(function() {

  const form = document.getElementsByTagName("form")[0];
  const storageKey = "multistep-form";

  // setup local storage to persist data across steps
  localStorage[storageKey] = localStorage[storageKey] || JSON.stringify({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    plan: "",
    billingCycle: "monthly",
    addOnOnlineServices: false,
    addOnLargerStorage: false,
    addOnCustomizableProfile: false,
  });

  const saveValue = (key, value) => {
    const data = JSON.parse(localStorage[storageKey]);
    data[key] = value;
    localStorage[storageKey] = JSON.stringify(data);
  };

  const getValue = (key) => {
    const data = JSON.parse(localStorage[storageKey]);
    return data[key];
  };

  const setupStepOne = () => {
    // check that all fields are filled out
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phone");

    // load previous values
    name.value = getValue("name");
    email.value = getValue("emailAddress");
    phoneNumber.value = getValue("phoneNumber");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let containsErrors = false;

      // utility function to add error message
      const addError = (field, message) => {
        containsErrors = true;
        if (field.previousSibling.querySelector(".form__error")) {
          field.previousSibling.querySelector(".form__error").remove();
        }

        const error = document.createElement("p");
        error.classList.add("form__error");
        error.innerText = message || "Please enter your " + field.id;
        field.previousSibling.appendChild(error);

        if (!field.parentElement.classList.contains("form__field--error")) {
          field.parentElement.classList.add("form__field--error");
        }
      };

      const removeError = (field) => {
        if (field.previousSibling.querySelector(".form__error")) {
          field.previousSibling.querySelector(".form__error").remove();
        }

        if (field.parentElement.classList.contains("form__field--error")) {
          field.parentElement.classList.remove("form__field--error");
        }
      };

      // remove any existing errors
      removeError(name);
      removeError(email);
      removeError(phoneNumber);

      if (!name.value) {
        addError(name);
      }

      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email.value || "")) {
        addError(email, "Please enter a valid email address");
      }

      if (!/^(?=.*\d)[\d ]+$/.test(phoneNumber.value || "")) {
        addError(phoneNumber, "Please enter your phone number");
      }

      if (!containsErrors) {
        saveValue("name", name.value);
        saveValue("emailAddress", email.value);
        saveValue("phoneNumber", phoneNumber.value);

        window.location.href = form.action;
      }
    });
  }

  const setupStepTwo = () => {

    // the checkbox that indicates monthly/yearly billing. unchecked = monthly, checked = yearly
    const billingCycle = document.getElementById("billing_duration");
    const planChoices = document.getElementsByName("plan");
    const previouslySelectedPlan = getValue("plan");

    if (getValue("billingCycle") === "yearly") {
      billingCycle.checked = true;
    }

    // check the correct plan from local storage
    planChoices.forEach((choice) => {
      if (choice.value === previouslySelectedPlan) {
        choice.checked = true;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // check that a plan is selected
      let containsErrors = true;
      let selectedPlan = null;
      planChoices.forEach((choice) => {
        if (choice.checked) {
          containsErrors = false;
          selectedPlan = choice.value;
        }
      });

      if (containsErrors) {
        alert("Please select a plan");
      } else {
        saveValue("plan", selectedPlan);
        saveValue("billingCycle", billingCycle.checked ? "yearly" : "monthly");
        window.location.href = form.action;
      }
    });
  };

  const setupStepThree = () => {
    const onlineServiceCheckbox = document.getElementById("online-service");
    const largerStorageCheckbox = document.getElementById("larger-storage");
    const customProfileCheckbox = document.getElementById("custom-profile");

    onlineServiceCheckbox.checked = getValue("addOnOnlineServices");
    largerStorageCheckbox.checked = getValue("addOnLargerStorage");
    customProfileCheckbox.checked = getValue("addOnCustomizableProfile");

    // check billing cycle and update the price
    const billingCycle = getValue("billingCycle");
    if (billingCycle === "yearly") {
      document.querySelectorAll(".add_on__price--monthly").forEach((price) => {
        price.classList.add("hidden");
      });
      document.querySelectorAll(".add_on__price--yearly").forEach((price) => {
        price.classList.remove("hidden");
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveValue("addOnOnlineServices", onlineServiceCheckbox.checked);
      saveValue("addOnLargerStorage", largerStorageCheckbox.checked);
      saveValue("addOnCustomizableProfile", customProfileCheckbox.checked);

      window.location.href = form.action;
    });
  };

  const setupStepFor = () => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  };

  window.app = {setupStepOne, setupStepTwo, setupStepThree, setupStepFor};
}());
