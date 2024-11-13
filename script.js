class HangmanGame {
    constructor() {
        // Palabras del juego con sus pistas
        this.words = [
            { word: "javascript", hint: "Un lenguaje de programación popular" },
            { word: "desarrollo", hint: "Proceso de crear software" },
            { word: "programacion", hint: "Arte de crear instrucciones para computadoras" },
            { word: "tecnologia", hint: "Aplicación de la ciencia para resolver problemas" },
            { word: "computadora", hint: "Máquina que procesa información" }
        ];

        // Referencias a elementos del DOM
        this.wordDisplay = document.querySelector(".word-display");
        this.hintText = document.querySelector(".hint-text span");
        this.guessesText = document.querySelector(".guesses-text span");
        this.keyboard = document.querySelector(".keyboard");
        this.newGameBtn = document.querySelector(".new-game-btn");
        this.modal = document.getElementById("gameOverModal");
        this.resultText = document.querySelector(".result-text");
        this.correctWord = document.querySelector(".correct-word");
        this.playAgainBtn = document.querySelector(".play-again-btn");
        this.scoreDisplay = document.querySelector(".score-text span");

        // Variables del juego
        this.currentWord = "";
        this.currentHint = "";
        this.correctLetters = [];
        this.wrongGuesses = 0;
        this.maxGuesses = 6;
        this.score = 0;

        // Inicializar eventos
        this.initializeGame();
    }

    initializeGame() {
        // Crear teclado virtual
        this.createKeyboard();
        
        // Asignar eventos a los botones
        this.newGameBtn.addEventListener("click", () => this.startNewGame());
        this.playAgainBtn.addEventListener("click", () => this.startNewGame());
        
        // Manejar entrada del teclado físico
        document.addEventListener("keydown", (e) => this.handleKeyPress(e));
        
        // Iniciar primer juego
        this.startNewGame();
    }

    createKeyboard() {
        // Crear teclado con letras del alfabeto español
        const letters = "abcdefghijklmnñopqrstuvwxyz".split("");
        
        letters.forEach(letter => {
            const button = document.createElement("button");
            button.textContent = letter.toUpperCase();
            button.classList.add("key");
            button.addEventListener("click", () => this.checkLetter(letter));
            this.keyboard.appendChild(button);
        });
    }

    startNewGame() {
        // Reiniciar variables del juego
        this.wrongGuesses = 0;
        this.correctLetters = [];
        
        // Seleccionar nueva palabra aleatoria
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex].word;
        this.currentHint = this.words[randomIndex].hint;
        
        // Actualizar interfaz
        this.updateGameUI();
        
        // Reiniciar teclado
        this.resetKeyboard();
        
        // Ocultar modal si está visible
        this.modal.classList.remove("show");
        
        // Reiniciar partes del ahorcado
        document.querySelectorAll(".hangman-part").forEach(part => {
            part.style.display = "none";
        });
    }

    updateGameUI() {
        // Actualizar display de la palabra
        this.wordDisplay.innerHTML = this.currentWord
            .split("")
            .map(letter => `<div class="letter">${this.correctLetters.includes(letter) ? letter : ""}</div>`)
            .join("");
        
        // Actualizar pista y número de intentos
        this.hintText.textContent = this.currentHint;
        this.guessesText.textContent = this.maxGuesses - this.wrongGuesses;
        this.scoreDisplay.textContent = this.score;
    }

    checkLetter(letter) {
        if (this.correctLetters.includes(letter)) return;
        
        if (this.currentWord.includes(letter)) {
            // Letra correcta
            this.correctLetters.push(letter);
            this.updateGameUI();
            
            // Verificar victoria
            if (this.hasWon()) {
                this.handleGameOver(true);
            }
        } else {
            // Letra incorrecta
            this.wrongGuesses++;
            this.updateGameUI();
            
            // Mostrar siguiente parte del ahorcado
            const hangmanParts = document.querySelectorAll(".hangman-part");
            hangmanParts[this.wrongGuesses - 1].style.display = "block";
            
            // Verificar derrota
            if (this.wrongGuesses === this.maxGuesses) {
                this.handleGameOver(false);
            }
        }