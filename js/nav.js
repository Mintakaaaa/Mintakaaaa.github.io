function showNavBar() {
  let navBar = document.querySelector("#navbar");
  navBar.style.height = navBar.scrollHeight + "px";
  navBar.style.padding = "40px";
}

function showLogo() {
  let logo = document.querySelector("#logo");
  let m = document.querySelector("#M");
  console.log(window.innerWidth);
  let windowWidth = window.innerWidth;
  if (windowWidth >= 767) {
      logo.style.fontSize = "50px";
  }
  else {
      logo.style.fontSize = "10px";
  }

}
function showNavText() {
  // let navMenu = document.querySelector(".nav-menu-item-list");
  let navMenuLinks = document.querySelectorAll('.nav-menu-item-list a');
  navMenuLinks.forEach(function(link) {
      link.style.fontSize = "20px";
  });
  console.log(navMenuLinks);
}

function showBarsInNav() {
  let bars = document.querySelectorAll(".nav-menu-item-list .bar");
  console.log(bars);
  bars.forEach(function(bar) {
      bar.style.setProperty('--bar-height', '50px'); // custom CSS variable!! Wow!
  });
}


function refreshElemHeight(elem, originalHeight, extraHeight, overflow) {
  if (overflow) {
    elem.style.height = originalHeight + extraHeight + "px";
    elem.style.overflow = "visible";
  }
  else {
    elem.style.height = originalHeight + extraHeight + "px";
    elem.style.overflow = "hidden";
  }
}

function handleSandwichClick() {
  const navMenu = document.querySelector('.nav-menu-item-list');
  console.log("Click");
  if (navMenu.style.overflow === 'hidden') {
      console.log(navMenu.scrollHeight + 'px');
      refreshElemHeight(navMenu, 0, navMenu.scrollHeight, true);
  }
  else {
      refreshElemHeight(navMenu, 0, 0, false);
  }
}

window.addEventListener('resize', handleResize);
function handleResize() {
    // Get the new size of the window
    const windowWidth = window.innerWidth;
    const navMenu = document.querySelector('.nav-menu-item-list');

    if (windowWidth >= 767) {
        refreshElemHeight(navMenu, 0, navMenu.scrollHeight, true);
    }   
    else {
        refreshElemHeight(navMenu, 0, 0, false);
    }
}


document.addEventListener("DOMContentLoaded", function() {
  handleResize();
  const navSandwich = document.querySelector('#nav-menu-sandwich');
  navSandwich.addEventListener('click', handleSandwichClick);

  showNavBar();
  setTimeout(function() {
      showLogo();
      setTimeout(function() {
          showNavText();
          setTimeout(function() {
              showBarsInNav();
          }, 500);
      }, 1000);
  }, 1000);
});