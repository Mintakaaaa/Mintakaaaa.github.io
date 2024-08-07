document.addEventListener("DOMContentLoaded", function() {

  let notif = document.querySelector("#notif");
  let notifx = document.querySelector("#notif-x");

  notifx.addEventListener("click", function() {
    notif.style.display = "none";
  });

  setTimeout(function() {
    notif.style.display = "block";
  }, 1000);

});