const words = [
  "javascript",
  "programacion",
  "desarrollo",
  "web",
  "frontend",
  "backend",
];
let selectedWord = "";
let guessedLetters = [];
let lives = 6;

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = Array(selectedWord.length).fill("_");
  lives = 6;
  updateDisplay();
  document.getElementById("message").textContent = "";
  document.getElementById("lives-count").textContent = lives;
  document.getElementById("guess-input").value = "";
}

function updateDisplay() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = guessedLetters.join(" ");
}

function guessLetter() {
  const input = document.getElementById("guess-input");
  const letter = input.value.toLowerCase();
  input.value = "";

  if (!letter || letter.length !== 1) {
    document.getElementById("message").textContent =
      "Por favor, introduce una sola letra.";
    return;
  }

  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        guessedLetters[i] = letter;
      }
    }
    if (!guessedLetters.includes("_")) {
      document.getElementById("message").textContent = "¡Ganaste!";
    }
  } else {
    lives--;
    document.getElementById("lives-count").textContent = lives;
    if (lives === 0) {
      document.getElementById("message").textContent =
        "¡Perdiste! La palabra era: " + selectedWord;
    }
  }

  updateDisplay();
}

startGame();
