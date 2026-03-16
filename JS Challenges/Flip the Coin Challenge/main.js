const flipButton = document.querySelector("#flip-button");
const coin = document.querySelector("#coin");
const coinResult = document.querySelector("#coin-result");

function handleClick(event) {
    let result = Math.random() < 0.5 ? "Heads" : "Tails";
    coin.src = `./resources/${result.toLowerCase()}.svg`;
    coinResult.textContent = result;
}

flipButton.addEventListener("click", handleClick);