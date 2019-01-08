//Question object that contains
var questions = [{
    //qustion
    q: "What is Captain America's sheild made of?",
    //correct answer
    correctAnswer: "Vibranium" ,
    //array of incorrect answers
    incorrectAnswers: ["Adamantium", "Kryptonite", "Chrome" ],
    //url for gif after question is done
    gif: "captain-america.gif"
},{
        q: "What is the name of Tony Stark's personal butler?",
        correctAnswer: "Jarvis",
        incorrectAnswers: ["Alfred", "Jeeves", "Hal" ],
        gif: "jarvis.gif"
  },
    {
        q: "In the Infinity Wars movies, what is Thanos trying to collect?", correctAnswer: "The Infinity Stones",
        incorrectAnswers: ["The Infinity Gems", "The Chaos Emeralds", "The Sacred Jewels"],
        gif: "infinity-stones.gif"
    },
    {
        q: "Who is Thor's adopted sibling?", correctAnswer: "Loki", incorrectAnswers: ["Odin", "Erik Selvig", "Laufey"],
        gif: "loki.gif"
    },
    {
        q: "Who is the director of S.H.E.I.L.D and developer of the Avengers' Initiative", correctAnswer: "Nick Fury",
        incorrectAnswers: ["Captain America", "Tony Stark", "Thor"],
        gif: "nick-fury.gif"
    },
    {
        q:"What was Dr. Strange's profession before he became Sorcerer Supreme?", correctAnswer: "neurosurgeon", 
        incorrectAnswers:["professor","dermatologist","dentist"],
        gif: "dr-strange.gif"
    },
    {
        q:"What is the name of Peter Quill's superhero persona?", correctAnswer: "Star-Lord", 
        incorrectAnswers:["Groot","Drax","Zurg"],
        gif: "star-lord.gif"
    },
    {
        q:"What actor plays Tony Stark", correctAnswer: "Robert Downey Jr.", incorrectAnswers:["Elijah Wood", "Chris Pratt", "Chris Hemsworth"],
        gif: "tony-stark.gif"
    },
    {
        q:"Who does Bruce Banner become?", correctAnswer: "Hulk", incorrectAnswers:["Spiderman", "Ironman", "Daredevil"],
        gif: "hulk.gif"
    },
    {
        q:"Who is the leader of Wakanda", correctAnswer: "Black Panther", incorrectAnswers:["Iron Fist", "Kain", "Aquaman"],
        gif: "black-panther.gif"
    }

]
//Player's Score
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
//index of correct answer
var correctInd =0;
//Current Question Object
var currentQuestion = {
    //question
    disQ: " ",
    //array of answers
    answers: [
        //answer 1
        " ",
        //answer 2
        " ",
        //answer 3
        " ",
        //answer 4
        " "
    ],
    //timer
    timeleft: 15,
    //source of fun gif or pic
    funGif: " ",
    //Assign answer to answers array
    assignAnswer: function (ans){
        //pick a random number 0-3
        var index = Math.floor(Math.random()* 4);
        //if there is no answer in the slot 
        if (this.answers[index] === " "){
            this.answers[index] = ans;
        }
        else{
            this.assignAnswer(ans);
        }
    }
}
//function that assigns question
var assignQuestion = function(){
    //reset answers
    for (k = 0; k < 4; k++){
        currentQuestion.answers[k] = " ";
    }
    //picks question
    currentQuestion.disQ = questions[questionIndex].q;
    //assign correct answer to a slot
    currentQuestion.assignAnswer(questions[questionIndex].correctAnswer);
    //assign incorrect answers to a slot
    for ( i = 0; i < 3; i++){
        currentQuestion.assignAnswer(questions[questionIndex].incorrectAnswers[i]);
    }
    $("#question").empty();
    $("#question-gif").empty();
    //Adds question to the dom
    $("#question").append("<div class='row'><div class='col'>" + currentQuestion.disQ + "</div></div>");

        var val = 0;
        //Adds answers to dom
        for (j = 0; j < 4; j++){
            //The correct answer is given a value of 1
            if (currentQuestion.answers[j] === questions[questionIndex].correctAnswer){
                val = 1;
                correctInd = j;
            }
            //All other answers will be given a value of 0
            else{
                val = 0;
            }
            //The answer is added to the dom as an html element
            $("#question").append("<div class='row'><div class='col'><button class='playerAns' value =" + val + ">" + currentQuestion.answers[j] + "</button></div></div>");
    }
    //resetting the timer
    currentQuestion.timeleft =15;
    $("#timer").html("<h4>" + currentQuestion.timeleft + "</h4>");
    timer();
}
//function that will update the display according to the result of the current question, it will use the arguments
// correct, incorrect, and timeup 
var questionResult = function(result){
    $("#question").empty();
    switch(result){
        //the player clicked the correct answer
        case "correct":
            $("#question").append("<div class = 'row'><div class='col'>Correct!</div></div>");
            numCorrect++;
        break;
        //the player clicked an incorrect answer
        case "incorrect":
            $("#question").append("<div class = 'row'><div class='col'>Incorrect!</div></div>");
            $("#question").append("<div class = 'row'><div class='col'>The correct answer was: " + currentQuestion.answers[correctInd] + "</div></div>");
            numIncorrect++;
            break;
        //the player ran out of time
        case "timeup":
            $("#question").append("<div class = 'row'><div class='col'>Time is up!</div></div>");
            $("#question").append("<div class = 'row'><div class='col'>The correct answer was: " + currentQuestion.answers[correctInd] + "</div></div>");
            numUnanswered++;
            break;
    }
    $("#question-gif").append("<img class='img-fluid mx-auto d-block resultgif' src=assets/images/" + questions[questionIndex].gif + " alt='question-gif'/>");
    questionIndex++;
    clearInterval(intervalId);
    //if there are questions left
    if(questionIndex < questions.length){
        //after 5 seconds a new question will be chosen
        setTimeout(assignQuestion, 5000);
    }
    else{
        //otherwise the gameover screen will be displayed after 5 seconds
        setTimeout(gameover, 5000);
    }
}
//function that is called when there are no more questions
var gameover = function(){
    $("#question").empty();
    $("#question-gif").empty();
    $("#question").append("<div class = 'row'><div class='col'>That's all of the questions! Here's your score</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>Correct Answers: " + numCorrect+ "</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>Incorrect Answers: " + numIncorrect+ "</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>Unanswered Questions: " + numUnanswered+ "</div></div>");
    $("#restart").append("<button>Restart</button>");
}

