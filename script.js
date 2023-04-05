'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//Changing player function

function change0Player() {
  currentScore0El.textContent = 0;
  player0El.classList.remove('player--active');
  player1El.classList.add('player--active');
}

function change1Player() {
  currentScore1El.textContent = 0;
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //Generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Show a random dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check if dice === 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      if (player0El.classList.contains('player--active')) {
        currentScore0El.textContent = currentScore;
      } else {
        currentScore1El.textContent = currentScore;
      }
    } else {
      //Switch players and remove score(If dice = 1)
      currentScore = 0;
      if (player0El.classList.contains('player--active')) {
        change0Player();
      } else {
        change1Player();
      }
    }
  }
});

//Store score functionality

btnHold.addEventListener('click', () => {
  if (playing) {
    if (player0El.classList.contains('player--active')) {
      scores[0] += currentScore;
      score0El.textContent = scores[0];
      change0Player();
    } else {
      scores[1] += currentScore;
      score1El.textContent = scores[1];
      change1Player();
    }
    currentScore = 0;
    if (scores[0] >= 50) {
      player0El.classList.remove('player--active');
      player0El.classList.add('player--winner');
      playing = false;
    } else if (scores[1] >= 50) {
      player1El.classList.remove('player--active');
      player1El.classList.add('player--winner');
      playing = false;
    }
  }
});

//Restart game event

btnNew.addEventListener('click', init);
