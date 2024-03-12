document.addEventListener("DOMContentLoaded", function() {
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
        const letters = ["P", "r", "o", "j", "e", "c", "t", " ", "P", "o", "r", "t", "f", "o", "l", "i", "o"]
    
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

    const wrapper = document.createElement('span');
    wrapper.classList.add('gradient-heading');
    wrapper.setAttribute('id', 'scroll-gradient');

    for (let i = 7; i < portfolioSpans.length; i++) {
        console.log(portfolioSpans[i].textContent);
        let span = document.createElement('span');
        span.textContent = portfolioSpans[i].textContent;
        wrapper.appendChild(span);

        // Remove individual "portfolio" letter span from the heading
        portfolioSpans[i].parentNode.removeChild(portfolioSpans[i]);
    }
    heading.appendChild(wrapper);
    wrapper.classList.add('animated-text');
    // wrapper.classList.add('gradual-underline'); // adds underline class to gradient heading

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heading = document.getElementById('scroll-gradient');
        const stop1 = 40 - (scrollPosition * 0.4); // Adjust the scroll speed here
        // const stop2 = 90 - (scrollPosition * 0.05); // Adjust the scroll speed here
        let gradient = `-webkit-linear-gradient(135deg, #61dd96 ${stop1}%, #7e7cd6)`;
        heading.style.backgroundImage = gradient;
    });
}