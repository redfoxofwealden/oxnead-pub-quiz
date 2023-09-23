const timeBoard = document.getElementById('time');
const scoreBoard = document.getElementById('inst-score-heading');
const quizInstBoard = document.getElementById('quiz-inst');

const instructionsText = quizInstBoard.innerText;
const instructionsHeader = scoreBoard.innerText;

const buttonAnswer01 = document.getElementById('answer-1');
const buttonAnswer02 = document.getElementById('answer-2');
const buttonAnswer03 = document.getElementById('answer-3');
const buttonAnswer04 = document.getElementById('answer-4');

const buttonNext = document.getElementById('next');
const buttonResetStart = document.getElementById('reset-start');

/**
 * All global variables are stored here as properties
 * 
 */
const paramsPubQuiz = {
    score: 0,
    timer: 99,
    questionList: [],
    currentAnswerOptions: [],
    currentQuestion: 0,
    isGameInPlay: false
};

/**
 * List of 10 questions
 * with correct answer and alternatives
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

/**
 * Number of possible answers
 */
const numOfOptions = 4;

/**
 * Colors used to color the background on buttons
 * 
 */
const colorCorrect = 'green';
const colorWrong = 'red';
const colorCurrent = buttonAnswer01.style.backgroundColor;


document.addEventListener('DOMContentLoaded', function(event) {

    /*
        The first thing to do is display the form.
    */
    document.getElementsByTagName('main').item(0).style.display = 'block';

    /*
        Add event handlers
    */
    buttonAnswer01.addEventListener('click', eventAnswerButton01);
    buttonAnswer02.addEventListener('click', eventAnswerButton02);
    buttonAnswer03.addEventListener('click', eventAnswerButton03);
    buttonAnswer04.addEventListener('click', eventAnswerButton04);

    buttonNext.addEventListener('click', eventNext);
    buttonResetStart.addEventListener('click', eventResetStart);
});

/**
 * Generate a list of unique random integers from 0 to
 * numOfElements and return them in an array.
 * 
 * The parameter numOfElements must be of type number otherwise
 * this functions returns undefined.
 * 
 */
function generateArrayOfRanNums(numOfElements) {
    
    if (typeof(numOfElements) === 'number') {

        let arrOfNums = [];
        let ranNum = 0;
    
        for(let c = 0; c < numOfElements; c++) {
            
            do {
                ranNum = parseInt(Math.random() * numOfElements);
            } while(arrOfNums.find((element) => element === ranNum) !== undefined);
            
            arrOfNums.push(ranNum);
        }
    
        return arrOfNums;
    } else {
        return undefined;
    }
}

/**
 * Generate an array of possible answers
 * in random order. 
 * 
 * The parameter questionAnswer has to be of type Object with
 * question, answer, option1, option2, option3 properties
 * otherwise it returns undefined.
 * 
 */
function generateArrayOfAnswers(questionAnswers) {
    
    if (questionAnswers !== null && typeof(questionAnswers) === 'object') {
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
        
        return undefined;
    }
}

/**
 * Reset all properties in paramsPubQuiz
 * 
 */
function resetGame() {

    paramsPubQuiz.score = 0;
    paramsPubQuiz.timer = 99;
    paramsPubQuiz.currentQuestion = 0;
}

function resetButtonsBackgroundColor() {

    buttonAnswer01.style.backgroundColor = colorCurrent;
    buttonAnswer02.style.backgroundColor = colorCurrent;
    buttonAnswer03.style.backgroundColor = colorCurrent;
    buttonAnswer04.style.backgroundColor = colorCurrent;
}

/**
 * 
 */
function setBackgroundButtonColor(index, backgroundColour) {

    if (typeof(index) === 'number' && typeof(backgroundColour) === 'string') {

        switch (index) {

            case 0:
                buttonAnswer01.style.backgroundColor = backgroundColour;
                break;

            case 1:
                buttonAnswer02.style.backgroundColor = backgroundColour;
                break;

            case 2:
                buttonAnswer03.style.backgroundColor = backgroundColour;
                break;

            case 3:
                buttonAnswer04.style.backgroundColor = backgroundColour;
                break;

        }
    } else {

        throw new Error('index, background must be of correct type');
    }
}

