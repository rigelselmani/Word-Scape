var word;

function displaySearchImage(){
    word= $("#term-input").val().trim();
    var key= "?key=11502071-ba3908e891baf3bab9b03bc38";
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
