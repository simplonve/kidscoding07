$(document).ready(function() {
  $('.kc-openmenu').click(function() {
    $('.kc-menu').animate({
        opacity: 1,
        top: "0%",
      }, 600);
  });

  $('.kc-closemenu').click(function() {
    $('.kc-menu').animate({
        opacity: 0,
        top: "-100%",
      }, 600);
  });
});