/**
 * Change background color of button pressed
 * according whether the player is correct or not.
 * 
 */
function showIsAnswerCorrect(index) {

    if (typeof(index) === 'number') {

        let currentMessage = '';

        if (paramsPubQuiz.currentAnswerOptions[index].isCorrect) {
            
            setBackgroundButtonColor(index, colorCorrect);

            currentMessage = quizInstBoard.innerText;
            currentMessage += 'Correct!';
            quizInstBoard.innerText = currentMessage;
        } else {

            setBackgroundButtonColor(index, colorWrong);
 
            let correctAnswer = paramsPubQuiz.currentAnswerOptions.
                find((element) => element.isCorrect === true).answerOption;
            
            currentMessage = quizInstBoard.innerText;
            currentMessage +=  `Wrong! The correct answer is ${correctAnswer}`;
            quizInstBoard.innerText = currentMessage;
        }

        buttonNext.disabled = false;
        paramsPubQuiz.isGameInPlay = false;
    } else {

        throw new Error('index must be of type number');
    }
}

/**
 * Display the question
 * 
 * Set all answer buttons
 * 
 */
function showNextQuestion () {

    quizInstBoard.innerText = listOfQuestions[paramsPubQuiz.currentQuestion].question;

    let listOfAnswers = generateArrayOfAnswers(listOfQuestions[paramsPubQuiz.currentQuestion]);
    paramsPubQuiz.currentAnswerOptions = listOfAnswers;

    buttonAnswer01.innerText = listOfAnswers[0].answerOption;
    buttonAnswer02.innerText = listOfAnswers[1].answerOption;
    buttonAnswer03.innerText = listOfAnswers[2].answerOption;
    buttonAnswer04.innerText = listOfAnswers[3].answerOption;

    resetButtonsBackgroundColor();

    paramsPubQuiz.isGameInPlay = true;
    buttonNext.disabled = true;
    paramsPubQuiz.currentQuestion++;
}

function Test() {
    
    console.log('Test function called');
}

Test();

/**
 * event functions
 */

function eventAnswerButton01(event) {
 
    if (paramsPubQuiz.isGameInPlay) {

        showIsAnswerCorrect(0);
    }
}

function eventAnswerButton02(event) {

    if (paramsPubQuiz.isGameInPlay) {
        
        showIsAnswerCorrect(1);
    }
}    


function eventAnswerButton03(event) {

    if (paramsPubQuiz.isGameInPlay) {
        
        showIsAnswerCorrect(2);
    }
}

function eventAnswerButton04(event) {

    if (paramsPubQuiz.isGameInPlay) {

        showIsAnswerCorrect(3);
    }
}

function eventNext(event) {
    
    showNextQuestion();
}

function eventResetStart(event) {
    
    if (buttonResetStart.getAttribute('data-fieldtype') === 'start') {

        resetGame();
        showNextQuestion();

        buttonResetStart.setAttribute('data-fieldtype', 'reset');
        buttonResetStart.innerText = 'Reset';

        paramsPubQuiz.isGameInPlay = true;
    
    } else if (buttonResetStart.getAttribute('data-fieldtype') === 'reset') {

        quizInstBoard.innerText = instructionsText;
        scoreBoard.innerText = instructionsHeader;

        // Clear all texts from answer button
        buttonAnswer01.innerText = '';
        buttonAnswer02.innerText = '';
        buttonAnswer03.innerText = '';
        buttonAnswer04.innerText = '';

        resetButtonsBackgroundColor();
        
        buttonResetStart.setAttribute('data-fieldtype', 'start');
        buttonResetStart.innerText = 'Start';
        buttonNext.disabled = true;

        paramsPubQuiz.isGameInPlay = false;
    }
}
