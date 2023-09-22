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

document.addEventListener('DOMContentLoaded', function(event) {

    /*
        The first thing to do is
        display the form.
    */
    document.getElementsByTagName('main').item(0).style.display = 'block';

    let buttonNextDisable = buttonNext.getAttribute('disabled');

    console.log(buttonNextDisable);

});