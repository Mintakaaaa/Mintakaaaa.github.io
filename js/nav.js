document.addEventListener("DOMContentLoaded", function() {
  window.navbarOpen = false;

  let navbar = document.querySelector(".nav-container");
  let sandwich = document.querySelector("#nav-sandwich");

  sandwich.addEventListener("click", function() {
    toggleDropdown(sandwich);
  });

  window.addEventListener("scroll", function() {
    stickyNavbar(navbar);
  });


  const eduNavButton = document.querySelector("#nav-education");
  const projectsNavButton = document.querySelector("#nav-projects");
  const workNavButton = document.querySelector("#nav-work");
  const contactNavButton = document.querySelector("#nav-contact-button");

  eduNavButton.addEventListener('click', () => {
    toggleDropdown(sandwich);
    scrollToElementWithOffset(document.querySelector('#edu-scroll-target'), -200); // Offset of -200px
  });
  projectsNavButton.addEventListener('click', () => {
    toggleDropdown(sandwich);
    scrollToElementWithOffset(document.querySelector('#projects-scroll-target'), -200);
  });
  workNavButton.addEventListener('click', () => {
    toggleDropdown(sandwich);
    scrollToElementWithOffset(document.querySelector('#work-scroll-target'), -200);
  });
  contactNavButton.addEventListener('click', () => {
    if (document.body.style.width <= 520)
      toggleDropdown(sandwich); // this is to not toggle dropdown if u cant see it on big screen...

    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
    window.isProgrammaticScroll = true;
    setTimeout(() => {
      window.isProgrammaticScroll = false;
    }, 1000);

    contactNavButton.blur();
  });
});

function toggleDropdown(sandwich) {
  sandwich.classList.toggle("menu-open");

  const dropdown = document.querySelector('.nav');
  if (dropdown.style.maxHeight) {
      dropdown.style.maxHeight = null;
      window.navbarOpen = false;
  } else {
      const dropdownHeight = dropdown.scrollHeight;
      dropdown.style.maxHeight = dropdownHeight + 'px';
      window.navbarOpen = true;
  }
}

function stickyNavbar(navbar) {
  let scrollY = window.scrollY;

  if (scrollY > navbar.scrollHeight) {
    if (!navbar.classList.contains("sticky")) {
      navbar.classList.add("sticky");

      let heightDifference = document.createElement("div");
      if (!document.body.contains(heightDifference)) {
        document.body.insertBefore(heightDifference, document.body.firstChild);
        heightDifference.id = "height-difference";
        heightDifference.style.minHeight = navbar.scrollHeight + "px";
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


function scrollToElementWithOffset(element, offset) {
  if (document.body.style.width < 376 && window.scrollY === 0) { // scrollY = 0 when navbar is pushing elements down
    offset -= 50; // scroll a little more because open navbar pushes all elements down
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition + offset;

  window.isProgrammaticScroll = true;
  window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
  });

  // Reset the flag after the scroll completes
  setTimeout(() => {
    window.isProgrammaticScroll = false;
  }, 1000);
}