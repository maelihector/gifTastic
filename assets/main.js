$(document).ready(function () {
  // Initial array of topics
  var topics = ["Serena Williams", "Cristiano Ronaldo", "Rafael Nadal", "Tom Brady", "Guillermo Ochoa",
    "Simone Biles",
    "Manu Ginobili", "Gerard Pique", "James Rodriguez", "Russell Westbrook",
    "Lindsey Vonn", "Nick Young", "Roger Federer", "Neymar", "Vince Wilfork"
  ];

  // Function to render appropriate topics
  function displayGif() {
    // Get reference to which athelete the user wants
    var gif = $(this).attr("data-name");
    // Query Giphy API along with althlete name, api key, and query parameters of rating=pg, and limit=10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gif + "&api_key=HxF2W3delLN8HvwXkOdecyRXMrU3FzgS&rating=pg&limit=10";

    // Perform an AJAX GET request to the queryURL
    $.ajax({
        url: queryURL,
        method: "GET",
        datatype: "json"
      })
      // When query resolves, create elements to hold gifs and append to the DOM
      .then(function (response) {
        // Fetch `data` from response object
        var results = response.data;
        // Loop through the result (which holds 10 seperate gifs)
        for (var i = 0; i < results.length; i++) {
          // Create a <div> to hold the gif and add CSS
          var gifDiv = $("<div>").addClass("gifStyle");
          // Retrieve the URL for the still gif
          var stillGif = results[i].images.original_still.url;
          // Retrieve the URL for the animated gif
          var animateGif = results[i].images.original.url;

          // Create <img> and add class and needed attributes
          var image = $("<img>").attr({
            "src": stillGif,
            "gif-still": stillGif,
            "state": "still",
            "gif-animate": animateGif,
            "alt": "famous athlete"
          }).addClass("gif");

          // Retrieve the rating and add to <p> element
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);

          // Event listener to toggle gif animation
          $(image).on("click", function () {
            // Get the state of the clicked on gif
            var state = $(this).attr("state");
            // Toggle between state="still" and state="animate" with each click
            if (state === "still") {
              $(this).attr("src", $(this).attr("gif-animate"));
              $(this).attr("state", "animate");
            } else if (state === "animate") {
              $(this).attr("src", $(this).attr("gif-still"));
              $(this).attr("state", "still");
            }
          });

          // Append the image
          gifDiv.append(image);
          // Append the paragraph
          gifDiv.append(p);

          // Append gifts to the DOM
          $("#gifs-view").prepend(gifDiv);
        }
      });
  }

  // Function for generating gif buttons
  function renderButtons() {

    // Delete the gifs prior to re-looping through the array
    $("#buttons-view").empty();

    // Loop through topics array
    for (var i = 0; i < topics.length; i++) {
      // Generate a button for each gif in the array
      var a = $("<button>");
      // Add a class of gif-btn to each button
      a.addClass("gif-btn btn btn-primary");
      // Add an attribute of data-name to each button
      a.attr("data-name", topics[i]);
      // Label the button with the array item string
      a.text(topics[i]);
      // Add the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // Functions to handle button sumbit event
  $("#add-gif").on("click", function (event) {

    event.preventDefault();

    // Grab the input from the textbox, trim white space
    var gif = $("#gif-input").val().trim();

    // Prevent submit if text-input field is empty
    if (gif.length === 0) {
      alert("Text-box is empty!");
      return false;
    }

    if (topics.indexOf(gif) > -1) return;
    // Push new gif to topics array
    topics.push(gif);

    // Call renderButtons() to re-render button list with newly added button
    renderButtons();

    // Empty text field
    $("#gif-input").val('');
  });

  // Call the renderButtons function to display the intial buttons
  renderButtons();

  // Add a click event listener to new all elements with a class of "gif-btn" and run displayGif function when clicked
  $(document).on("click", ".gif-btn", displayGif);

});