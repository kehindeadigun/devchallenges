import { getRandomNumber, generateWord, scrambleWord } from "./helper.js";

const maxWordLength = 7;
const maxDifficulty = 3;
const randomButton = document.querySelector("button.random");
const resetButton = document.querySelector("button.reset");
const wordForm = document.getElementById("wordForm");
const inputs = document.querySelectorAll(".game__input");

const displayedWord = document.querySelector(".game__scrambled-word");
let generatedWord = "";
let length = 0;
let tries = 0;
let scrambledWord = "";

function resetDefaults() {
  generatedWord = "flower";
  length = generatedWord.length;
  scrambledWord = "relowf";
}

const randomizeWord = async (event) => {
  event.target.disabled = true;
  try {
    let wordLength = getRandomNumber(maxWordLength);
    generatedWord = await generateWord(wordLength, maxDifficulty);
    scrambledWord = scrambleWord(generatedWord);
    displayedWord.textContent = scrambledWord;
    console.log("Generated Word: ", generatedWord);
  } finally {
    length = scrambledWord.length;
    event.target.disabled = false;
  }
};

const resetInput = (event) => {
  event.target.disabled = true;
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
  inputs.forEach((input, index) => {
    if (input === target && target.value.length == 1) {
      if (
        index === inputs.length - 1 &&
        Array.from(inputs).every((input) => input.value)
      ) {
        checkSubmittedWord();
      } else {
        inputs[index + 1].focus();
      }
    }
  });
};

resetDefaults();

wordForm.addEventListener("input", moveFocus);
randomButton.addEventListener("click", randomizeWord);
resetButton.addEventListener("click", resetInput);

const checkSubmittedWord = () => {
  let data = new FormData(wordForm);
  let inputDict = Object.fromEntries(data);
  let wordText = "";
  for (let key in inputDict) {
    wordText += inputDict[key];
  }
  if (wordText === generatedWord) {
    alert("success! You guessed the word!");
    resetDefaults();
  } else {
    console.log("Wrong Word!: ", wordText);
  }
};
