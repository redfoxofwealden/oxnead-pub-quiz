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

const paramsScoreTimer = {
    Score: 0,
    Timer: 99
}

/**
 * Questions
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
        The first thing to do is
        display the form.
    */
    document.getElementsByTagName('main').item(0).style.display = 'block';

    let buttonNextDisable = buttonNext.getAttribute('disabled');

    console.log(buttonNextDisable);

});