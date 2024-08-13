document.addEventListener("DOMContentLoaded", function(e) {
  window.isProgrammaticScroll = false;

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

  // for when clicking on case study from projects, to slide to specific project type.. like case study on App clicked, go to app case study. duh.
  let hash = window.location.hash; // i.e. minima.html#app  
  if (hash) {
    if (hash === "#site") siteAppSwiper.slideTo(0);
    else if (hash === "#app") siteAppSwiper.slideTo(1);
  }
});






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