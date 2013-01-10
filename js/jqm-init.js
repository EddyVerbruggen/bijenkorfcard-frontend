"use strict";

// override some jqm defaults, need to be done before jqm is loaded
$(document).bind("mobileinit", function(){
  $.mobile.page.prototype.options.domCache = true;
  $.mobile.pushStateEnabled = false;
  $.mobile.defaultPageTransition = "slide";
  $.event.special.swipe.horizontalDistanceThreshold = 60; // default is 30, but swipe is triggered too often for my taste

  // page loading widget (only required for login)
  $.mobile.loader.prototype.options.text = "U wordt ingelogd..";
  $.mobile.loader.prototype.options.textVisible = true;
  $.mobile.loader.prototype.options.theme = "b";
//  $.mobile.loader.prototype.options.html = "";
});