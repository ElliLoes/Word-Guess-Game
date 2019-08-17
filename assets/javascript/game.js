var randomWords = ["rhubarb", "oatmeal", "parsnip", "pumpernickel", "sage", "wasabi", "mozzarella", "jellybeans", "ginger", "donut", "chocolate", "custard", "macaroon", "parsley", "spaghetti", "pomegranate", "marshmallow"];

const maxTries = 12;

var guessedLetters = [];

var remainingAttempts = maxTries;

var wins = 0;

var gameStarted = false;

var hasFinished = true;

var currentWordIndex;

var guessingWord = [];

function resetGame() {
    remainingAttempts = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (randomWords.length));

    console.log("CurrentWord", randomWords[currentWordIndex]);

    guessedLetters = [];
    guessingWord = [];

    for (var i = 0; i < randomWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingAttempts;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingAttempts <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};

document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) { 
    if (remainingAttempts > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    
    var positions = [];

    
    for (var i = 0; i < randomWords[currentWordIndex].length; i++) {
        if(randomWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingAttempts--;
    } else {
       
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};