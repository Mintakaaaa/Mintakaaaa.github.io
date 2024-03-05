window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heading = document.getElementById('scroll-gradient');
    const stop1 = 40 - (scrollPosition * 0.4); // Adjust the scroll speed here
    // const stop2 = 90 - (scrollPosition * 0.05); // Adjust the scroll speed here
    let gradient = `-webkit-linear-gradient(135deg, #61dd96 ${stop1}%, #7e7cd6)`;
    heading.style.backgroundImage = gradient;
});

document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById('anim-heading');
    const text = heading.innerText;
    const letters = Array.from(text); // Convert text to an array of characters
    heading.innerHTML = ''; // Clear the original text

    setTimeout(() => {
        addAnimationToLetters(heading, letters);
    }, 500);

});

function addAnimationToLetters(heading, letters) {
    const delay = 100;
    let index = 0;

    letters.forEach(function(character) {
        setTimeout(function() {
            if (character == ' ') {
                // If the character is a space, add it directly without animation
                const span = document.createElement('span');
                span.textContent = ' ';
                heading.appendChild(span);
            } else {
                    const span = document.createElement('span');
                    span.textContent = character;
                    span.classList.add('animated-letter');
                    heading.appendChild(span);
            }
        }, index * delay); // Adjust delay as needed
        index++;
    });
}