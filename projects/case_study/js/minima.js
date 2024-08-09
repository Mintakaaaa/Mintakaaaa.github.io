let masterLogoContainer;
let techLogos;
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
    stickyNavbar(navbar);
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
  }

  // ----- nav end


  const projectsSwiper = new Swiper('.swiper-container', {
    spaceBetween: 10,
    speed: 750,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });


  // ----------------------------------------------------------------
  masterLogoContainer = document.querySelector('#all-tech-logos');
  let masterRect = masterLogoContainer.getBoundingClientRect();

  techLogos = document.querySelectorAll('.tech-logo-container');
  techLogoWidth = techLogos[0].getBoundingClientRect().width;
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

function updateTechLogosBorder(xZero, yZero) {
  techLogos.forEach(function(tech, index) {
    tech.style.borderImage = `radial-gradient(75px at ${xZero - ((index) * techLogoWidth)}px ${yZero}px, #ffa500, transparent) 1 / 1px / 0 stretch`;
  });
}

function handleMouseMove(event) {
  masterRect = masterLogoContainer.getBoundingClientRect();
  let xZero = event.clientX - masterRect.left;
  let yZero = event.clientY - masterRect.top;
  

  updateTechLogosBorder(xZero, yZero);
}