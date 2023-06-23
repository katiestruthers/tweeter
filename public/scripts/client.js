/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-disable no-undef */

$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweet">
      <header>
        <span>
          <img src="${tweet.user.avatars}">
          <span>${tweet.user.name}</span>
        </span>
        <span>${tweet.user.handle}</span>
      </header>
      <div>
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
      </article>`);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    // Empty container to avoid reduplication of data
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/tweets'
    }).then(function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    $(".form-error").slideUp();

    // Validate correct form submission
    const dataArr = data.split('=');
    const value = dataArr[1];
    if (!value) {
      $("#form-error-empty").slideDown();
      return;
    }
    if (value.length > 140) {
      $("#form-error-too-long").slideDown();
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data,
    }).then(function() {
      loadTweets();
    });

    // Clear the input field & reset counter
    $('#tweet-text').val('');
    $('.counter').val('140');
  });
});