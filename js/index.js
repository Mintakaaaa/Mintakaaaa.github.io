document.addEventListener("DOMContentLoaded", function(e) {
  window.isProgrammaticScroll = false;

  //------ about me swiper
  const aboutSwiper = new Swiper('#swiper-container-about', {
    spaceBetween: 20,
    speed: 750,

    on: {
      slideChange: function () {
        // Handle circle expansion and minimization on slide change
        handleCircleChange(this.activeIndex);
        handleButtonChange(this.activeIndex);
      },
    },
  });

  let lastSelectedAboutItem = document.querySelector('#about-swiper-0');
  let lastExpandedCircle = document.querySelector('#slide-0-circle');
  expandBlueCircles(lastExpandedCircle);

  // Attach event listeners to the custom buttons
  document.querySelectorAll('.about-switch-container .switch-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      aboutSwiper.slideTo(slideIndex); // Slide to the specific index
    });
  });

  function handleCircleChange(activeIndex) {
    minimiseBlueCircles(lastExpandedCircle);
    let newCircle = document.querySelector(`#slide-${activeIndex}-circle`);
    expandBlueCircles(newCircle);
    lastExpandedCircle = newCircle;
  }

  function handleButtonChange(activeIndex) {
    lastSelectedAboutItem.classList.toggle("selected");
    let newButton = document.querySelector(`#about-swiper-${activeIndex}`);
    newButton.classList.toggle("selected");
    lastSelectedAboutItem = newButton;
  }

  function expandBlueCircles(circle) {
    gsap.killTweensOf(circle); // stops animation glitching when repeatedly clicking super fast
    let innerCircle = circle.nextElementSibling;

    let tl = gsap.timeline();
    tl.to(circle, {
      delay: 0.2,
      duration: 0.6,
      width: '80%',
    })
    tl.to(innerCircle, {
      duration: 0.6,
      width: '66%',
    }, "-=0.5");
  }

  function minimiseBlueCircles(circle) {
    gsap.killTweensOf(circle); // stops animation glitching when repeatedly clicking super fast
    let innerCircle = circle.nextElementSibling;

    let tl = gsap.timeline();
    tl.to(circle, {
      duration: 0.6,
      width: '0',
    })
    tl.to(innerCircle, {
      duration: 0.6,
      width: '0',
    }, "-=0.6"); // making the animation for inner and outer circles start at the same time with "-="
  }
  //-------


  let projectItemContainers = document.querySelectorAll(".project-item-container");

  let currentViewBox = document.querySelector("#current-view-type-box");
  let viewItems = document.getElementsByClassName("view-type-item");

  // getting first view type item and setting current item's width, height and pos.
  let firstItem = viewItems[0];
  let width = firstItem.offsetWidth;
  let height = firstItem.offsetHeight;
  let left = firstItem.getBoundingClientRect().left;
  // let top = firstItem.getBoundingClientRect().top;
  currentViewBox.style.width = width + "px";
  currentViewBox.style.height = height + "px";
  currentViewBox.style.left = left + "px";
  // currentViewBox.style.top = (firstItem.offsetTop) + "px";
  let lastClicked = viewItems[0]; // making "all" be first item clicked...

  Array.from(viewItems).forEach(function(item) {
    // when item clicked, unselect previous item, select this one, reposition current view box accordingly, toggle all views...
    item.addEventListener("click", function(e) {
      lastClicked.classList.toggle("selected");

      lastClicked = this;
      this.classList.toggle("selected");
      let rect = this.getBoundingClientRect();
      currentViewBox.style.top = (rect.top + window.scrollY) + "px";
      currentViewBox.style.left = rect.left + "px";
      currentViewBox.style.width = rect.width + "px";

      let projectTypes = this.dataset.types.split(",");
      toggleProjects(projectTypes, projectItemContainers);
    });
  });

  //-------- 

  let currentYearAverage = document.querySelector("#current-year-average");

  let currentYearBox = document.querySelector("#current-view-year-box");
  let yearItems = document.getElementsByClassName("view-year-item");

  // getting first view type item and setting current item's width, height and pos.
  let firstYearItem = yearItems[0];
  let yearItemWidth = firstYearItem.offsetWidth;
  let yearItemHeight = firstYearItem.offsetHeight;
  let yearItemLeft = firstYearItem.getBoundingClientRect().left;
  // let yearItemTop = firstYearItem.getBoundingClientRect().top;
  currentYearBox.style.width = yearItemWidth + "px";
  currentYearBox.style.height = yearItemHeight + "px";
  currentYearBox.style.left = yearItemLeft + "px";
  // currentYearBox.style.top = (yearItemTop + window.scrollY) + "px";

  let lastYearClicked = yearItems[0]; // making "all" be first item clicked...

  Array.from(yearItems).forEach(function(item) {
    // when item clicked, unselect previous item, select this one, reposition current view box accordingly, toggle all views...
    item.addEventListener("click", function(e) {
      lastYearClicked.classList.toggle("selected");

      lastYearClicked = this;
      this.classList.toggle("selected");
      let rect = this.getBoundingClientRect();
      currentYearBox.style.left = rect.left + "px";
      currentYearBox.style.top = (rect.top + window.scrollY) + "px";
      currentYearBox.style.width = rect.width + "px";

      let year = this.dataset.year;
      toggleModules(year);
      updateYearAverage(year, currentYearAverage);

      // now update position of currentViewBox (project selected) because contents of this affect the rest of the page...
      setTimeout(() => {
        repositionElement(currentViewBox, lastClicked);
      }, 300);
    });
  });

  //-------

  // mobile/non-mobile texts

  let hoverText = document.querySelector("#hover");
  let tapText = document.querySelector("#tap");
  if (isTouchDevice()) { tapText.style.display = "inline-block"; hoverText.style.display = "none"; } 
  else { tapText.style.display = "none"; hoverText.style.display = "inline-block"; }

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  //------

  function handleResize() {
    repositionElement(currentViewBox, lastClicked);
    repositionElement(currentYearBox, lastYearClicked);
  }

  let resizeTimeout;

  window.addEventListener("resize", function() { // reposition current view box according to resize...
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 10); // Adjust delay based on need

    //------- nav

    if (window.innerWidth > 520 && window.navbarOpen) { // when resizing window, close navbar after going past 520 px width...
      let sandwich = document.querySelector("#nav-sandwich");
      sandwich.classList.remove("menu-open");
  
      const dropdown = document.querySelector('.nav');
      dropdown.style.maxHeight = null;
      window.navbarOpen = false;

      repositionElement(currentViewBox, lastClicked);
      repositionElement(currentYearBox, lastYearClicked);
    }
  });




  //-----------------------------------------------------------------------

  let projectSwitchItems = document.querySelectorAll('.project');
  let lastProjectClicked = projectSwitchItems[0];

  const swiper = new Swiper('#swiper-container-minima', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 21,
    navigation: {
        nextEl: '#swiper-two',
        prevEl: '#swiper-one',
    },
  });

  let slideOneButton = document.querySelector('#swiper-one');
  let slideTwoButton = document.querySelector('#swiper-two');
  const updateButtonStyles = () => {
    slideOneButton.classList.toggle('selected');
    slideTwoButton.classList.toggle('selected');
  };

  // Listen to slide change event to update swiper button styles...
  swiper.on('slideChange', updateButtonStyles);
  
  projectSwitchItems.forEach(function(item) {
    item.addEventListener('click', function() {
      lastProjectClicked.classList.remove('selected');
      lastProjectClicked = this;
      this.classList.add('selected');
    });
  });

  //-----------------------------------------------------------------------


  //-------
  let webAppFGIcon = document.querySelector('#web-app-fg-icon');
  let displayedIcon = webAppFGIcon; // default
  showFGIcon(displayedIcon);
  let lastSelectedMakeItemContainer = document.querySelector('.default.selected.make-item-container');

  let staticSiteFGIcon = document.querySelector('#static-site-fg-icon');
  let desktopFGIcon = document.querySelector('#desktop-fg-icon');
  let androidFGIcon = document.querySelector('#android-fg-icon');
  //-------


  //-------
  let webAppTech = document.querySelector('#web-app-tech');
  let displayedTech = webAppTech;

  let desktopTech = document.querySelector('#desktop-app-tech');
  let androidTech = document.querySelector('#android-app-tech');
  let staticSiteTech = document.querySelector('#static-site-tech');
  let technologies = Array(webAppTech, desktopTech, androidTech, staticSiteTech); 
  toggleTech(displayedTech);

  //-------

  let makeItems = document.querySelectorAll('.make-item');
  makeItems.forEach(function(makeItem) {
    makeItem.addEventListener('click', function() {

      let makeType = this.dataset.make;
      let makeItemContainer = this.parentElement;

      // if already selected, do a little icon wiggle
      if (makeItemContainer.classList.contains("selected")) {
        wiggleIcon(displayedIcon);
      }

      // if not already selected, select new icon
      else {
        lastSelectedMakeItemContainer.classList.toggle('selected'); // last selected is no longer selected
        makeItemContainer.classList.toggle("selected"); // newly selected is now selected
  
        lastSelectedMakeItemContainer = makeItemContainer; // setting new selected html element to selected
  
        hideFGIcon(displayedIcon); // hiding old selected item's icon 
  
        // setting correct icon to be displayed (since selected item changed)
        if (makeType === "web-app") { displayedIcon = webAppFGIcon; displayedTech = webAppTech; }
        else if (makeType === "desktop-app") { displayedIcon = desktopFGIcon; displayedTech = desktopTech; }
        else if (makeType === "android-app") { displayedIcon = androidFGIcon; displayedTech = androidTech; }
        else if (makeType === "static-site") { displayedIcon = staticSiteFGIcon; displayedTech = staticSiteTech; }
        showFGIcon(displayedIcon); // show newly selected item's icon

        toggleTech(displayedTech);
      }
    });
  });

  //---------- nav 

  window.navbarOpen = false;

  let navbar = document.querySelector(".nav-container");
  let sandwich = document.querySelector("#nav-sandwich");

  sandwich.addEventListener("click", function() {
    toggleDropdown(sandwich);
    repositionElement(currentViewBox, lastClicked);
    repositionElement(currentYearBox, lastYearClicked);
  });

  window.addEventListener("scroll", function() {
    stickyNavbar(navbar);
    repositionElement(currentViewBox, lastClicked);
    repositionElement(currentYearBox, lastYearClicked);
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

  const hash = window.location.hash; // i.e. index.html#projects-scroll-target (click on projects in case study html to scroll to projects in index...)
  if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        scrollToElementWithOffset(targetElement, -200); // Adjust offset if needed
        // note: offset isnt properly applying when going from case study to projects
      }
  }

  // ----- nav end

  function wiggleIcon(fgIcon) {
    gsap.killTweensOf(fgIcon); // stops animation glitching when repeatedly clicking super fast

    let tl = gsap.timeline();

    tl.to(fgIcon, {
        duration: 0.1,
        rotation: 10, // Rotate 10 degrees to the right
        ease: "power1.inOut"
    })
    .to(fgIcon, {
        duration: 0.1,
        rotation: -10, // Rotate 10 degrees to the left
        ease: "power1.inOut"
    })
    .to(fgIcon, {
        duration: 0.1,
        rotation: 0, // Return to original rotation
        ease: "power1.inOut"
    });
  }

  function hideFGIcon(fgIcon) {
    gsap.killTweensOf(fgIcon); // stops animation glitching when repeatedly clicking super fast

    let tl = gsap.timeline();
    tl.to(fgIcon, {
      duration: 0.15,
      x: '-100%',
      y: '-100%',
    })  
    .set(fgIcon, {zIndex: -1})
    .to(fgIcon, {
      duration: 0.15,
      x: '50%',
      y: '50%',
    });
  }

  function showFGIcon(fgIcon) {
    let tl = gsap.timeline();
    tl.to(fgIcon, {
      duration: 0.15,
      delay: 0.4,
      x: '-100%',
      y: '-100%',
    })  
    .set(fgIcon, {zIndex: 1})
    .to(fgIcon, {
      duration: 0.15,
      x: '-50%',
      y: '-50%',
    });
  }

  function toggleTech(techToShow) {
    technologies.forEach(function(tech) {
      if (techToShow === tech) fadeInAndShow(tech);
      else fadeOutAndHide(tech); // hide all other tech items except the one being shown (techToShow)
    });
  }

  function toggleModules(moduleYearToShow) {
    let moduleContainers = document.querySelectorAll(".modules");
    moduleContainers.forEach(function(moduleYear) {
      if (moduleYear.dataset.year.includes(moduleYearToShow)) fadeInAndShow(moduleYear);
      else fadeOutAndHide(moduleYear); // hide all other tech items except the one being shown (techToShow)
    });
  }

  function fadeOutAndHide(tech) {
    gsap.killTweensOf(tech); // stops animation glitching when repeatedly clicking super fast

    gsap.to(tech, {
        duration: 0.3, 
        opacity: 0,
        onComplete: function() {
            tech.classList.add("d-none");
        }
    });
  }
  function fadeInAndShow(tech) {
    gsap.killTweensOf(tech); // stops animation glitching when repeatedly clicking super fast

    let tl = gsap.timeline();
    tl.to(tech, {
      duration: 0.3,
      opacity: 1,
      delay: 0.299,
      onStart: function() {
          tech.classList.remove("d-none");
      }
    });
  }

  //----------------------------

  let copiedText = document.querySelector("#copied-text");
  let copyButton = document.querySelector("#copy-email");
  copyButton.addEventListener("click", function() {
    navigator.clipboard.writeText("mindaugasb04@gmail.com");
    showCopiedAndHide(copiedText);
  });

  function showCopiedAndHide(copiedText) {
    gsap.killTweensOf(copiedText); // stops animation glitching when repeatedly clicking super fast

    let tl = gsap.timeline();
    tl.to(copiedText, {
      duration: 0.1,
      opacity: 1,
      ease: "power1.inOut"
    })
    .to(copiedText, {
      duration: 0.3,
      opacity: 0,
      delay: 1,
      ease: "power1.inOut"
    });
  }
});

