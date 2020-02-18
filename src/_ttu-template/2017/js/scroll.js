$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
	  console.log("hash click");
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if(this.hash.slice(1) == "top") {
			target = $("body");
		}
	  if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 200
        }, 1000);
        return false;
      }
    }
  });
  if(location.hash) {
	var target = location.hash;  
	  target = target.toString().replace(/\./g, '\\.'); // added support for periods (.) in hash
	  target = $(target);
	 if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 200
        }, 1000);
        return false;
      }
  }
});
