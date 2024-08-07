document.addEventListener("DOMContentLoaded", function() {
  window.navbarOpen = false;

  let navbar = document.querySelector(".nav-container");

  let logoSandwichContainer = document.querySelector("#logo-sandwich-container");
  let sandwich = logoSandwichContainer.querySelector("#nav-sandwich");

  sandwich.addEventListener("click", function() {
    toggleDropdown();
  });

  window.addEventListener("scroll", function() {
    stickyNavbar(navbar)
  });
});

function toggleDropdown() {
  const dropdown = document.querySelector('.nav');
  if (dropdown.style.maxHeight) {
      dropdown.style.maxHeight = null;
      window.navbarOpen = false;
  } else {
      const dropdownHeight = dropdown.scrollHeight + 'px';
      dropdown.style.maxHeight = dropdownHeight;
      window.navbarOpen = true;
  }
}

function stickyNavbar(navbar) {
  let scrollY = window.scrollY;

  if (window.scrollY > navbar.scrollHeight) {
    if (!navbar.classList.contains("sticky")) {
      navbar.classList.add("sticky");
      let heightDifference = document.createElement("div");
      if (!document.body.contains(heightDifference)) {
        document.body.insertBefore(heightDifference, document.body.firstChild);
        heightDifference.id = "height-difference";
        heightDifference.style.height = navbar.scrollHeight + "px";
        if (!window.isProgrammaticScroll) { // to avoid navbar stopping page scrolling after i clicked nav button (which scrolls down...)
          window.scrollTo(0, scrollY);
        }
      }
    } 
  }
  else {
    if (navbar.classList.contains("sticky")){
      navbar.classList.remove("sticky");
      document.getElementById("height-difference").remove();
    }
  } 
};