//timer logic
var intervalId;

function timer() {
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    currentQuestion.timeleft--;
    $("#timer").html("<h4>" + currentQuestion.timeleft + "</h4>");
    if (currentQuestion.timeleft === 0) {
        clearInterval(intervalId);
        questionResult("timeup");
    }
}

//question index
var questionIndex = 0;
   
$(document).ready(function () {
    //start button that will assign the first word to the currentWord object 
    $("#start").on("click","button", function (){
        //Adds timer to dom
        $("#timer-con").append("<div class='row'><div id=timer class='col'><h4>" + currentQuestion.timeleft + "</h4></div></div>");
        assignQuestion();
        //start button is removed
        $("#start").empty();
    })
    //When the player picks an answer
    $("#question").on("click", "button", function () {
        //If the answer is correct call the proper function
        if (this.value == 1) {
            console.log("correct answer picked");
            questionResult("correct");
        }
        //else the answer is incorrect call the proper function
        else {
            console.log("incorrect answer picked");
            questionResult("incorrect");
        }
    })
    //restart button that is added after the game over funciton is called
    $("#restart").on("click","button", function(){
        $("#question").empty();
        $("#start").append("<button>Start</button>");
        $("#restart").empty();
        $("#timer-con").empty();
        //resetting variables
        questionIndex=0;
        numCorrect=0;
        numIncorrect=0;
        numUnanswered=0;
    })
});