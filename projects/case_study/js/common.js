let galleryImgOverlay;

document.addEventListener("DOMContentLoaded", function(e) {
  window.isProgrammaticScroll = false;

  //---------- nav 

  window.navbarOpen = false;

  let navbar = document.querySelector(".nav-container");
  let sandwich = document.querySelector("#nav-sandwich");

  sandwich.addEventListener("click", function() {
    toggleDropdown(sandwich);
    navbarBackgroundChange(navbar);
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

    if (navbarOpen) { // If the navbar is open, apply the open navbar style
      navbar.style.backgroundColor = "var(--medium-gray)";
      navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.25)";
    }
    else { // If the navbar is closed, check the scroll position
      if (scrollY > navbar.scrollHeight) { // If the user has scrolled past the navbar's height, apply the open navbar style
        navbar.style.backgroundColor = "var(--medium-gray)";
        navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.25)";
      }
      else { // If the user has not scrolled past the navbar's height, apply default navbar style
        navbar.style.backgroundColor = "transparent";
        navbar.style.boxShadow = "none";
      }
    }
  }

  // ----- nav end

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


  const projectsSwiper = new Swiper('#projects-swiper', {
    spaceBetween: 20,
    speed: 750,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  const swiperContainer = document.querySelector('#projects-swiper'); // Get the DOM element of the Swiper container
  swiperContainer.addEventListener('mouseenter', () => projectsSwiper.autoplay.stop());
  swiperContainer.addEventListener('mouseleave', () => projectsSwiper.autoplay.start());

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






// maybe put below on site/app buttons...

// let masterLogoContainerOne;
// let masterRectOne;
// let techLogosOne;
// let techLogoWidth;

// masterLogoContainerOne = document.querySelector('#tech-logos-one');
// masterRectOne = masterLogoContainerOne.getBoundingClientRect();

// techLogosOne = document.querySelectorAll('#tech-logos-one img');
// techLogoWidth = techLogosOne[0].getBoundingClientRect().width;


// function updateTechLogosBorder(xZero, yZero) {
//   techLogosOne.forEach(function(tech, index) {
//     tech.style.borderImage = `radial-gradient(75px at ${xZero - ((index) * techLogoWidth)}px ${yZero}px, #ffa500, transparent) 1 / 1px / 0 stretch`;
//   });
// }

// function handleMouseMove(event) {
//   masterRectOne = masterLogoContainerOne.getBoundingClientRect();
//   let xZero = event.clientX - masterRectOne.left;
//   let yZero = event.clientY - masterRectOne.top;

//   updateTechLogosBorder(xZero, yZero);
// }

// document.addEventListener('mousemove', handleMouseMove);


