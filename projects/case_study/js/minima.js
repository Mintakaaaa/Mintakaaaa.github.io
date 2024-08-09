let masterLogoContainer;
let techLogos;
let techLogoWidth;

let galleryImgOverlay;

document.addEventListener("DOMContentLoaded", function(e) {
  window.isProgrammaticScroll = false;

  const projectsSwiper = new Swiper('.swiper-container', {
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