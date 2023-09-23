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
    currentQuestion: 0,
    questionList: []
}

/**
 * List of 11 questions
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
        question: 'What is the chemical symbol of aluminium?',
        answer: 'Al',
        option1: 'At',
        option2: 'As',
        option3: 'Ar'
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
 */
function generateArrayOfRanNums(numOfElements) {
    
    let arrOfNums = [];
    let ranNum = 0;

    for(let c = 0; c < numOfElements; c++) {
        
        do {
            ranNum = parseInt(Math.random() * numOfElements);
        } while(arrOfNums.find((element) => element === ranNum) !== undefined);
        
        arrOfNums.push(ranNum);
    }

    return arrOfNums;
}

function Test() {
    paramsScoreTimer.questionList = generateArrayOfRanNums(listOfQuestions.length);

    console.log(paramsScoreTimer.questionList);
    console.log(listOfQuestions.length);

    let m = generateArrayOfRanNums(4);
    console.log('list of 4 integers');
    console.log(m);
}

Test();

/**
 * event functions
 */

function eventAnswerButton01(event) {
    console.log('Event fired button 1');
}

function eventAnswerButton02(event) {
    console.log('Event fired 2');
}

function eventAnswerButton03(event) {
    console.log('Event fired 3');
}

function eventAnswerButton04(event) {
    console.log('Event fired 4');
}

function eventNext(event) {
    console.log('Event fired next');
}

function eventResetStart(event) {
    
    buttonResetStart.innerText = (buttonResetStart.innerText === 'Start')
        ? 'Reset' : 'Start';

    buttonNext.disabled = (buttonNext.disabled === true)
        ? false : true;

    console.log('Event fired reset start');

}
