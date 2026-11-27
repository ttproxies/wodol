const MAX_GUESSES = 6;
const GUESS_LENGTH = 5;
const VALID_LETTERS_INPUT_KEYS = /[a-z]/i;

let currentRowIndex = 0;
let activeCursorIndex = 0;

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
  return document.getElementById(`${currentRowIndex}${activeCursorIndex}`);
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
      activeCursorIndex = 0;
      correctGuess();
      break;

    // Delete letter
    case "Backspace":
      if (activeCursorIndex > 0) activeCursorIndex--;
      popLetter();
      break;

    // Add letter
    default:
      if (event.key.match(VALID_LETTERS_INPUT_KEYS) && event.key.length === 1) {
        pushLetter(event.key);

        if (activeCursorIndex < GUESS_LENGTH) activeCursorIndex++; // Cursor can be after last letter
    }
  }
}
