'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Declaring variable outside of the init as we wont be able to access them if we declare inside init fun(coz they are block scoped)
let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);

    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Button Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's total score
    scores[activePlayer] += currentScore;
    //score[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if players's score >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //removing the active class for winner player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Resetting the game
btnNew.addEventListener('click', init);

//Resetting the Game - My Code
/*btnNew.addEventListener('click', function () {
  //1. Set all scores to 0
  //1.1 Make the current score as 0 for both the players
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //1.2 Make the total score as 0 for both the players
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  //1.3 Set player 0 as starting player
  activePlayer = 0;
  player0El.classList.add('player--active');
  //1.4 set playing to true
  playing = true;
  //1.5 remove the winner class from the player who won the game
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});*/
