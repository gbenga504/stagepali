function toggleMobileSideNav() {
  let mobileMenuOpenBtn = document.getElementsByClassName(
      "header-mobile-hamburger"
    )[0],
    mobileMenuCloseBtn = document.getElementsByClassName(
      "header-mobile-close"
    )[0],
    elArray = [mobileMenuCloseBtn, mobileMenuOpenBtn];

  elArray.forEach(el => {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      document.getElementById("toggle_menu").classList.toggle("open");
    });
  });
}

function toggleWhiteListModal() {
  let openModalBtns = document.querySelectorAll(".get-access-btn");

  Array.from(openModalBtns).forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      document.body.style.overflowY = "hidden";
      document.querySelector(".whitelist-container").style.visibility =
        "visible";
      document
        .querySelector(".whitelist-container")
        .classList.remove("bounceOut");
      setTimeout(function() {
        document.querySelector(".whitelist-container").style.zIndex = "99999";
        document
          .querySelector(".whitelist-container")
          .classList.add("bounceIn");
      }, 1);
    });
  });

  document
    .querySelector(".whitelist-close-btn")
    .addEventListener("click", function(e) {
      document.body.style.overflowY = "scroll";
      document.querySelector(".whitelist-container").classList.add("bounceOut");
      setTimeout(function() {
        document
          .querySelector(".whitelist-container")
          .classList.remove("bounceIn");
        document.querySelector(".whitelist-container").style.zIndex = "-99999";

        let whiteListSuccessContainer = document.querySelector(
            ".whitelist-success-container"
          ),
          whiteListFormContainer = document.querySelector(
            ".whitelist-form-container"
          );

        whiteListSuccessContainer &&
          whiteListSuccessContainer.classList.add(
            "whitelist-success-container--not-visible"
          );
        whiteListFormContainer &&
          whiteListFormContainer.classList.remove(
            "whitelist-form-container--not-visible"
          );
      }, 1000);
    });
}

function handleFormValidation() {
  let name = document.getElementById("name").value.trim(),
    email = document.getElementById("email").value.trim(),
    companyName = document.getElementById("companyName").value.trim(),
    purpose = document.getElementById("purpose").value.trim(),
    nameRegex = /^[a-zA-Z\s]{3,}$/,
    emailRegex = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

  if (name.length == 0 || !nameRegex.test(name)) {
    return { isValid: false, error: "The name is not valid" };
  } else if (email.length == 0 || !emailRegex.test(email)) {
    return { isValid: false, error: "The email address entered is not valid" };
  } else if (companyName.length <= 3) {
    return { isValid: false, error: "The company name entered is not valid" };
  } else if (
    purpose.length == 0 ||
    purpose.toLowerCase() == "select a purpose"
  ) {
    return { isValid: false, error: "Please select one or more purpose" };
  }

  return { isValid: true, error: undefined };
}

function submitWhiteListForm() {
  let submitBtn = document.getElementById("whitelist-submit-btn"),
    whiteListSuccessContainer = document.querySelector(
      ".whitelist-success-container"
    ),
    whiteListFormContainer = document.querySelector(
      ".whitelist-form-container"
    );

  submitBtn.addEventListener("click", function() {
    let name = document.getElementById("name").value.trim(),
      email = document.getElementById("email").value.trim(),
      company_name = document.getElementById("companyName").value.trim(),
      purpose = document.getElementById("purpose").value.trim(),
      xmlHTTP = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP"),
      errorDOM = document.getElementById("whitelist-error"),
      { isValid, error } = handleFormValidation();

    if (!isValid) {
      errorDOM.innerHTML = error;
    } else {
      submitBtn.innerHTML = "Signing you up";
      errorDOM.innerHTML = "";

      let data = {
        name: name,
        company_name: company_name,
        email: email,
        pali_use: purpose
      };

      xmlHTTP.timeout = 30000;

      xmlHTTP.ontimeout = function() {
        xmlHTTP.abort();
        errorDOM.innerHTML =
          "Slow network connection, please check your networ connection";
        submitBtn.innerHTML = "Submit";
      };

      xmlHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          submitBtn.innerHTML = "Submit";
          whiteListFormContainer.classList.add(
            "whitelist-form-container--not-visible"
          );
          whiteListSuccessContainer.classList.remove(
            "whitelist-success-container--not-visible"
          );
        }
      };

      xmlHTTP.onerror = function(error) {
        errorDOM.innerHTML =
          "An error occurred while trying to sign you you, please try again later.";
        submitBtn.innerHTML = "Submit";
      };

      xmlHTTP.open(
        "POST",
        "https://paliapitage.herokuapp.com/api/v1/request_accesses",
        true
      );
      xmlHTTP.send(JSON.stringify(data));
    }
  });
}

window.onload = function() {
  toggleMobileSideNav();
  toggleWhiteListModal();
  submitWhiteListForm();
};
