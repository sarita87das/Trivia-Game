// set of questions
var questions = [
    {
        question: "Who is the president of united states of america?",
        choice: ["George Bush", "Evanka trump", "Hillary clinton", "Donald Trump"],
        correctAns: "Donald Trump"
    }, {
        question: "Which Apollo mission landed the first humans on the Moon?",
        choice: ["Apollo 7", "Apollo 9", "Apollo 11", "Apollo 13"],
        correctAns: "Apollo 11"
    }, {
        question: "Lady Gaga and Bradley Cooper are starcast of which movie?",
        choice: ["Titanic", "Shallows", "La La Land", "A Star Is Born"],
        correctAns: "A Star Is Born"
    }, {
        question: " What is the title of the comedy horror film starring Woody Harrelson released on Friday?",
        choice: ["Zombiedude", "Zombiefest", "Zombieland", "Zombieville"],
        correctAns: "Zombieland"
    }, {
        question: "What conditions are required for the ice crystal formation known as diamond dust?",
        choice: ["Very cold and dry", "Very windy", "Very humid", "Very calm"],
        correctAns: "Very cold and dry"
    }, {
        question: "What are the the five senses of human?",
        choice: ["vision", "Hearing and Taste", "Smell & Touch", "All Listed"],
        correctAns: "All"
    }, {
        question: "What nationality is the car manufacturer BMW?",
        choice: ["American", "British", "German", "Swedish"],
        correctAns: "German"
    }
]

// setting variables 
var intervalId;
var counter = 15;
var qcount = 0;
var choicePicked = "";
var win = 0;
var lose = 0;
var unAns = 0;

//...after clicking this button, game will start
$("#letsBegin").on("click", function () {
    //...letsBegin button  will disappear after clicking..
    $("#letsBegin").css("display", "none");

    //..it loads the questions 
    loadQuestion();
    run();

});

//...timer
function run() {
    counter = 15;
    intervalId = setInterval(decrement, 1000);
}
//timer
function decrement() {
    counter--;
    $("#clock").html(counter);
    if (counter === 0) {
        //..it will show timeout and correct answer
        losefunc();
        unAns++;
    }
}
//timer
function stop() {
    clearInterval(intervalId);
    intervalId = 0;
}

function loadQuestion() {
    queAndCho = "<p>" + questions[qcount].question + "</p>" +
        "<p class ='choice'>" + questions[qcount].choice[0] + "</p>" +
        "<p class ='choice'>" + questions[qcount].choice[1] + "</p>" +
        "<p class ='choice'>" + questions[qcount].choice[2] + "</p>" +
        "<p class ='choice'>" + questions[qcount].choice[3] + "</p>"
    $("#clock").html("15");
    $("#display").html(queAndCho);
    $(".choice").on("click", function () {
        choicePicked = $(this).text();
        checkAnswer(choicePicked);
    });
}

function checkAnswer(ans) {
    if (ans === questions[qcount].correctAns) {
        //...stop timer
        stop();
        //correct answer then call 
        $("#display").html("<img src='babyhappypic.jpg'>")
        win++
        //settimeout to the next question
        setTimeout(nextQuestion, 2000);
    } else {
        lose++
        losefunc();
    }

}

function nextQuestion() {
    qcount++
    if (qcount < questions.length) {
        loadQuestion();
        run();
    } else {
        //.. call the result after last question..
        finalResult();
    }
}

function losefunc() {
    stop();
    //..It shows that you are wrong and give you the correct answer
    $("#display").html("<img src = 'sadbabypic.jpg'>" + "</br><p>" + "The correct answer is: " + questions[qcount].correctAns + "</p>");
    //settimeout to the next question
    setTimeout(nextQuestion, 2000);
}

//...it shows the result in the last page
function finalResult() {
    $("#display").html("<p>" + "Correct Answers: " + win + "</p>" +
        "<p>" + "Incorrect Answers: " + lose + "</p>" +
        "<p>" + "Unanswered: " + unAns + "</p>" +
        "<button id = 'tryAgain' class = 'btn btn-lg btn-danger'>" + "Try Again" + "</button>");

    $("#tryAgain").on("click", function () {
        reset();
        loadQuestion();
        run();
    });
}
//..it will reset the game to play again
function reset() {
    //...change the question order
    questions.sort(function () {
        return 0.5 - Math.random();
    });
    counter = 15;
    qcount = 0;
    choicePicked = "";
    win = 0;
    lose = 0;
    unAns = 0;
}