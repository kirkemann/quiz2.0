/* ----------------------------
/*  Name: quiz 2.0
    Author: Frank
    Version: 2.1
/* -------------------------- */

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA= document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter= document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Lave spørgsmål

let questions = [
    {
        question : "What does HTML stand for",
        imgSrc : "./assets/images/html.png",
        choiceA : "Correct",
        choiceB : "wrong",
        choiceC : "wrong",
        correct : "A"

    },
    {
        question : "What does CSS stand for",
        imgSrc : "./assets/images/css.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"

    },
    {
        question : "What does CSS stand for",
        imgSrc : "./assets/images/css.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"

    },
    {
        question: "Hvad betyder MAGNO på latinsk",
        imgSrc: "./assets/images/DramaticQuestionMark.png",
        choiceA: "Den Hurtige",
        choiceB: "Den Lille",
        choiceC: "Den Store",
        correct: "C"

    },
    {
        question: "Hvem opfandt JavaScript?",
        imgSrc: "./assets/images/js.png",
        choiceA: "John Resig",
        choiceB: "Brendan Eich",
        choiceC: "Mitchell Baker",
        correct: "B"

    },
    {
        question: "Hvem sørgede for kage op til efterårsferien??",
        imgSrc: "./assets/images/cake.png.png",
        choiceA: "Gandalf",
        choiceB: "Marianne",
        choiceC: "Julemanden",
        correct: "B",
    },
    {
        question : "Inside which HTML element do we put the JavaScript?",
        imgSrc : "./assets/images/javas1.jpg",
        choiceA : "Javascript",
        choiceB : "js",
        choiceC : "script",
        correct : "C"

    },
    {
        question : "Hvad er specielt ved const?",
        imgSrc : "./assets/images/const.png",
        choiceA : "Kan få givet en værdi ligemeget hvornår",
        choiceB : "Kan ikke få tildelt en ny værdi",
        choiceC : "At den definerer en konstant værdi",
        correct : "B"
    },
    {
        question: "Hvad hedder vores uddannelse?",
        imgSrc: "./assets/images/html.png",
        choiceA: "Webintegrator",
        choiceB: "Webudvikler",
        choiceC: "Fronted Udvikler",
        correct: "B"
    },
    {
        question: "Hvis man lider af Hippopotomonstrosesquippedaliophobia - hvad er det så man frygter?",
        imgSrc: "./assets/images/frygt.jpg",
        choiceA: "Lange ord",
        choiceB: "Opvaskebaljer",
        choiceC: "Flodheste",
        correct: "A"
    }
]
    // Lave nogle variabler

    const lastQuestion = questions.length - 1;
    let runningQuestion = 0;
    let count = 0;
    const questionTime = 10; // 10s
    const gaugeWhidth = 150; // 150px
    const gaugeUnit = gaugeWhidth / questionTime;
    let TIMER
    let score = 0;

    // render a question
    function renderQuestion() {
        let q = questions[runningQuestion];

        question.innerHTML = "<p>" + q.question + "</p>";
        qImg.innerHTML ="<img src="+ q.imgSrc +">";
        choiceA.innerHTML = q.choiceA; 
        choiceB.innerHTML = q.choiceB;
        choiceC.innerHTML = q.choiceC;
    }

    start.addEventListener("click", startQuiz);

    // Start quiz
    function startQuiz(){   
        start.style.display = "none";
        renderQuestion();
        quiz.style.display = "block";
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter, 1000); //1000 = 1s
    }

    // render progress

    function renderProgress() {
        for(let qindex = 0; qindex <= lastQuestion; qindex++){
            progress.innerHTML += "<div class='prog' id="+ qindex +"></div>";
        }
    }

    // counter render

    function renderCounter() {
        if(count <= questionTime){
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count++
        }else {
            count = 0;
            // Answer is Wrong
            // Change progress color to red
            answerIsWrong()
            if(runningQuestion < lastQuestion) {
                runningQuestion++;
                renderQuestion();
            }else {
                // end the quizand show the score
                clearInterval(TIMER);
                scoreRender();
            }
        }
    }

    // CheckAnswer
    
    function checkAnswer(answer) {
        if(answer == questions[runningQuestion].correct){
            // Answer is Correct
            score++
            // Change progress color to green
            answerIsCorrect()
        } else{
            // Answer is Wrong
            // Change progress color to red
            answerIsWrong()
        }
        count = 0;
        if(runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        }else {
            // end the quizand show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }

    // Answer is Correct
    function answerIsCorrect(){
        document.getElementById(runningQuestion).style.backgroundColor = "#0f0"
    }
    // Answer is Wrong
    function answerIsWrong(){
        document.getElementById(runningQuestion).style.backgroundColor = "#f00"
    }

    // Score Render
    function scoreRender(){

        scoreDiv.style.display = "block";

        // calculate the amount of question percent answered by the user

        const scorePerCent = Math.round(100 * score/questions.length);

        // choose the image based on the scorePerCent
        let img = 
        (scorePerCent >= 100) ? "./assets/images/winner.jpg" :
        (scorePerCent >= 80) ? "./assets/images/5.png" :
        (scorePerCent >= 60) ? "./assets/images/4.png" :
        (scorePerCent >= 40) ? "./assets/images/3.png" :
        (scorePerCent >= 20) ? "./assets/images/2.png" :
        "./assets/images/1.png";

        scoreDiv.innerHTML = "<img src="+ img +">";
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

    } 


