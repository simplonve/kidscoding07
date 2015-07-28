$(document).ready(function() {
  $(window).scroll(function(){
    var scrolltop = $(window).scrollTop();
    var h = $(window).height();
    var div = $('.kc-topnav');

    if(scrolltop > h){
      if(div.css('opacity') == 0){
        div.animate({opacity: 1, top: "0px"}, 200);
      }
    }else{
      if(div.css('opacity') > 0){
        div.animate({opacity: 0, top: "-70px"}, 200);
      }
    }
  });
});