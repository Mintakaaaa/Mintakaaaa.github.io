document.addEventListener("DOMContentLoaded", function() {
  window.isProgrammaticScroll = false;

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 0,
        },
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 0,
        },
    },
  });

  const navFeatures = document.querySelectorAll('.nav-features');
  navFeatures.forEach((link) => { 
    link.addEventListener('click', () => {
      toggleDropdown();
      scrollToElementWithOffset(document.getElementById('features-scroll-target'), -200); // Offset of -200px
    });
  });

  const navSupport = document.querySelectorAll('.nav-support');
  navSupport.forEach((link) => { 
    link.addEventListener('click', () => {
      toggleDropdown();
      scrollToElementWithOffset(document.getElementById('support-scroll-target'), -200);
    });
  });

  const navReviews = document.querySelectorAll('.nav-reviews');
  navReviews.forEach((link) => {
    link.addEventListener('click', () => {
      toggleDropdown();
      scrollToElementWithOffset(document.getElementById('reviews-scroll-target'), -200);
     });
   });


  const learnMore = document.getElementById('learn-more');
  learnMore.addEventListener('click', () => {
    scrollToElementWithOffset(document.getElementById('learn-more-scroll-target'), -100);
  });

  const arrowUpContainer = document.getElementById('arrow-up-container');
  arrowUpContainer.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const expandableCards = document.querySelectorAll(".expandable-card");
  expandableCards.forEach(card => {
      let header = card.querySelector(".question-chevron");
      let chevron = header.querySelector(".chevron");
      header.addEventListener("click", function(e) {
        let expandableContent = card.querySelector(".expandable-content");
        if (expandableContent.classList.contains("expanded-card")) { expandableContent.style.height = "0px"; }
        else { expandableContent.style.height = expandableContent.scrollHeight + "px"; }
        expandableContent.classList.toggle("expanded-card");
        chevron.classList.toggle("rotate-chevron-up");  // Rotate the chevron up or down when the card is expanded or collapsed.
      });
  });

  window.addEventListener("scroll", function() {
    // Check if the user is at the top of the page
    if (window.scrollY === 0) {
      arrowUpContainer.style.transform = 'translateX(200%)';
      arrowUpContainer.style.opacity = '0';
    }
    else {
      arrowUpContainer.style.transform = 'translateX(0px)';
      arrowUpContainer.style.opacity = '1';
    }
  });
});

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
