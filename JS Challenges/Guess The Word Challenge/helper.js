export const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const generateWord = async (wordLength = 7, maxDifficulty = 3) => {
  try {
    let url = new URL("https://random-word-api.herokuapp.com/word");
    url.searchParams.set("length", wordLength);
    url.searchParams.set("diff", maxDifficulty);

    let response = await fetch(url);
    if (response.ok) {
      let newWord = await response.json();
      return newWord[0] ?? "flower";
    } else {
      return "flower";
    }
  } catch (error) {
    console.log(error.message);
    return "flower";
  }
};

export const scrambleWord = (word) => {
  let scrambled;
  do {
    let wordCopy = word;
    scrambled = "";
    while (wordCopy) {
      let randomIndex = getRandomNumber(wordCopy.length, 0);
      scrambled += wordCopy[randomIndex];
      wordCopy =
        wordCopy.slice(0, randomIndex) + wordCopy.slice(randomIndex + 1);
    }
  } while (scrambled === word && new Set(word).size > 1);
  return scrambled;
};

export const checkMistakenLetters = (stringA, stringB) => {
  let mistakenLetters = [];
  for (let letter of stringA.toLowerCase()) {
    if (stringB.toLowerCase().indexOf(letter) === -1) {
      mistakenLetters.push(letter);
    }
  }
  return [...new Set(mistakenLetters)];
};
