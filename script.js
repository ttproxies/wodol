const MAX_GUESSES = 6;
const GUESS_LENGTH = 5;
const VALID_LETTERS_INPUT_KEYS = /[a-z]/i;

let currentRowIndex = 0;
let currentColumnIndex = 0;

/// The most recent submitted guess
let lastGuess = '';

let guessContainers = document.querySelectorAll(".grid__row");

addEventListener("keydown", (event) => {
  keypressEventHandler(event);
});

function isGuessValid(guess) {
  return Boolean(guess.match(/[a-z]{GUESS_LENGTH}/i));
}

function checkGuess() {
  console.log("@@@ checking guess");
}

function getSelectedCell() {
  return document.getElementById(`${currentRowIndex}${currentColumnIndex}`);
}

// Updates cell selection display on input
function pushLetter(letter) {
  getSelectedCell().innerHTML = letter;
  getSelectedCell().classList.add("grid__cell--filled");
}

function popLetter() {
  getSelectedCell().innerHTML = '';
  getSelectedCell().classList.remove("grid__cell--filled");
}

function keypressEventHandler(event) {
  switch (event.key) {
    // Submit text
    case "Enter":
      if (!isGuessValid()) return;
      currentRowIndex++;
      currentColumnIndex = 0;
      correctGuess();
      break;

    // Delete letter
    case "Backspace":
      popLetter();

      if (currentColumnIndex > 0) currentColumnIndex--;
      break;

    // Add letter
    default:
      if (event.key.match(VALID_LETTERS_INPUT_KEYS) && event.key.length === 1) {
        pushLetter(event.key);

        if (currentColumnIndex < GUESS_LENGTH - 1) currentColumnIndex++;
    }
  }
}
