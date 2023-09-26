/*
    'quiz-area' elements
*/
const quizArea = document.getElementById('quiz-area');
const timeBoard = document.getElementById('time');
const scoreBoard = document.getElementById('inst-score-heading');
const quizInstBoard = document.getElementById('quiz-inst');
const quizFeedback = document.getElementById('quiz-feedback');

const instructionsText = quizInstBoard.innerText;
const instructionsHeader = scoreBoard.innerText;

const buttonsList = [
    document.getElementById('answer-1'),
    document.getElementById('answer-2'),
    document.getElementById('answer-3'),
    document.getElementById('answer-4')
];

const buttonNext = document.getElementById('next');
const buttonResetStart = document.getElementById('reset-start');

/*
    'quiz-finale' elements
*/
const quizFinale = document.getElementById('quiz-finale');
const quizFinaleHead = document.getElementById('quiz-finale-head');
const quizFinaleMessage = document.getElementById('quiz-finale-message');
const buttonClose = document.getElementById('button-close');

// timeInverval is expressed in seconds
const timeInterval = 60;

/**
 * All global variables are stored here as properties
 * of paramPubQuiz.
 * 
 */
const paramsPubQuiz = {
    score: 0,

    /*
        timer property keeps track of time remaining in seconds.

        timerID is used by SetInterval() in eventResetStart() function.
    */
    timer: timeInterval,
    timerID: 0,

    /*
        questionList contains an array of integers arranged in 
        random order representing each question in listOfQuestions.
    */
    questionList: [],

    currentAnswerOptions: [],
    currentQuestion: 0,
    
    /*
        repondToAnswerButtonEvents is by eventAnswerButton() function to
        prevent it from reponding to user taps or clicks.
        Although it would have been simpler to use the 
        'disabled' attribute that would have resulted in
        the button being 'greyed out'. To prevent the 'greying out'
        the property is used instead.
    */    
    respondToAnswerButtonEvents: false
};

/**
 * Number of possible answer options.
 * 
 */
const numOfOptions = 4;

/**
 * Colors used to color the background on buttons
 * these constants below are used by
 * 
 * showIsAnswerCorrect() function.
 * 
 */
const colorCorrect = 'green';
const colorWrong = 'red';

/**
 * The constant below is used by
 * 
 * resetButtonsBackgroundColor() function.
 * 
 */
const colorOriginal = buttonsList[0].style.backgroundColor;

/**
 * List of 10 questions
 * with correct answer and other possible answers.
 * 
 */
const listOfQuestions = [
    
    {
        question: 'What is the capital city of Czech Republic?',
        answer: 'Prague',
        option1: 'Bratislava',
        option2: 'Budapest',
        option3: 'Minsk'
    },

    {
        question: 'What is the chemical symbol of aluminium?',
        answer: 'Al',
        option1: 'At',
        option2: 'As',
        option3: 'Ar'
    },

    {
        question: 'Which country won the FIFA world cup in 2006?',
        answer: 'Italy',
        option1: 'France',
        option2: 'Portugal',
        option3: 'Germany'
    },

    {
        question: 'What is the capital city of Estonia?',
        answer: 'Tallinm',
        option1: 'Vilnius',
        option2: 'Riga',
        option3: 'Tartu'
    },

    {
        question: 'What is the capital city of Slovenia?',
        answer: 'Ljubljana',
        option1: 'Zagreb',
        option2: 'Sarajevo',
        option3: 'Podgorica'
    },

    {
        question: 'What is the chemical symbol of sodium?',
        answer: 'Na',
        option1: 'S',
        option2: 'Si',
        option3: 'Sr'
    },

    {
        question: 'What is the chemical symbol of tungsten?',
        answer: 'W',
        option1: 'Ta',
        option2: 'Te',
        option3: 'Sr'
    },

    {
        question: 'What is the alternative name for the chemical element tungsten?',
        answer: 'wolfram',
        option1: 'antimony',
        option2: 'bismuth',
        option3: 'bauxite'
    },

    {
        question: 'Who was the director of the film Apollo 13?',
        answer: 'Ron Howard',
        option1: 'Steven Spielberg',
        option2: 'James Cameron',
        option3: 'Alan Parker'
    },

    {
        question: 'In which country does Oktoberfest takes place?',
        answer: 'Germany',
        option1: 'Austria',
        option2: 'Switzerland',
        option3: 'Luxembourg'
    }
];

