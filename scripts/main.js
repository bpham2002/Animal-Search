 $("#find-animal").on("click", function(event) {

     event.preventDefault();
     var animal = $("#animal-input").val();
     $("#animal-input").val("")
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=LFgFpS2OEIqA5rdjTV3wRBooTxkoyQjl&limit=10";
     $("#animal-button").prepend("<button class='" + animal + "'></button> ")
     $("." + animal).text(animal)
     $(document).on("click", "." + animal, function() {
         $.ajax({
                 url: queryURL,
                 method: "GET"
             }).then(function(response) {
                 console.log(response.data[0])
                 $("#animal-view").empty()
                 for (var j = 0; j < Math.floor(response.data.length / 3); j++) {
                     $("#animal-view").append($("<div class ='row' id = '" + j + "'></div>"))
                 }
                 for (var i = 0; i < response.data.length; i++) {

                     var image_still = response.data[i].images.fixed_height_still.url
                     var image_animate = response.data[i].images.fixed_height.url
                     var rating = response.data[i].rating
                     if (i < 3) {
                         $("#2").append($("<div class = 'col-md-4'><P>Rate:'" + JSON.stringify(rating) + "'</P><img src='" + image_still + "' data-still='" + image_still + "' data-animate='" + image_animate + "' data-state= 'still' id = '" + i + "' class= 'gif mx-auto d-block'></div>"))
                     } else if (i > 2 && i < 6) {
                         $("#1").append($("<div class = 'col-md-4'><P>Rate:'" + JSON.stringify(rating) + "'</P><img src='" + image_still + "' data-still='" + image_still + "' data-animate='" + image_animate + "' data-state= 'still' id = '" + i + "' class= 'gif mx-auto d-block'></div>"))

                     } else {
                         $("#0").append($("<div class = 'col-md-3'><P>Rate:'" + JSON.stringify(rating) + "'</P><img src='" + image_still + "' data-still='" + image_still + "' data-animate='" + image_animate + "' data-state= 'still' id = '" + i + "' class= 'gif mx-auto d-block'></div>"))

                     }

                 }
                 $(document).on("click", ".gif", function() {
                     var state = $(this).attr("data-state")
                     console.log(state)
                     if (state === "still") {
                         $(this).attr("data-state", "animate")
                         $(this).attr("src", $(this).attr("data-animate"))
                     } else {
                         $(this).attr("data-state", "still")
                         $(this).attr("src", $(this).attr("data-still"))
                     }
                 });
             })
             .catch(function(err) {
                 console.log(err)

             })

     })
 });