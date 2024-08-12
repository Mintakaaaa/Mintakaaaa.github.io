document.addEventListener("DOMContentLoaded", function(e) {

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