document.addEventListener('DOMContentLoaded', function(event) {

    // The first thing to do is display the form.
    
    document.getElementsByTagName('main').item(0).style.display = 'block';

    for(let btttn of buttonsList) {
        btttn.addEventListener('click', eventAnswerButton);
    }
    
    buttonNext.addEventListener('click', eventNext);
    buttonResetStart.addEventListener('click', eventResetStart);
    buttonClose.addEventListener('click', eventClose);
});

/**
 * Generate a list of unique random integers from 0 to
 * numOfElements and return them in an array.
 * 
 * The argument numOfElements must be an integer otherwise
 * this functions throws an exception.
 * 
 */
function generateArrayOfRanNums(numOfElements) {
    
    if (Number.isInteger(numOfElements)) {

        let arrOfNums = [];
        let ranNum = 0;
    
        for(let c = 0; c < numOfElements; c++) {
            
            do {
                ranNum = parseInt(Math.random() * numOfElements);

                /* 
                    The use of the short hand notation in the find() was copied and
                    modified from the MDN site. The link is below
                    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
                */
            } while (arrOfNums.find((element) => element === ranNum) !== undefined);
            
            arrOfNums.push(ranNum);
        }
    
        return arrOfNums;
    } else {
        
        throw new Error('numOfElements must be an integer');
    }
}

/**
 * Generate an array of possible answers in random order.
 * Each element in the array is an object containing
 * these properties: answerOption, isCorrect.
 * 
 * answerOption:   a string of a possible answer
 * isCorrent:      contains a boolean indicating whether
 *                 answerOption is the correct answer.
 * 
 * The argument questionAnswers has to be of type object with
 * the following properties:
 *     question,
 *     answer,
 *     option1,
 *     option2,
 *     option3
 * 
 * otherwise it throws an exception and it immediately aborts.
 * 
 */
function generateArrayOfAnswers(questionAnswers) {
    
    if (typeof(questionAnswers) === 'object' &&
        questionAnswers.hasOwnProperty('question') &&
        questionAnswers.hasOwnProperty('answer') &&
        questionAnswers.hasOwnProperty('option1') &&
        questionAnswers.hasOwnProperty('option2') &&
        questionAnswers.hasOwnProperty('option3') ) {
        
        let ansArrList = generateArrayOfRanNums(numOfOptions);
        let answerList = [];

        for (let i = 0; i < numOfOptions; i++) {
            
            switch (ansArrList[i]) {
                case 0:
                    answerList.push( {
                        answerOption: questionAnswers.answer,
                        isCorrect: true
                    } );
                    break;

                case 1:
                    answerList.push( {
                        answerOption: questionAnswers.option1,
                        isCorrect: false
                    } );
                    break;

                case 2:
                    answerList.push( {
                        answerOption: questionAnswers.option2,
                        isCorrect: false
                    } );
                    break;

                case 3:
                    answerList.push( {
                        answerOption: questionAnswers.option3,
                        isCorrect: false
                    } );
                    break;
            }
        }

        return answerList;
    } else {
        
        throw new Error('questionAnswers must be object type with the correct properties.');
    }
}

function haltGameShowResult() {

    stopTimerEvent();
    switchToStart();
    showFinaleMessage();
}

function stopTimerEvent() {

    clearInterval(paramsPubQuiz.timerID);
}

/**
 * Set the button with id attribute 'reset-start'
 * to Start functionality.
 * 
 */
function switchToStart() {

    timeBoard.innerText = '';
    quizFeedback.innerText = '';
    quizInstBoard.innerText = instructionsText;
    scoreBoard.innerText = instructionsHeader;

    // Clear all texts from answer buttons
    for (let button of buttonsList) {
        button.innerText = '';
    }
 
    resetButtonsBackgroundColor();

    buttonResetStart.setAttribute('data-fieldtype', 'start');
    buttonResetStart.innerText = 'Start';
    buttonNext.disabled = true;
    paramsPubQuiz.respondToAnswerButtonEvents = false;
}

/**
 * Reset all properties in paramsPubQuiz
 * 
 */
function resetParamsPubQuiz() {

    paramsPubQuiz.score = 0;
    paramsPubQuiz.timer = timeInterval;
    paramsPubQuiz.currentQuestion = 0;
    paramsPubQuiz.questionList = generateArrayOfRanNums(listOfQuestions.length);
}

