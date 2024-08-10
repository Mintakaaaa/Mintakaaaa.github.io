let masterLogoContainerOne;
let masterRectOne;
let masterLogoContainerTwo;
let masterRectTwo;
let techLogosOne;
let techLogosTwo;
let techLogoWidth;

let galleryImgOverlay;

document.addEventListener("DOMContentLoaded", function(e) {
  window.isProgrammaticScroll = false;

  //---------- nav 

  window.navbarOpen = false;

  let navbar = document.querySelector(".nav-container");
  let sandwich = document.querySelector("#nav-sandwich");

  sandwich.addEventListener("click", function() {
    toggleDropdown(sandwich);
  });

  window.addEventListener("scroll", function() {
    navbarBackgroundChange(navbar);
  });

  const contactNavButton = document.querySelector("#nav-contact-button");

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

  function navbarBackgroundChange(navbar) {
    let scrollY = window.scrollY;

    if (scrollY > navbar.scrollHeight) {
      navbar.style.backgroundColor = "var(--medium-gray)";
      navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.25)";
    }
    else {
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";
    }
  }

  // ----- nav end

  const siteAppSwiper = new Swiper("#site-app-swiper", {
    spaceBetween: 20,
    speed: 750,
    on: {
      slideChange: function () {
        handleButtonChange(this.activeIndex);
      },
    },
  });

  let lastSelectedSiteAppItem = document.querySelector('#site-app-swiper-0');

  function handleButtonChange(activeIndex) {
    lastSelectedSiteAppItem.classList.toggle("selected");
    let newButton = document.querySelector(`#site-app-swiper-${activeIndex}`);
    newButton.classList.toggle("selected");
    lastSelectedSiteAppItem = newButton;
  }

  document.querySelectorAll('.switch-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      siteAppSwiper.slideTo(slideIndex); // Slide to the specific index
    });
  });

  const projectsSwiper = new Swiper('#projects-swiper', {
    spaceBetween: 20,
    speed: 750,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });




  // ----------------------------------------------------------------
  masterLogoContainerOne = document.querySelector('#tech-logos-one');
  masterRectOne = masterLogoContainerOne.getBoundingClientRect();

  masterLogoContainerTwo = document.querySelector('#tech-logos-two');
  masterRectTwo = masterLogoContainerTwo.getBoundingClientRect();

  techLogosOne = document.querySelectorAll('#tech-logos-one img');
  techLogosTwo = document.querySelectorAll('#tech-logos-two img');
  techLogoWidth = techLogosOne[0].getBoundingClientRect().width;
  // let techLogoHeight = techLogos[0].getBoundingClientRect().height;

  // ----------------------------------------------------------------

  //gallery

  galleryImgOverlay = document.querySelector("#gallery-img-overlay");
  let galleryImg = galleryImgOverlay.querySelector("img");

  galleryImgOverlay.addEventListener("click", function(e) {
    if (e.target !== galleryImg) { /// if not clicking on overlaying img then close it...
      hideGalleryImage();
    }
  });
  
  let allImages = document.querySelectorAll(".gallery-img");

  allImages.forEach(function(image) {
    image.addEventListener("click", function() {
      galleryImg.src = this.firstElementChild.getAttribute("src");
      showGalleryImage(); 
    });
  });
  //----

  document.addEventListener('mousemove', handleMouseMove);
});

function hideGalleryImage() {
  gsap.killTweensOf(galleryImgOverlay); // stops animation glitching when repeatedly clicking super fast

  gsap.to(galleryImgOverlay, {
      duration: 0.3, 
      backdropFilter: "none",  // removes blur effect when hiding image
      opacity: 0,
      onComplete: function() {
        galleryImgOverlay.classList.add("d-none");
      }
  });
}
function showGalleryImage() {
  gsap.killTweensOf(galleryImgOverlay); // stops animation glitching when repeatedly clicking super fast

  let tl = gsap.timeline();
  tl.to(galleryImgOverlay, {
    onStart: function() {
      galleryImgOverlay.classList.remove("d-none");
    },
    duration: 0.3,
    backdropFilter: "blur(3px)",
    opacity: 1,
  });
}

function updateTechLogosBorder(xZero, yZero, xZeroTwo, yZeroTwo) {
  techLogosOne.forEach(function(tech, index) {
    tech.style.borderImage = `radial-gradient(75px at ${xZero - ((index) * techLogoWidth)}px ${yZero}px, #ffa500, transparent) 1 / 1px / 0 stretch`;
  });
  techLogosTwo.forEach(function(tech, index) {
    tech.style.borderImage = `radial-gradient(75px at ${xZeroTwo - ((index) * techLogoWidth)}px ${yZeroTwo}px, #ffa500, transparent) 1 / 1px / 0 stretch`;
  });
}

function handleMouseMove(event) {
  masterRectOne = masterLogoContainerOne.getBoundingClientRect();
  let xZero = event.clientX - masterRectOne.left;
  let yZero = event.clientY - masterRectOne.top;

  console.log("-----");

  console.log(masterRectOne.left, masterRectOne.top, xZero, yZero);

  masterRectTwo = masterLogoContainerTwo.getBoundingClientRect();
  let xZeroTwo = event.clientX - masterRectTwo.left;
  let yZeroTwo = event.clientY - masterRectTwo.top;
  console.log(masterRectTwo.left, masterRectTwo.top, xZeroTwo, yZeroTwo);

  console.log("-----");
  // let siteAppSwiper = document.querySelector('#site-app-swiper');
  // if (siteAppSwiper) {
// 
  // }

  // need to make it more abstract and smaller code, maybe if swiper then calculate rest...

  updateTechLogosBorder(xZero, yZero, xZeroTwo, yZeroTwo);
}