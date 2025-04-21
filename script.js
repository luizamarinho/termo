const board = document.querySelector(".board");
const input = document.querySelector(".guess-input");
const button = document.querySelector(".submit-guess");
const message = document.querySelector(".message");

const secretWord = "CARRO";

let currentRow = 0;

function createBoard() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.dataset.row = i;

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }

    board.appendChild(row);
  }
}

function handleGuess() {
  const guess = input.value.toUpperCase();

  if (guess.length !== 5) {
    message.textContent = "Digite uma palavra com 5 letras.";
    return;
  }

  const row = document.querySelector(`[data-row="${currentRow}"]`);
  const cells = row.querySelectorAll(".cell");

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    const cell = cells[i];
    cell.textContent = letter;

    if (letter === secretWord[i]) {
      cell.classList.add("correct");
    } else if (secretWord.includes(letter)) {
      cell.classList.add("present");
    } else {
      cell.classList.add("absent");
    }
  }

  if (guess === secretWord) {
    message.textContent = "Parabéns! Você acertou!";
    input.disabled = true;
    button.disabled = true;
  } else {
    currentRow++;
    input.value = "";
    message.textContent = "";

    if (currentRow === 6) {
      message.textContent = `Fim de jogo! A palavra era ${secretWord}.`;
      input.disabled = true;
      button.disabled = true;
    }
  }
}

createBoard();

button.addEventListener("click", handleGuess);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleGuess();
  }
});