function resetButtonsBackgroundColor() {

    for(let bttnElement of buttonsList) {
        bttnElement.style.backgroundColor = colorOriginal;
    }
}

function showFinaleMessage() {
    
    let scoreMessage =
        `You've scored ${paramsPubQuiz.score} out of ${listOfQuestions.length}!`;

    if (paramsPubQuiz.score === listOfQuestions.length) {

        quizFinaleHead.innerText = 'Congratulations!';
        scoreMessage = `You've got all ${listOfQuestions.length} questions right!`;
    } else if (paramsPubQuiz.timer === 0) {

        quizFinaleHead.innerText = 'Times Up!';
    } else {

        quizFinaleHead.innerText = '';
    }

    quizFinaleMessage.innerText = scoreMessage;

    quizArea.style.display = 'none';
    quizFinale.style.display = 'block';
}

/**
 * Change background color of button pressed
 * according whether the player is correct or not.
 * 
 * argument: index must be an integer.
 * 
 * otherwise an exception will be thrown.
 * 
 */
function showIsAnswerCorrect(index) {

    if (Number.isInteger(index)) {

        if (paramsPubQuiz.currentAnswerOptions[index].isCorrect) {
            
            buttonsList[index].style.backgroundColor = colorCorrect;
            quizFeedback.innerText = 'Correct !';
            paramsPubQuiz.score++;
            showScore();
            
        } else {

            buttonsList[index].style.backgroundColor = colorWrong;
 
            let correctAnswer = paramsPubQuiz.currentAnswerOptions.
                find((element) => element.isCorrect === true).answerOption;
                
            quizFeedback.innerText = `Wrong! The correct answer is ${correctAnswer}`;
        }

    } else {

        throw new Error('index must be an integer');
    }
}

/**
 * Display the question
 * 
 * Set all answer buttons
 * 
 */
function showNextQuestion () {

    if (paramsPubQuiz.currentQuestion === listOfQuestions.length) {

        haltGameShowResult();        
    } else {

        let quizIndex = paramsPubQuiz.questionList[paramsPubQuiz.currentQuestion];
        quizInstBoard.innerText = listOfQuestions[quizIndex].question;
    
        let listOfAnswers = generateArrayOfAnswers(listOfQuestions[quizIndex]);
        paramsPubQuiz.currentAnswerOptions = listOfAnswers;
    
        for (let indx = 0; indx < buttonsList.length; indx++) {
            buttonsList[indx].innerText = listOfAnswers[indx].answerOption;
        }
    
        resetButtonsBackgroundColor();
    
        quizFeedback.innerText = '';
        buttonNext.disabled = true;
        paramsPubQuiz.respondToAnswerButtonEvents = true;
        paramsPubQuiz.currentQuestion++;
    } 
}

function showScore() {

    scoreBoard.innerText = `Score is ${paramsPubQuiz.score} of ${listOfQuestions.length}`;
}

/**
 * All the functions that handle events
 * are here below.
 * 
 */

function eventAnswerButton(event) {
 
    if (paramsPubQuiz.respondToAnswerButtonEvents) {
        
        showIsAnswerCorrect(buttonsList.indexOf(this));

        buttonNext.disabled = false;

        // Prevent this event from reponding to user's taps
        // or clicks until the next question is displayed.
        paramsPubQuiz.respondToAnswerButtonEvents = false;
    }
}

function eventNext(event) {
    
    showNextQuestion();
}

function eventResetStart(event) {
    
    if (buttonResetStart.getAttribute('data-fieldtype') === 'start') {

        resetParamsPubQuiz();
        showScore();
        showNextQuestion();

        buttonResetStart.setAttribute('data-fieldtype', 'reset');
        buttonResetStart.innerText = 'Reset';
        paramsPubQuiz.respondToAnswerButtonEvents = true;

        paramsPubQuiz.timerID = setInterval(eventTimer, 1000);
        timeBoard.innerText = `Time remaing is ${paramsPubQuiz.timer} seconds`;
    
    } else if (buttonResetStart.getAttribute('data-fieldtype') === 'reset') {

        stopTimerEvent();
        switchToStart();
    }
}

function eventClose(event) {

    quizFinale.style.display = 'none';
    quizArea.style.display = 'block';
}

function eventTimer(event) {

    if (paramsPubQuiz.timer > 0) {

        timeBoard.innerText = `Time remaing is ${paramsPubQuiz.timer--} seconds`;
    } else {

        haltGameShowResult();
    }
}