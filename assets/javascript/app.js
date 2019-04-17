
//set variable for writing to html
var displayContent = $('#gameContent');

//store value of timer in variable 
var timerValue = 20;

//add questions in an array to loop through later
var questions = [{    
    question: "Who is Mai and Shu's leader?",
    answerChoices: ["Pilaf", "Garlic Jr.", "Launch", "Commander Red"],
    correctChoice: "Pilaf",
    gif: "assets/images/pilaf.gif"
},  {
    question: "Which character won the Tournament of Power?",
    answerChoices: ["Frieza", "Goku", "Android 17", "Jiren"],
    correctChoice: "Android 17",
    gif: "assets/images/android17.gif"
},  {
    question: "Who of the following is not a member of the Ginyu Force?",
    answerChoices: ["Jeice", "Guldo", "Recoome", "Zarbon"],
    correctChoice: "Zarbon",
    gif: "assets/images/ginyuforce.gif"
}, {
    question: "What is Goku's original name?",
    answerChoices: ["Son Goku", "Kakarot", "Raditz", "Carrot"],
    correctChoice: "Kakarot",
    gif: "assets/images/kakarot.gif"
}, {
    question: "What is Bulma's dad's name?",
    answerChoices: ["Dr. Brief", "Mr. Bloomers", "Dr. Tenma", "Mr. Mime"],
    correctChoice: "Dr. Brief",
    gif: "assets/images/bulmasdad.gif"
}, {
    question: "Which of the following is not one of Ribrianne's moves?",
    answerChoices: ["Bubble Love", "Ribrianne Eternal Love", "Love Wand", "Big Amour"],
    correctChoice: "Bubble Love",
    gif: "assets/images/universe2.gif"
}, {
    question: "Who is the strongest human?",
    answerChoices: ["Mr. Satan", "Yamcha", "Krillin", "Uub"],
    correctChoice: "Uub",
    gif: "assets/images/uub.gif"
}, {
    question: "Who is Yamcha's best friend?",
    answerChoices: ["Oolong", "Puar", "Whis", "Piccolo"],
    correctChoice: "Puar",
    gif: "assets/images/puar.gif"
}, {
    question: "What is Goku's granddaughter's name?",
    answerChoices: ["Videl", "Kefla", "Pan", "Android 18"],
    correctChoice: "Pan",
    gif: "assets/images/pan.gif"
}, {
    question: "What high school does Gohan go to?",
    answerChoices: ["Satan City HS", "Martial Arts HS", "West City HS", "Orange Star HS"],
    correctChoice: "Orange Star HS",
    gif: "assets/images/gohan.gif"
}];
//store values in trivia game 
var trivia = {
    questions: questions,
    currentQ: 0,
    clock: timerValue,
    correct: 0,
    incorrect: 0,
    missed: 0,
    tickingClock: function () {
        trivia.clock--;
        $('#secondsLeft').html(trivia.clock);

        if (trivia.clock === 0) {
            trivia.outOfTime();
        }
    },
    // show questions in order on page with buttons
    questionDisplay: function () {
        //set amount of time to display questions and choices
        timer = setInterval(trivia.tickingClock, 1000);
        //set for loop to display questions and make for loop to display answer choices in order
        displayContent.html('<h2>' + questions[this.currentQ].question + '</h2>');
        for (var i = 0; i < questions[this.currentQ].answerChoices.length; i++) {
            displayContent.append('<button class="choices" id="button"' + 'data-name="' + questions[this.currentQ].answerChoices[i] + '">' + questions[this.currentQ].answerChoices[i] + '</button>');
        }
    },
    nextQuestion: function () {
        trivia.clock = timerValue;
        $('#secondsLeft').html(trivia.clock);
        trivia.currentQ++;
        trivia.questionDisplay();
    },
    //set function to reset timer and display the right answer when player doesn't answer in time
    outOfTime: function () {
        clearInterval(timer);
        $('#secondsLeft').html(trivia.clock);
        displayContent.html("<h2>you took too long!</h2>");
        displayContent.append('<h2>The answer is: ' + questions[this.currentQ].correctChoice);
        displayContent.append('<img src="' + questions[this.currentQ].gif + '" />');
    //3 seconds then show the next question
        if (trivia.currentQ === questions.length - 1) {
            setTimeout(trivia.result, 3 * 1000);
        } else {
            setTimeout(trivia.nextQuestion, 3 * 1000);
        }
    },
    //stop timer when button is selected and see if the value of the button selected matches the correct answer and execute according function in if else
    selected: function (e) {
        clearInterval(timer);
        
        if ($(e.target).data("name") === questions[this.currentQ].correctChoice) {
            this.correctlySelected();
        } else {
            this.incorrectlySelected();
        }
    },
    //add function for if answered correctly
    correctlySelected: function () {
        //add one point to correct clock
        trivia.correct++;
        //stop timer
        clearInterval(timer);
        //overwrite questions on page with winning announcement
        displayContent.html('<h2>' + questions[trivia.currentQ].correctChoice + ' is correct!</h2>');
        //add gif of the correct answer
        displayContent.append('<img src="' + questions[trivia.currentQ].gif + '" />');
        //display result for 3 seconds 
        if (trivia.currentQ === questions.length - 1) {
            setTimeout(trivia.result, 3 * 1000);
        } else {
            setTimeout(trivia.nextQuestion, 3 * 1000);
        }
    },
    //add function for if answered incorrectly
    incorrectlySelected: function () {
        //and one point to incorrect clock
        trivia.incorrect++;
        //stop timer
        clearInterval(timer);
        //overwrite questions on page with "wrong" announcement
        displayContent.html('<h2>Wrong!</h2>');
        //display correct answer
        displayContent.append('<h2>The correct answer is: ' + questions[trivia.currentQ].correctChoice + '</h2>');
        //add gif of the correct answer
        displayContent.append('<img src="' + questions[trivia.currentQ].gif + '" />');
        //display result for 3 seconds 
        if (trivia.currentQ === questions.length - 1) {
            setTimeout(trivia.result, 3 * 1000);
        } else {
            setTimeout(trivia.nextQuestion, 3 * 1000);
        }
    },
     //function for how to display the results on the page and add replay button
     result: function () {
        clearInterval(timer);
        displayContent.html('<h2>SCORE:</h2>');
        $('#secondsLeft').html(trivia.clock);
        displayContent.append('<h2>Correct: ' + trivia.correct + '</h2>');
        displayContent.append('<h2>Incorrect: ' + trivia.incorrect + '</h2>');
        displayContent.append('<h2>Missed: ' + (questions.length - (trivia.incorrect + trivia.correct)) + '</h2>');
        displayContent.append('<br><button id="replay">replay?</button>');
    },
    //reset rules to retart trivia without reloading the page
    reset: function () {
        this.currentQ = 0;
        this.clock = timer;
        this.correct = 0;
        this.incorrect = 0;
        this.questionDisplay();
    }
};
// add click events for buttons
//start game with start button
//reset trivia with button, doesnt reload the browser
//make answer choices clickable
$(document).on('click', '#start', function (e) {
    $('#timerDisplay').prepend('<h2>Time Remaining: <span id="secondsLeft">20</span> seconds</h2>');
    trivia.questionDisplay();
});
$(document).on('click', '#replay', function (e) {
    trivia.reset();
});
//run selected function
$(document).on('click', '.choices', function (e) {
    trivia.selected(e);
});

