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