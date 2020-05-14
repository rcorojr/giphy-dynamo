 // Initial array of characters
 var characters = ["Harry Potter", "Albus Dumbledore", "Lucius Malfoy", "Severus Snape"];

 // displaycharacterInfo function re-renders the HTML to display the appropriate content
 function displayPotterverseInfo() {

   var character = $(this).attr("data-name");
   var queryURL = "api.giphy.com/v1/gifs/random?api_key=cz8O9ixLJfRaCdt4Tof9PEYuxvrXx2Kz&tag=" + character;

   // Creating an AJAX call for the specific character button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

     // Creating a div to hold the character
     var characterDiv = $("<div class='character'>");

     // Storing the rating data
     var rating = response.Rated;

     // Creating an element to have the rating displayed
     var pOne = $("<p>").text("Rating: " + rating);

     // Displaying the rating
     characterDiv.append(pOne);

     // Storing the release year
     var released = response.Released;

     // Creating an element to hold the release year
     var pTwo = $("<p>").text("Released: " + released);

     // Displaying the release year
     characterDiv.append(pTwo);

     // Storing the plot
     var plot = response.Plot;

     // Creating an element to hold the plot
     var pThree = $("<p>").text("Plot: " + plot);

     // Appending the plot
     characterDiv.append(pThree);

     // Retrieving the URL for the image
     var imgURL = response.Poster;

     // Creating an element to hold the image
     var image = $("<img>").attr("src", imgURL);

     // Appending the image
     characterDiv.append(image);

     // Putting the entire character above the previous characters
     $("#potterverse-view").prepend(characterDiv);
   });

 }

 // Function for displaying character data
 function renderButtons() {

   // Deleting the characters prior to adding new characters
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of characters
   for (var i = 0; i < characters.length; i++) {

     // Then dynamicaly generating buttons for each character in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of character-btn to our button
     a.addClass("character-btn");
     // Adding a data-attribute
     a.attr("data-name", characters[i]);
     // Providing the initial button text
     a.text(characters[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where a character button is clicked
 $("#add-character").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var character = $("#character-input").val().trim();

   // Adding character from the textbox to our array
   characters.push(character);

   // Calling renderButtons which handles the processing of our character array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "character-btn"
 $(document).on("click", ".character-btn", displaycharacterInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();
