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
      document
        .querySelector(".whitelist-container")
        .classList.remove("bounceOut");
      setTimeout(function() {
        document.querySelector(".whitelist-container").style.zIndex = "100";
        document
          .querySelector(".whitelist-container")
          .classList.add("bounceIn");
      }, 1);
    });
  });

  document
    .querySelector(".whitelist-close-btn")
    .addEventListener("click", function(e) {
      document.querySelector(".whitelist-container").classList.add("bounceOut");
      setTimeout(function() {
        document
          .querySelector(".whitelist-container")
          .classList.remove("bounceIn");
        document.querySelector(".whitelist-container").style.zIndex = "-100";
      }, 1000);
    });
}

window.onload = function() {
  toggleMobileSideNav();
  toggleWhiteListModal();
};
