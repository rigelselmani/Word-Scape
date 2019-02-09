var word;
var scapeCounter = localStorage.length; //  populate counter
$("#stackCounter").html(scapeCounter);

function displaySearchTerm(){

    
    word= $("#term-input").val().trim();
    console.log(word);
    var key= "?key=1f40dde8-50d6-4eb6-9168-6f465c469eb9";
    //var key="?=06cc2566-21f4-43bf-b336-4d2b93510efa"
    var queryUrl= "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
$("#definition").empty();

$.ajax({
    url: queryUrl + word + key,
    method:"GET"
}).then(function(response){
    var results= response;
    console.log(response);
// for (var i=0; i<results.length; i++) {
    var term = response[0].shortdef[0]; 
    var termTwo = response[0].shortdef[1];
    var termThree = response[0].shortdef[2];
    var thermFour = response[0].shortdef[3];

if (response[i] == undefined) {
    var termDiv = $("<div>");
    var p= $("<p>");
    p.text(term);  
    var pTwo= $("<p>")
    pTwo.text(termTwo);
    var pThree= $("<p>");
    pThree.text(termThree);
    var pFour=$("<p>");
    pFour=$("<p>");
    termDiv.append(p, pTwo, pThree, pFour);
    $("#definition").append(termDiv);


    var input = $("#term-input").val("");
} else if (response[i].fl!=("idiom")){
    // for (var i=0; i<response.length; i++){
    // }
    // localStorage.clear();

    var termDiv = $("<div>");
    var p= $("<p>");
    p.text(term);  
    var pTwo= $("<p>")
    pTwo.text(termTwo);
    var pThree= $("<p>");
    pThree.text(termThree);
    var pFour=$("<p>");
    pFour=$("<p>");
    termDiv.append(p, pTwo, pThree, pFour);
    $("#definition").append(termDiv);


    var input = $("#term-input").val("");


};
  

// }
});

}

$(".save").on("click", function(event){
    
    var ownDef= $("#ownDefinition").val().trim();
    for (var i=0; i<ownDef.length; i++){

    var newDef=[];
    newDef.push(ownDef);
    localStorage.setItem(word, ownDef);
    $("#ownDefinition").val(""); // Added by Rafael to clear out textarea box after Save is clicked
    scapeCounter = localStorage.length;
    console.log(scapeCounter);
    $("#stackCounter").html(scapeCounter);
    $("#stackCounter").addClass(uk-animation-shake);
    // localStorage.setItem("Terms: " , JSON.stringify(storageInfoG));
    }
 }); //end of click listener


$(".search").on("click", function(event){
   
    event.preventDefault();

    var word= $("#term-input").val().trim();

    displaySearchTerm();

});

// $(document).on("click", ".search", displaySearchTerm);