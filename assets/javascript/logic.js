$(document).ready(function() {

// ********** LOGIC FOR HOME PAGE **********
// Notifies the user of characters remaining in ownDefinition
var text_max = 140;
$("#textarea_feedback").html("Characters remaining: " + text_max);
$("#ownDefinition").keyup(function() {
    var text_length = $("#ownDefinition").val().length;
    var text_remaining = text_max - text_length;
    $('#textarea_feedback').html("Characters remaining: " + text_remaining);
});

// ********** LOGIC FOR SCAPE-STACK **********
var stackArray = [];
var stackWord;
var stackDef;
function popStackArray() {
    stackArray = [];
    for (i=0; i < localStorage.length; i++) {
        var stackWord = localStorage.key(i);
        var stackDef = localStorage.getItem(stackWord);
        stackArray.push([stackWord, stackDef]);
        
    }
    console.log(stackArray);

    for (i=0; i < stackArray.length; i++) {
        console.log(stackWord);
        console.log(stackDef);
        stackWord = localStorage.key(i);
        stackDef = localStorage.getItem(stackWord);
        var container = $("#stackGrid");
        var emptyDiv = $("<div>");
        var flashcards = $("<div>").addClass("uk-card uk-card-default uk-card-hover uk-card-body");
        var h = $("<h3>").addClass("uk-card-title stackWord");
        var p = $("<p>").addClass("stackDef");
        h.html(stackWord);
        h.append("<hr class=\"stackHr\">")
        p.html(stackDef);
        flashcards.append(h);
        flashcards.append(p);
        emptyDiv.append(flashcards);
        container.append(emptyDiv);
    }
}
popStackArray();

// ********** LOGIC FOR PRONUNCIATION **********
var myArray = [];

function displayPronunciation() {
    // Grab the term from the input form
    var word= $("#term-input").val().trim();
    var key= "?key=1f40dde8-50d6-4eb6-9168-6f465c469eb9";
    var queryUrl= "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
    
    // Clear out divs and arrays
    $("#pronunciations").empty();
    myArray = [];

    // Send query to Ajax
    $.ajax({
        url: queryUrl + word + key,
        method:"GET"
    }).then(function(response) {
        // Populate the array
        // For each item in the response array
        for (var i=0; i<response.length; i++) {
            // Skip if the item doesn't have a prs parameter
            if (response[i].hwi.prs == undefined) {
            // If it has a prs parameter, then get the pos (fl) and prs
            } else {
                var flValue = response[i].fl;
                var prsArray = response[i].hwi.prs;
                // For each item in the prs array
                for (var j=0; j<prsArray.length; j++) {
                    // Skip if the prs doesn't have a sound parameter with it
                    var wordArray = [];
                    if (prsArray[j].sound == undefined) {
                        // Skip here if undefined
                    } else if ((myArray.toString()).includes(prsArray[j].sound.audio) == true) {
                    } else {
                        // If it has a sound parameter, grab the written pronunciation and audio file name, and along with flValue, send to myArray
                        var writtenPron = prsArray[j].mw;
                        var audioPron = prsArray[j].sound.audio;
                        // Push the fl (pos), mw (written pronunciation) and audio (sound file name) into an array
                        wordArray.push(flValue, writtenPron, audioPron);
                        myArray.push(wordArray);
                    }; // End of nested if statement
                }; // End of nested for statement
            }; // End of first if statement
        }; // End of for response.length statement

        // Create Divs for each item in myArray
        for (var i=0; i < myArray.length; i++) {
            var pos = myArray[i][0];
            var pron = myArray[i][1];
            var file = myArray[i][2];
            // Logic for subdirectory in order to create url
            var uniChar = file.slice(0,1);
            var biChar = file.slice(0,2);
            var triChar = file.slice(0,3);
            var subDir = "";
            if (triChar == "bix") {
                subDir = "bix";
            } else if (biChar == "gg") {
                subDir = "gg";
            } else if (alphabetic(uniChar) == true) {
                subDir = uniChar;
            } else {
                subDir = "number";
            }
            // Function to check letters
            function alphabetic(inputtxt) {
                var letters = /^[a-zA-Z]+$/;
                if ((inputtxt.match(letters))) {
                    return true;
                } else {
                    return false; 
                }
            }
            var dDefault = $("<div>").addClass("uk-card").addClass("uk-card-default");
            var dBody = $("<div>").addClass("uk-card-body");
            var h = $("<h3>").addClass("uk-card-title");
            var p = $("<p>").addClass("partofspeech");
            var dBottom = $("<div>").addClass("uk-card-media-bottom");
            var url = "https://media.merriam-webster.com/soundc11/" + subDir + "/" + file + ".wav";
            h.text(pron);
            p.text(pos);
            dBody.append(h);
            dBody.append(p);
            dDefault.append(dBody);
            dBottom.append("<audio id=\"embed_player\" src=" + url + " autostart=\"false\" controls=\"true\"></audio>");
            dDefault.append(dBottom);
            $("#pronunciations").append("<hr>");
            $("#pronunciations").append(dDefault);
        } // End of for myArray.length statement
        $("#pronunciations").append("<br><br><br><br>"); 
    }); // End of Ajax function
} // End of displayPronunciation function

$(".search").on("click", function(event){
    event.preventDefault();
    var word = $("#term-input").val().trim();
    displayPronunciation();
}); // End of search button click function


// // ********** LOGIC FOR PRACTICE.HTML **********
var wordArray = [];
var wordLearned = 0;
var outerIndex = 0;
var wordIndex = 0;
var defIndex = 1;
var stackEnded = false;

// Grab words and definitions from local storage and push to array
function popArray() {
    wordArray = [];
    for (i=0; i < localStorage.length; i++) {
        var word = localStorage.key(i);
        var def = localStorage.getItem(word);
        wordArray.push([word, def]);
        // localStorage.clear();

    }
}

function loadPractice() {
    wordLearned = 0;
    outerIndex = 0;
    popArray();
    stackEnded = false;

    function shuffleArray(array) {
        for (let i = wordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
    }
    shuffleArray();

    $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
    $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
    $("#wordCountDiv").text(wordArray.length);
    $("#wordLearnedDiv").text(wordLearned)

}; // End of loadPractice function

// WHEN user clicks on the word
$(this).on("click", "#wordDiv", function() {
    if (stackEnded == false) {
        $("#wordDefDiv").show();
        $("#wordDefDiv").addClass("uk-animation-scale-up");
    }
});

// WHEN user clicks on Beginning button
$(this).on("click", "#btnBegin", function() {
    if (wordArray.length == 0) {
        endStack();
    } else if (wordArray.length > 0) {
        outerIndex = 0;
        stackEnded = false;
        $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
        $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
    }
});

function endStack() {
    var endOfStack = "— End of stack. —"
    $("#wordDiv").html(endOfStack);
    $("#wordDefDiv").hide();
    stackEnded = true;
};

// WHEN user clicks on Next button
function nextWord() {
    if (outerIndex > wordArray.length) {
        endStack();
    } else if (outerIndex == wordArray.length) {
        endStack();
    } else if (outerIndex < wordArray.length) {
        outerIndex++;
        if (outerIndex == wordArray.length) {
            endStack();
        } else if (outerIndex < wordArray.length) {
            $("#wordDiv").text(wordArray[outerIndex][wordIndex]);
            $("#wordDefDiv").text(wordArray[outerIndex][defIndex]).hide();
        }
    }
}

$(this).on("click", "#btnNext", function() {
    if (outerIndex <= wordArray.length - 1) {
        nextWord();
    }
});

// WHEN user clicks on GotIt button
$(this).on("click", "#btnGotIt", function() {
    if (wordArray.length == 0) {
        endStack();
    } else if (stackEnded == true) {
        // Do nothing 
    } else if (wordArray.length > 0) {
        wordArray.splice(outerIndex, 1);
        $("#wordCountDiv").text(wordArray.length);
        wordLearned++;
        $("#wordLearnedDiv").text(wordLearned);
        outerIndex--;
        nextWord();
    }
});

// WHEN user clicks on StartOver button
$(this).on("click", "#btnStartOver", function() {
    loadPractice();
});

loadPractice();

}); // End of $(document).ready function