var word;

function displaySearchImage(){
    word= $("#term-input").val().trim();
    var key= "?key=11051593-a4e6d6adfc2d65d6b9612b399&q";
    var queryUrl= "https://pixabay.com/api/";
    $("#image").empty();
    $.ajax({
        url: queryUrl + key + "&q=" + word + "&",
        method:"GET"
    }).then(function(response){

    var imagess = $("<img>").attr("src", response.hits[0].largeImageURL);
    $("#image").empty();
    $("#image").append(imagess);

    var results = response;
    console.log(response);

});
}

$(".search").on("click", function(event){
  event.preventDefault();
  var word= $("#term-input").val().trim();
  displaySearchImage();
});
