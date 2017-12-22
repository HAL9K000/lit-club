"use strict";
const slideshows = $(".slideshow");
const slideshowIndicators = $(".slideshow-indicator");
const advanceDuration_ms = 5000;

var isAnimating = false;

function getCurrentImage(slideshowIndex) {
  return slideshows.eq(slideshowIndex).find("img.curr").eq(0);
}
function getIndicator(slideshowIndex, currentImage) {
  return slideshowIndicators.eq(slideshowIndex).eq(slideshows.eq(slideshowIndex).index(currentImage));
}
function getImages(slideshowIndex) {
  return slideshows.eq(slideshowIndex).find("img");
}

function update(slideshowIndex, currentImage, newImage) {
  currentImage.animate({
    opacity: 0
  }, 200, function() {
    getIndicator(currentImage).removeClass("curr");
    currentImage.removeClass("curr");
    newImage.css("opacity", 0).addClass("curr").animate({
      opacity: 1
    }, 200, function () {
        getIndicator(newImage).addClass("curr");
      isAnimating = false;
    });
  } );
}
function previous(slideshowIndex) {
  isAnimating = true;
  const currentImage = getCurrentImage(slideshowIndex);
  var newImage = currentImage.prev("img");
  if(newImage.length === 0) {
    const images = getImages(slideshowIndex);
    newImage = images.eq(images.length - 1);
  }
  update(slideshowIndex, currentImage, newImage);
}
function next(slideshowIndex) {
  isAnimating = true;
  const currentImage = getCurrentImage(slideshowIndex);
  var newImage = currentImage.next("img");
  if(newImage.length === 0) {
    newImage = getImages(slideshowIndex).eq(0);
  }
  update(slideshowIndex, currentImage, newImage);
}

$(document).ready(function() {
  $(".slideshow-indicator").each(function() {
    var indicators = "";
    for(var i=0; i < $(this).prev(".slideshow").find("img").length; ++i) {
      indicators += "<span />\n";
    }
    $(this).html(indicators);
  });
    setInterval(function() {
      if(!isAnimating) {
        for(var i = 0; i < slideshows.length; ++i) {
          next(i);
        }
      }
    }, advanceDuration_ms);
});

const slideshowIndicatorElements = $(".slideshow-indicator span");

slideshowIndicatorElements.click(function() {
  const slideshow = $(this).parent().prev(".slideshow");
  const slideshowIndex = slideshows.index(slideshow);
  update(slideshowIndex, getCurrentImage(slideshowIndex), slideshow.eq(slideshowIndicatorElements.index($(this))));
})
