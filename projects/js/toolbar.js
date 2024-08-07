document.addEventListener("DOMContentLoaded", function() {
  window.viewportMode = 1; // 1 = computer, 2 = tablet, 3 = phone
  
  const toolbarMainContainer = document.querySelector(".toolbar-main-container");

  displayRemoveToolbar(toolbarMainContainer);
  window.addEventListener('resize', function(e) { displayRemoveToolbar(toolbarMainContainer); }); // show/hide toolbar for different screen widths

  const toolbarOpenerContainer = document.querySelector(".toolbar-opener-container");
  const toolbarButtonContainer = document.querySelector(".toolbar-button-container");

  let toolbarOpen = false;

  toolbarMainContainer.style.right = (-toolbarButtonContainer.scrollWidth) + "px";

  toolbarOpenerContainer.addEventListener("click", function() {
    if (toolbarOpen) {
      toolbarMainContainer.style.right = (-toolbarButtonContainer.scrollWidth) + "px";
      toolbarButtonContainer.style.boxShadow = "none";
      toolbarOpen = false;
    }
    else {
      toolbarMainContainer.style.right = "0";
      toolbarButtonContainer.style.boxShadow = "0 0 10px 2px rgb(71 71 71)";
      toolbarOpen = true;
      updateWithPixelsText(getIframeMaxWidth());
    }
  });

  const mobileButton = toolbarButtonContainer.querySelector(".fa-mobile-button");
  const tabletButton = toolbarButtonContainer.querySelector(".fa-tablet-button");
  const desktopButton = toolbarButtonContainer.querySelector(".fa-desktop");

  mobileButton.addEventListener("click", function(e) { 
    resizeIframe(375, fullscreen = false);
    viewportMode = 3; // Update viewport mode variable
    updateWithPixelsText(375);

    disableButton(this);
    enableButton(desktopButton);
    enableButton(tabletButton);
  });
  tabletButton.addEventListener("click", function(e) { 
    resizeIframe(768, fullscreen = false);
    viewportMode = 2; // Update viewport mode variable
    updateWithPixelsText(768);


    disableButton(this);
    enableButton(desktopButton);
    enableButton(mobileButton);
  });
  desktopButton.addEventListener("click", function(e) { 
    const maxWidth = getIframeMaxWidth();
    resizeIframe(maxWidth, fullscreen = true);
    viewportMode = 1; // Update viewport mode variable
    updateWithPixelsText(maxWidth);
    
    disableButton(this);
    enableButton(tabletButton);
    enableButton(mobileButton);
  });

  const minViewportWidth = 320; // Minimum viewport width in pixels
  let toolbarScrollParent = document.querySelector("#toolbar-scroll-container");
  let toolbarScroll = document.querySelector("#toolbar-scroll");

  const maxLeft = toolbarScrollParent.offsetWidth - toolbarScroll.offsetWidth;
  toolbarScroll.style.left = `${maxLeft}px`; // move slider to the right (pc position)

  toolbarScroll.addEventListener('mousedown', function(e) {
    e.preventDefault();
    enableButton(desktopButton); // reenable all buttons since using scroller...
    enableButton(tabletButton);
    enableButton(mobileButton);

    document.body.style.cursor = 'grabbing';
    let offsetX = e.clientX - toolbarScroll.offsetLeft;

    function mouseMoveHandler(e) {
      let newLeft = e.clientX - offsetX;

      // Boundary checks
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft + toolbarScroll.offsetWidth > toolbarScrollParent.offsetWidth) {
        newLeft = toolbarScrollParent.offsetWidth - toolbarScroll.offsetWidth;
      }

      console.log(toolbarScrollParent.offsetWidth); // max 
      console.log(newLeft + toolbarScroll.offsetWidth) // progress

      toolbarScroll.style.left = `${newLeft}px`;

      // Update viewport width based on scroll position
      const maxViewportWidth = getIframeMaxWidth();
      const sliderPosition = newLeft / (toolbarScrollParent.offsetWidth - toolbarScroll.offsetWidth);
      const viewportWidth = minViewportWidth + sliderPosition * (maxViewportWidth - minViewportWidth);
      console.log("Viewport width:", viewportWidth);

      resizeIframe(viewportWidth, fullscreen = false);
      updateWithPixelsText(viewportWidth);
  }

    function mouseUpHandler() {
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


  toolbarScrollParent.addEventListener('click', function(e) {
    // Get the x position of the click relative to the parent div
    const rect = this.getBoundingClientRect();
    let xPos = e.clientX - rect.left - (toolbarScroll.offsetWidth / 2);

    // Set the left style to position the child div
    toolbarScroll.style.left = `${xPos}px`;

    // Update viewport width based on scroll position
    const maxViewportWidth = getIframeMaxWidth();
    const sliderPosition = xPos / (toolbarScrollParent.offsetWidth - toolbarScroll.offsetWidth);
    const viewportWidth = minViewportWidth + sliderPosition * (maxViewportWidth - minViewportWidth);
    
    console.log("Viewport width:", viewportWidth);
    
    resizeIframe(viewportWidth, fullscreen = false);
    updateWithPixelsText(viewportWidth);
    enableButton(desktopButton); // reenable all buttons since using scroller...
    enableButton(tabletButton);
    enableButton(mobileButton);
  });
});


function getIframeMaxWidth() {
  const iframe = document.getElementById('minimaIframe');
  const parent = iframe.parentElement;
  const parentStyles = window.getComputedStyle(parent);

  // calc parent element's width minus padding and border
  const parentWidth = parent.clientWidth - parseFloat(parentStyles.paddingLeft) - parseFloat(parentStyles.paddingRight);
  const viewportWidth = window.innerWidth;

  // Determine the max width between parent width and viewport width
  const maxWidth = Math.min(parentWidth, viewportWidth);
  return maxWidth;
}

function resizeIframe(width, fullscreen) {
  const iframe = document.getElementById('minimaIframe');
  if (fullscreen) iframe.style.width = "100%";
  else iframe.style.width = `${width}px`;


  // Update scroller position depending on given width.
  let toolbarScrollParent = document.querySelector("#toolbar-scroll-container");
  let toolbarScroll = document.querySelector("#toolbar-scroll");
  const minViewportWidth = 320;
  const maxViewportWidth = getIframeMaxWidth();
  const sliderPosition = (width - minViewportWidth) / (maxViewportWidth - minViewportWidth);
  let newLeft = sliderPosition * (toolbarScrollParent.offsetWidth - toolbarScroll.offsetWidth);

  // Boundary checks
  if (newLeft < 0) {
      newLeft = 0;
  } else if (newLeft + toolbarScroll.offsetWidth > toolbarScrollParent.offsetWidth) {
      newLeft = toolbarScrollParent.offsetWidth - toolbarScroll.offsetWidth;
  }

  toolbarScroll.style.left = `${newLeft}px`;
}


function enableButton(button) {
  button.classList.add("enabled");
  button.classList.remove("disabled");
}

function disableButton(button) {
  button.classList.remove("enabled");
  button.classList.add("disabled");
}

function displayRemoveToolbar(toolbarMainContainer) {
  if (window.innerWidth < 1000) toolbarMainContainer.style.display = "none";
  else toolbarMainContainer.style.display = "flex";
}

function updateWithPixelsText(viewportWidth) {
  let widthPixelsText = document.querySelector("#width-pixels-text");
  widthPixelsText.textContent = Math.round(viewportWidth) + "px";
}