const MAX_GUESSES = 6;
const GUESS_LENGTH = 5;
const VALID_LETTERS_INPUT_KEYS = /[a-z]/i;

let currentRowIndex = 0;
let currentColumnIndex = 0;

let currentGuess = "";

let guessContainers = document.querySelectorAll(".grid__row");

// Set first letter to be selected by default
toggleCurrentCellSelectionDisplay();

addEventListener("keydown", (event) => {
  keypressEventHandler(event);
});

function isGuessValid(guess) {
  return Boolean(guess.match(/[a-z]{GUESS_LENGTH}/i));
}

function correctGuess() {
  console.log("@@@ checking guess");
}

function getSelectedCell() {
  return document.getElementById(`${currentRowIndex}${currentColumnIndex}`);
}

// Updates cell selection display on input
function toggleCurrentCellSelectionDisplay() {
    getSelectedCell()
    .classList.toggle("grid__cell--selected");
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
      if (currentColumnIndex - 1 < 0) return;
      getSelectedCell().innerHTML = '';
      toggleCurrentCellSelectionDisplay();
      currentColumnIndex--;
      toggleCurrentCellSelectionDisplay();
      break;

    // Add letter
    default:
      console.log(`@@@ current column index = ${currentColumnIndex}`);
      getSelectedCell().innerHTML = event.key;

      if (event.key.match(VALID_LETTERS_INPUT_KEYS) && event.key.length === 1 && currentColumnIndex + 1 < GUESS_LENGTH) {
        console.log(`@@@ pressed key: ${event.key}`);
        console.log(
          `@@@ guess contains [${currentRowIndex}] = ${guessContainers[currentRowIndex]}`,
        );
        toggleCurrentCellSelectionDisplay();
        currentColumnIndex++;
        toggleCurrentCellSelectionDisplay();
      } else {
        console.log(`@@@ input key ${event.key} is invalid or index too high`);
      }
  }
}
