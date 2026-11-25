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

// Updates cell selection display on input
function toggleCurrentCellSelectionDisplay() {
  document
    .getElementById(`${currentRowIndex}${currentColumnIndex}`)
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
      console.log('delet');
      toggleCurrentCellSelectionDisplay();
      currentColumnIndex--;
      toggleCurrentCellSelectionDisplay();
      break;

    // Add letter
    default:
      console.log(`@@@ current column index = ${currentColumnIndex}`);
    
      if (event.key.match(VALID_LETTERS_INPUT_KEYS) && currentColumnIndex + 1 < GUESS_LENGTH) {
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
