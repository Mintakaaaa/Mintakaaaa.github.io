document.addEventListener("DOMContentLoaded", function() {
  const messageTextarea = document.querySelector("#messageTextarea");
  let charactersUsedText = document.querySelector("#charactersUsedText");
  messageTextarea.addEventListener("input", function(event) { 
    console.log("Message textarea input");

    if (messageTextarea.value.length > 1000) {
      charactersUsedText.style.color = "red";
      setTimeout(function() {
        charactersUsedText.style.color = "#6f6f6f";
      }, 50);

      messageTextarea.value = messageTextarea.value.slice(0, 1000);
    }
    charactersUsedText.textContent = messageTextarea.value.length + "/1000";
  });
});