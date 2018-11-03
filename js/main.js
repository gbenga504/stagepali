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

window.onload = function() {
  toggleMobileSideNav();
};