function toggleProjects(projectTypes, projectItemContainers) {
  let slideOneButton = document.querySelector('#swiper-one');
  let slideTwoButton = document.querySelector('#swiper-two');

  if (projectTypes.includes("all")) {
    projectItemContainers.forEach(function(item) {
      item.style.display = "block";
    });
  }
  else {

    projectItemContainers.forEach(function(item) {
      item.style.display = "none";

      for (const projectType of projectTypes) {
        if (projectType.includes("android") && item.id === "minima") { slideTwoButton.click(); } // swipe minima to 2 if android is selected
        else if ((!projectType.includes("android") && item.id === "minima")) { slideOneButton.click(); } // else swipe minima to 1

        if (item.dataset.types.includes(projectType)) { item.style.display = "block";  break; }
      }
    });
  }
}

function updateYearAverage(year, currentYearAverage) {
  if (year === "1") { currentYearAverage.textContent = "69"; }
  else if (year === "2") { currentYearAverage.textContent = "75"; }
  else if (year === "3") { currentYearAverage.textContent = "NA"; }
  else if (year === "4") { currentYearAverage.textContent = "NA"; }
}

/**
 * Repositions a target element to match the position and size of a reference element.
 * 
 * @param {HTMLElement} targetElement - The element to reposition.
 * @param {HTMLElement} referenceElement - The element to use as the reference for positioning.
 * @param {number} [transitionDuration=200] - The duration of the CSS transition in milliseconds.
 */
function repositionElement(targetElement, referenceElement, transitionDuration = 200) {
  requestAnimationFrame(() => {
    // Disable transition to immediately apply the new position and size
    targetElement.style.transition = "none";

    // Get the bounding rectangle of the reference element
    let rect = referenceElement.getBoundingClientRect();

    // Set the target element's position and size based on the reference element
    targetElement.style.left = `${rect.left + window.scrollX}px`;
    targetElement.style.top = `${rect.top + window.scrollY}px`;
    targetElement.style.width = `${rect.width}px`;
    targetElement.style.height = `${rect.height}px`;

    // Force reflow to ensure styles are applied before transition is re-enabled
    targetElement.offsetHeight; // Trigger reflow

    // Re-enable transition after applying the new position and size
    requestAnimationFrame(() => {
      targetElement.style.transition = `left ${transitionDuration}ms ease-in-out, top ${transitionDuration}ms ease-in-out`;
    });
  });
}