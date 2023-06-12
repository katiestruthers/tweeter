/* eslint-disable no-undef */
$(document).ready(function() {
  const maxChars = 140;
  const counter = $('#tweet-text').next().children(".counter");

  $('#tweet-text').on('input', function(event) {
    const charsLeft = maxChars - event.target.textLength;

    if (charsLeft >= 0) {
      counter.html(charsLeft).css("color", "#545149");
    } else {
      counter.html(charsLeft).css("color", "red");
    }
  });
});