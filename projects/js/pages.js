document.addEventListener("DOMContentLoaded", function() {
  window.viewportMode = 1; // 1 = computer, 2 = tablet, 3 = phone
  
  const pagesMainContainer = document.querySelector(".pages-main-container");

  displayRemovePages(pagesMainContainer);
  window.addEventListener('resize', function(e) { displayRemovePages(pagesMainContainer); }); // show/hide pages for different screen widths

  const pagesOpenerContainer = document.querySelector(".pages-opener-container");
  const pagesButtonContainer = document.querySelector(".pages-button-container");

  let pagesOpen = false;

  pagesMainContainer.style.left = (-pagesButtonContainer.scrollWidth) + "px";

  pagesOpenerContainer.addEventListener("click", function() {
    if (pagesOpen) {
      pagesMainContainer.style.left = (-pagesButtonContainer.scrollWidth) + "px";
      pagesButtonContainer.style.boxShadow = "none";
      pagesOpen = false;
    }
    else {
      pagesMainContainer.style.left = "0";
      pagesButtonContainer.style.boxShadow = "0 0 10px 2px rgb(71 71 71)";
      pagesOpen = true;
    }
  });


  let pagesTextFeatures = pagesButtonContainer.querySelector("#pages-features");
  let pagesTextSupport = pagesButtonContainer.querySelector("#pages-support");
  let pagesTextReviews = pagesButtonContainer.querySelector("#pages-reviews");
  let pagesTextAbout = pagesButtonContainer.querySelector('#pages-about');
  let pagesTextContact = pagesButtonContainer.querySelector('#pages-contact');

  let featuresVisited = false;
  let supportVisited = false;
  let reviewsVisited = false;
  let aboutVisited = false;
  let contactVisited = false;

  let iframe = document.getElementById('minimaIframe');
  let linkAbout;
  let linkContact;
  iframe.onload = function() {
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    let iframeWindow = iframe.contentWindow;
    let currentIframeURL = iframeWindow.location.href;
    if (currentIframeURL.includes("home.html")) { // if in home, activate features, support, reviews scroll logic....
      let featuresScrollTarget = iframeDocument.querySelector("#features-scroll-target");
      let supportScrollTarget = iframeDocument.querySelector("#support-scroll-target");
      let reviewsScrollTarget = iframeDocument.querySelector("#reviews-scroll-target");


      iframe.contentWindow.addEventListener('scroll', function() {
        console.log('The iframe is being scrolled');
        console.log(featuresScrollTarget.getBoundingClientRect().top);
        console.log(supportScrollTarget.getBoundingClientRect().top);
        console.log(reviewsScrollTarget.getBoundingClientRect().top);
        if (!featuresVisited) {
          const featuresPosition = featuresScrollTarget.getBoundingClientRect().top;
          if (featuresPosition <= 251) {
              pagesTextFeatures.classList.add('visited');
              featuresVisited = true;
          }
        }
        if (!supportVisited) {
          const supportPosition = supportScrollTarget.getBoundingClientRect().top;
          if (supportPosition <= 251) {
              pagesTextSupport.classList.add('visited');
              supportVisited = true;
          }
        }
        if (!reviewsVisited) {
          const reviewsPosition = reviewsScrollTarget.getBoundingClientRect().top;
          if (reviewsPosition <= 251) {
              pagesTextReviews.classList.add('visited');
              reviewsVisited = true;
          }
        }
      });
    }

    linkAbout = iframeDocument.querySelector('#link-about');
    linkContact = iframeDocument.querySelector('#link-contact'); 
    linkAbout.addEventListener('click', function() {
      if (!pagesTextAbout.classList.contains('visited')) {
        pagesTextAbout.classList.add('visited');
        aboutVisited = true;
      }
    });
    linkContact.addEventListener('click', function() {
      if (!pagesTextContact.classList.contains('visited')) {
        pagesTextContact.classList.add('visited');
        contactVisited = true;
      }
    });
  };
});

function displayRemovePages(pagesMainContainer) {
  if (window.innerWidth < 1000) pagesMainContainer.style.display = "none";
  else pagesMainContainer.style.display = "flex";
}