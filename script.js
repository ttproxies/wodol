const MAX_GUESSES = 6;
const GUESS_LENGTH = 5;
const VALID_LETTERS_INPUT_KEYS = "abcdefghijklmnopqrstuvwxyz";

let currentRowIndex = 0;
let currentColumnIndex = 0;

let currentGuess = "";

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

// Updates cell selection display on input
function toggleCurrentCellSelectionDisplay() {
  document
    .getElementById(`${currentRowIndex}${currentColumnIndex}`)
    .classList.toggle("grid__cell--selected");
}

function keypressEventHandler(event) {
  // Submit guess
  if (event.key == "Enter") {
    if (isGuessValid()) {
      currentRow++;
      checkGuess();
    }
  } else if (event.key == "Backspace" && currentColumnIndex - 1 >= 0) {
    toggleCurrentCellSelectionDisplay();
    currentColumnIndex--;
    toggleCurrentCellSelectionDisplay();
  }

  // Add letter
  else {
    if (VALID_LETTERS_INPUT_KEYS.includes(event.key) && currentColumnIndex + 1 < GUESS_LENGTH) {
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

toggleCurrentCellSelectionDisplay();
