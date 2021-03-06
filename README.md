
# Famous Athletes Gifs

## What is Famous Athletes Gifs?

Famous Athletes Gifs is a [JavaScript](https://en.wikipedia.org/wiki/JavaScript) and [jQuery](https://jquery.com/) powered gif-generating webpage that offers users a way of seeing gifs of their favorite athletes from the [Giphy API](https://github.com/Giphy).

## What does Famous Athletes Gifs do?

- The webpage lists 15 buttons, each of which has the name of a famous athlete already on it. When a button is clicked the web page calls the  [Giphy API](https://github.com/Giphy) and grabs 10 gif images of the famous athlete and prepends the static version of the images to the page.

- Famous Athletes Gifs also allows for the user to create their own buttons with famous athletes of their choice so they can see gifs from any and all athletes.

- For each gif generated, the user has the option to animate the gif by simply clicking on the gif image. The user can also stop the animation by clicking on the image a second time.


## How does Famous Athletes Gifs work?

Famous Athletes Gifs uses [JavaScript](https://en.wikipedia.org/wiki/JavaScript) and [jQuery](https://jquery.com/) to update the HTML on the webpage, and performs `$.ajax`  GET requests to the [Giphy API](https://github.com/Giphy) to get the gifs shown on the webpage.

**Generating Gifs**

After the webpage has loaded, an `array` holding strings of names of famous athletes is used to generate a labeled button for each athlete. When generated, each button is given a `data-name` attribute equal to the string name of the famous athlete it represents, and this value is captured when a button triggers a `click` event. The captured value is then used to build the query URL sent to the [Giphy API](https://github.com/Giphy).


**User Added Buttons**

Under the list of athlete buttons there is a form that allows the user to enter their own string value of a famous athlete. When submitted the input value is added to the end of the `topics` array by using the  `.push()`  method. The page then re-renders the buttons with the new addition.


**Animating the Gifs**

By initially appending each generated gif's `<image>` element the following attributes:
```
.attr("src", stillGifSrc)  				// stillGifSrc is a variable that holds the still gif image source
.attr("gif-still", stillGifSrc)			// 'gif-still' attribute is added for when the user animated the gif but wants to go back to 'still'
.attr("state", "still")					// state is initially set to 'still'
.attr("gif-animate", animateGifSrc)	 	// animateGifSrc is a variable that holds the animated gif image source
```

We are able to toggle between animated and non-animated gifs with each `click` event registered on the image with the following code:
```
$(image).on("click", function () {
 var state = $(this).attr("state"); 				// state grabs value of 'still' or 'animate'
 if (state  ===  "still") {							// if state is 'still'
  $(this).attr("src", $(this).attr("gif-animate"));	// change the 'src' to the value of the 'gif-animate' attribute	
  $(this).attr("state", "animate");					// change state to 'animate'
 } else  if (state  ===  "animate") {				// if state is 'animate'
  $(this).attr("src", $(this).attr("gif-still"));	// change the 'src' to the value of the 'gif-still' attribute
  $(this).attr("state", "still");					// change the state to 'still'
 }
});
```

The user can generate as many buttons and gifs as they'd like. Each set of 10 gifs will be added on top of the gifs already on the page.


## Technologies Used


HTML

[BootStrap](https://getbootstrap.com/)

JavaScript

[jQuery](https://jquery.com/)

[Giphy API](https://github.com/Giphy)