document.addEventListener("DOMContentLoaded", function() {
    let pageOne = document.querySelector("#page-one");
    pageOne.addEventListener("click", function(event) {
        this.style.transform = "perspective(1000px) rotateX(68deg) translate3d(0px, -550px, 375px)";
    });
    let pageTwo = document.querySelector("#page-two");
    // pageTwo.style.transform = "perspective(1000px) rotateX(-68deg) translate3d(0px, -550px, 375px)";

    pageOne.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        pageTwo.style.transform = "perspective(1000px) rotateX(68deg) translate3d(0px, -550px, 375px)";
    });

    document.getElementById('progress-container').style.display = 'block'; // show progress bar

    setTimeout(function() { // update the progress bar width after a delay (simulating loading time)
        document.getElementById('progress-bar').style.width = '100%';
        
        setTimeout(function() { // hide the progress bar after a brief delay
        document.getElementById('progress-container').classList.add('move-up');
        }, 1000);
    }, 1000);

    setTimeout(function() {
        const bg_svgs = document.querySelectorAll('.bg-svg'); // get all bg-svgs
        for (let i = 0; i < bg_svgs.length; i++) { bg_svgs[i].classList.add('rotating-svg'); } // make them rotate
    
        const heading = document.getElementById('anim-heading');
        const letters = ["P", "r", "o", "j", "e", "c", "t", " ", "P", "o", "r", "t", "f", "o", "l", "i", "o"];
    
        setTimeout(() => {
            addAnimationToLetters(heading, letters, function() {
                // Animation finished, wrap "portfolio" spans
                wrapPortfolioSpans(heading);
            });
        }, 1000);
    }, 1000);
});

function addAnimationToLetters(heading, letters, callback) {
    const delay = 250;
    let index = 0;
    const totalAnimations = letters.length;
    let completedAnimations = 0;

    letters.forEach(function(character) {
        setTimeout(function() {
            const span = document.createElement('span');
            span.textContent = "_"; // Initial content is underscore
            heading.appendChild(span);

            // Set the content to the actual character after a delay
            setTimeout(function() {
                span.textContent = character;
                if (character !== ' ') {
                    span.classList.add('animated-letter');
                }
                completedAnimations++;

                // Check if all animations are complete, then call the callback
                if (completedAnimations === totalAnimations && typeof callback === 'function') {
                    callback();
                }
            }, delay);
        }, index * delay);
        index++;
    });
}


function wrapPortfolioSpans(heading) {
    let spanned = false;
    console.log("yipee");
    // Find spans with "portfolio" text content
    const portfolioSpans = heading.querySelectorAll('span.animated-letter');


    const gradientHeading = document.createElement('span');
    gradientHeading.classList.add('gradient-heading');
    gradientHeading.setAttribute('id', 'scroll-gradient');

    for (let i = 7; i < portfolioSpans.length; i++) {
        console.log(portfolioSpans[i].textContent);
        let span = document.createElement('span');
        span.textContent = portfolioSpans[i].textContent;
        gradientHeading.appendChild(span);

        // Remove individual "portfolio" letter spans from the main heading
        portfolioSpans[i].parentNode.removeChild(portfolioSpans[i]);
    }

    const gradientHeadingContainer = document.createElement('span');
    gradientHeadingContainer.appendChild(gradientHeading);
    heading.appendChild(gradientHeadingContainer);
    gradientHeading.classList.add('animated-text');
    addTextHoverListener(gradientHeadingContainer);
    showHelloText();

    // gradientHeading.classList.add('gradual-underline'); // adds underline class to gradient heading
    
    // to make pagescrollable and scrollbar appear
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflow = "visible";
    //
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heading = document.getElementById('scroll-gradient');
        const stop1 = 40 - (scrollPosition * 0.4); // Adjust the scroll speed here
        // const stop2 = 90 - (scrollPosition * 0.05); // Adjust the scroll speed here
        let gradient = `-webkit-linear-gradient(135deg, #61dd96 ${stop1}%, #7e7cd6)`;
        heading.style.backgroundImage = gradient;
    });
}

function addTextHoverListener(gradientHeadingContainer) {
    let gradientHeading = gradientHeadingContainer.querySelector("span");
    let rotateY;
    let rotateX;
    let maxRY = 10; // +LEFT to -RIGHT turning
    let maxRX = 20; // +UP to -DOWN turning

    gradientHeadingContainer.addEventListener("mousemove", function(event) {
        // mouse position relative to div
        const mouseX = event.clientX - this.getBoundingClientRect().left;
        const mouseY = event.clientY - this.getBoundingClientRect().top;
        // console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);

        let width = this.getBoundingClientRect().width;
        let height = this.getBoundingClientRect().height;

        let mRY = (-maxRY)/-(width / 2) 
        let mRX = (maxRX)/-(height / 2)

        rotateY = ((mRY*mouseX) - maxRY);
        rotateX = ((mRX*mouseY) + maxRX);

        gradientHeading.style.transition = "transform 0s";
        gradientHeading.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${(rotateX)}deg)`;
    });

    gradientHeadingContainer.addEventListener("mouseleave", function(event) {
        gradientHeading.style.transition = "transform 0.5s";
        gradientHeading.style.transform = `perspective(1000px) rotateY(${0}deg) rotateX(${0}deg)`;
    });
}

function showHelloText() {
    let hello = document.querySelector("#h1-hello");
    hello.classList.add('slide-in-from-left');
    hello.classList.remove("opacity-none");

    setTimeout(() => {
        let name = document.querySelector("#p-name");
        name.classList.add('slide-in-from-left');
        name.classList.remove("opacity-none");
    }, 1000);
}