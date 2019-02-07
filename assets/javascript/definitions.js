
$("#stackCounter").html(scapeCounter);

function displaySearchTerm() {


    word = $("#term-input").val().trim();
    console.log(word);

$("#definition").empty();

$.ajax({
    url: queryUrl + word + key,
    method:"GET"
}).then(function(response){
    var results= response;
    console.log(response);
// for (var i=0; i<results.length; i++) {
    var mean1 = response[0].shortdef[0]; 
    var meanTwo = response[0].shortdef[1];
    var meanThree = response[0].shortdef[2];
    var meanFour = response[0].shortdef[3];

if (response[i] == undefined) {
    var meanDiv = $("<div>");
    var p= $("<p>");
    p.text(mean1);  
    var p2= $("<p>")
    p2.text(meanTwo);
    var p3= $("<p>");
    p3.text(meanThree);
    var p4=$("<p>");
    p4.text(meanFour);
    
    meanDiv.append(p, p1, p2, p3,p4);
    $("#definition").append(meanDiv);


    var input = $("#term-input").val("");
} else if (response[i].fl!=("idiom")){
    // for (var i=0; i<response.length; i++){
    // }
    // localStorage.clear();
    var meanDiv = $("<div>");
    var p= $("<p>");
    p.text(mean1);  
    var p2= $("<p>")
    p2.text(meanTwo);
    var p3= $("<p>");
    p3.text(meanThree);
    var p4=$("<p>");
    p4.text(meanFour);
    
    meanDiv.append(p, p1, p2, p3,p4);
    $("#definition").append(meanDiv);

    // var meanDiv = $("<div>");
    // var p= $("<p>");
    // p.text(term);  
    // var pTwo= $("<p>")
    // pTwo.text(termTwo);
    // var pThree= $("<p>");
    // pThree.text(termThree);
    // var pFour=$("<p>");
    // pFour=$("<p>");
    // termDiv.append(p, pTwo, pThree, pFour);
    // $("#definition").append(termDiv);


    var input = $("#term-input").val("");


};
  

// }
});

}

<<<<<<< HEAD
$(".save").on("click", function (event) {

    var ownDef = $("#ownDefinition").val().trim();
    for (var i = 0; i < ownDef.length; i++) {

        var newDef = [];
        newDef.push(ownDef);
        localStorage.setItem(word, ownDef);
        $("#ownDefinition").val(""); // Added by Rafael to clear out textarea box after Save is clicked
        scapeCounter = localStorage.length;
        console.log(scapeCounter);
        $("#stackCounter").html(scapeCounter);
        $("#stackCounter").addClass(uk - animation - shake);
        // localStorage.setItem("Terms: " , JSON.stringify(storageInfoG));
=======
$(".save").on("click", function(event){
    
    var ownDef= $("#ownDefinition").val().trim();
    for (var i=0; i<ownDef.length; i++){

    var newDef=[];
    newDef.push(ownDef);
    localStorage.setItem(word, ownDef);
    $("#ownDefinition").val(""); // Added  to clear out textarea box after Save is clicked
    scapeCounter = localStorage.length;
    console.log(scapeCounter);
    $("#stackCounter").html(scapeCounter);
    $("#stackCounter").addClass(uk-animation-shake);
    // localStorage.setItem("Terms: " , JSON.stringify(storageInfoG));
>>>>>>> 7e64d51f812b56b8b42a3849817b86020c6cd7a3
    }
}); //end of click listener


$(".search").on("click", function (event) {

    event.preventDefault();

    var word = $("#term-input").val().trim();

    displaySearchTerm();

});

// $(document).on("click", ".search", displaySearchTerm);