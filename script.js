const dice = document.querySelector(".dice");
const rollButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
const player1Board = document.querySelector(".player-1");
const player2Board = document.querySelector(".player-2");
const player1CurrentScoreText = document.querySelector(
  ".player-1-current-score"
);
const player2CurrentScoreText = document.querySelector(
  ".player-2-current-score"
);
const player1TotalScoreText = document.querySelector(".player-1-score");
const player2TotalScoreText = document.querySelector(".player-2-score");
const winnerOverlay = document.querySelector(".winner-overlay");
const winnerText = document.querySelector(".winner");
const resetButton = document.querySelector(".reset");
const newGameButton = document.querySelector(".new-game");

let currentDice = 1;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let player1TotalScore = 0;
let player2TotalScore = 0;
let activePlayer = 1;

const switchPlayers = function () {
  if (activePlayer === 1) {
    player1Board.classList.remove("active");
    player2Board.classList.add("active");
    activePlayer = 2;
  } else {
    player2Board.classList.remove("active");
    player1Board.classList.add("active");
    activePlayer = 1;
  }
};

const updateScoreUI = function () {
  player1CurrentScoreText.innerText = player1CurrentScore;
  player2CurrentScoreText.innerText = player2CurrentScore;
  player1TotalScoreText.innerText = player1TotalScore;
  player2TotalScoreText.innerText = player2TotalScore;
};

const resetCurrentScores = function () {
  player1CurrentScore = 0;
  player2CurrentScore = 0;
};

const addDiceScoreToCurrentPlayer = function () {
  if (activePlayer === 1) {
    player1CurrentScore += currentDice;
  } else {
    player2CurrentScore += currentDice;
  }
};

const addCurrentScoreToTotalScore = function () {
  if (activePlayer === 1) {
    player1TotalScore += player1CurrentScore;
  } else {
    player2TotalScore += player2CurrentScore;
  }
};

const checkCurrentDice = function () {
  if (currentDice === 1) {
    resetCurrentScores();
    switchPlayers();
  } else {
    addDiceScoreToCurrentPlayer();
  }
};

const checkForWinner = function () {
  if (player1TotalScore >= 100) {
    winnerOverlay.classList.remove("hidden");
    winnerText.innerText = `Player 1 Wins!`;
  } else if (player2TotalScore >= 100) {
    winnerOverlay.classList.remove("hidden");
    winnerText.innerText = `Player 2 Wins!`;
  }
};

const rollDice = function () {
  currentDice = Math.floor(Math.random() * 6) + 1;
  dice.setAttribute("src", `dice-${currentDice}.svg`);
  checkCurrentDice();
  updateScoreUI();
};

const hold = function () {
  addCurrentScoreToTotalScore();
  resetCurrentScores();
  checkForWinner();
  switchPlayers();
  updateScoreUI();
};

const resetGame = function () {
  currentDice = 1;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  player1TotalScore = 0;
  player2TotalScore = 0;
  activePlayer = 1;
  player2Board.classList.remove("active");
  player1Board.classList.add("active");
  updateScoreUI();
  winnerOverlay.classList.add("hidden");
};

rollButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", hold);
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
