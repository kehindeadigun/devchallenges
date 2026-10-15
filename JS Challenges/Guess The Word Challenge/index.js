import {
  getRandomNumber,
  generateWord,
  scrambleWord,
  checkMistakenLetters,
} from "./helper.js";

// Constant Definitions

const maxWordLength = 7;
const maxDifficulty = 3;
const maxTries = 5;
const randomButton = document.querySelector("button.random");
const resetButton = document.querySelector("button.reset");
const wordForm = document.getElementById("wordForm");
const tryCount = document.querySelector(".game__tries > .med-text");
const displayedWord = document.querySelector(".game__scrambled-word");
const indicatorsContainer = document.querySelector(".game__life-counts");
const mistakes = document.querySelector(".game__mistakes > span");

let generatedWord = "flower";
let length = generatedWord.length;
let scrambledWord = "relowf";
let tries = 0;

// Function Definitions

function resetInputs() {
  const inputsHolder = document.createDocumentFragment();
  for (let i = 0; i < length; i++) {
    let inputItem = document.createElement("input");
    inputItem.classList.add("game__input");
    inputItem.type = "text";
    inputItem.placeholder = "_";
    inputItem.name = `word-${i}`;
    inputItem.maxLength = 1;
    inputsHolder.append(inputItem);
  }
  wordForm.replaceChildren(inputsHolder);
}

function resetIndicators() {
  const indicatorsHolder = document.createDocumentFragment();
  for (let i = 0; i < maxTries; i++) {
    let indicator = document.createElement("span");
    indicator.classList.add("game__life-count");
    indicatorsHolder.append(indicator);
  }
  indicatorsContainer.replaceChildren(indicatorsHolder);
  tries = 0;
  tryCount.textContent = `Tries (${tries}/${maxTries}):`;
  mistakes.textContent = "";
}

function updateCounts(wordText = null) {
  tryCount.textContent = `Tries (${tries}/${maxTries}):`;
  let countIndicators = document.querySelectorAll(".game__life-count");
  let indicatorArray = Array.from(countIndicators);

  if (wordText) {
    let mistakenWordsList = checkMistakenLetters(wordText, generatedWord);
    mistakes.textContent = mistakenWordsList.join(",") || "-";
  }

  indicatorArray.forEach((indicator) => {
    if (indicatorArray.indexOf(indicator) <= tries - 1) {
      indicator.classList.add("is-used");
    }
  });
}

const randomizeWord = async (event) => {
  event.target.disabled = true;
  try {
    let wordLength = getRandomNumber(maxWordLength, 3) + 1;
    generatedWord = await generateWord(wordLength, maxDifficulty);
    scrambledWord = scrambleWord(generatedWord);
    displayedWord.textContent = scrambledWord;
    console.log("Generated Word: ", generatedWord);
  } finally {
    length = scrambledWord.length;
    event.target.disabled = false;
    resetButton.disabled = false;
    resetInputs();
    resetIndicators();
  }
};

const resetInput = (event) => {
  event.target.disabled = true;
  let inputs = document.querySelectorAll(".game__input");
  try {
    inputs[0].focus();
    inputs.forEach((input) => {
      input.value = "";
    });
  } finally {
    event.target.disabled = false;
  }
};

const moveFocus = ({ target }) => {
  let inputs = document.querySelectorAll(".game__input");
  inputs.forEach((input, index) => {
    if (input === target && target.value.length == 1) {
      if (
        Array.from(inputs).every((input) => input.value) &&
        index === inputs.length - 1
      ) {
        checkSubmittedWord();
      }
      if (index !== inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  });
};

const backspaceFocus = (event) => {
  if (event.key === "Backspace") {
    let inputs = document.querySelectorAll(".game__input");
    inputs.forEach((input, index) => {
      if (input === event.target && event.target.value.length == 0) {
        if (index !== 0) {
          inputs[index - 1].focus();
        }
      }
    });
  }
};

const checkSubmittedWord = () => {
  let data = new FormData(wordForm);
  let inputDict = Object.fromEntries(data);
  let wordText = "";
  let inputs = document.querySelectorAll(".game__input");
  for (let key in inputDict) {
    wordText += inputDict[key];
  }
  if (wordText.toLowerCase() === generatedWord.toLowerCase()) {
    alert(
      "Success! You guessed the word! Click Random button to get a new word if you want to replay.",
    );
    resetButton.disabled = true;
    inputs.forEach((input) => {
      input.disabled = true;
    });
  } else {
    if (tries < maxTries - 1) {
      console.log("Wrong Word!: ", wordText);
      tries += 1;
      updateCounts(wordText);
    } else {
      tries += 1;
      updateCounts(wordText);
      alert(
        `Game Over! The word was ${generatedWord}. Click Random button to get a new word!`,
      );
      resetButton.disabled = true;
      inputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }
};

function clearTarget({ target }) {
  target.value = "";
}

// Function Calls
resetInputs();
resetIndicators();

wordForm.addEventListener("input", moveFocus);
wordForm.addEventListener("keydown", backspaceFocus);
wordForm.addEventListener("focusin", clearTarget);
randomButton.addEventListener("click", randomizeWord);
resetButton.addEventListener("click", resetInput);
