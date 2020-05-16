 // Initial array of characters
 var characters = ["Harry Potter", "Albus Dumbledore", "Lucius Malfoy", "Severus Snape"];

 // displaycharacterInfo function re-renders the HTML to display the appropriate content
 function displayCharacterInfo() {

   var character = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cz8O9ixLJfRaCdt4Tof9PEYuxvrXx2Kz&q=" + "harry+potter+"  + character + "&limit=10";

   // Creating an AJAX call for the specific character button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
    $("#character-view").html("");
     console.log(response);
     var results = response.data;


     for (var i=0; i<results.length; i++) {
      var characterDiv = $("<div>");
      characterDiv.attr('class', 'character');

      var rating = results[i].rating;
      var ratingDiv = $("<div>");
      ratingDiv.attr('class', 'rating');
      ratingDiv.html("<p>" + rating + "</p>");


     // Retrieving the URL and rating for the image
     var stillURL = results[i].images.fixed_height_small_still.url;
     var animatedURL = results[i].images.fixed_height_small.url;
     

     var newImg = $("<img>");
      newImg.attr("class", "gif");
      newImg.attr("src", stillURL);
      newImg.attr("data-still", stillURL);
      newImg.attr("data-animate", animatedURL);
      newImg.attr("data-state", "still");
      
      


     // Appending the image and rating
     characterDiv.append(rating);
     characterDiv.append(newImg);

     // Putting the entire character above the previous characters
     $("#character-view").prepend(characterDiv);
     }
     


   });


 }

 // Function for displaying character data
 function renderButtons() {

   // Deleting the characters prior to adding new characters
   
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
 $(document).on("click", ".character-btn", displayCharacterInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();

 $( document ).ready(function() {

  $(document).on('click','.gif', function(){

    console.log("Registered Gif Click");

    var state = $(this).attr("data-state");
    if (state == 'still'){
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr('data-state', 'animate');
    }
    if (state == 'animate'){
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr('data-state', 'still');
    }
});


});
