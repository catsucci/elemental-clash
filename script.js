'use strict'

let roundCounter = 0;
let playerScoreCount = 0;
let computerScoreCount = 0;

function getPlayerInput() {
    return prompt("Choose Your Element:").toUpperCase();
}

function checkplayerInput(choice) {
    switch (choice) {
        case "FIRE":
        case "WATER":
        case "EARTH":
            return true;
        default:
            return false;
    }
}

function informIncorrectplayerInput() {
    alert(
        "Incorrect player input, please make sure your input is correctly formatted."
    );
}

function getComputerChoice() {
    let choices = ["fire", "water", "earth"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// function getPlayerChoice() {
//     let playerChoice = getPlayerInput();
//     let keepGoing = checkplayerInput(playerChoice) ? false : true;
//     while (keepGoing) {
//         informIncorrectplayerInput();
//         playerChoice = getPlayerInput();
//         keepGoing = checkplayerInput(playerChoice) ? false : true;
//     }
//     return playerChoice;
// }

function getWinner(playerChoice, computerChoice) {
    if (
        (playerChoice === "earth" && computerChoice === "water") ||
        (playerChoice === "fire" && computerChoice === "earth") ||
        (playerChoice === "water" && computerChoice === "fire")
    ) {
        return "player";
    } else if (
        (computerChoice === "earth" && playerChoice === "water") ||
        (computerChoice === "fire" && playerChoice === "earth") ||
        (computerChoice === "water" && playerChoice === "fire")
    ) {
        return "computer";
    } else {
        return "draw";
    }
}

function playRound( playerChoice ) {
    console.log(playerChoice);
    let computerChoice = getComputerChoice();
    let winner = getWinner(playerChoice, computerChoice);
    console.log( getRoundWinner(winner, playerChoice, computerChoice) );
}

function getRoundWinner(winner, playerChoice, computerChoice) {
    roundCounter++;
    switch (winner) {
        case "player":
            playerScoreCount++;
            return `You won! ${playerChoice} beats ${computerChoice} // Player: ${playerScoreCount} - ${computerScoreCount} :Computer`;
        case "computer":
            computerScoreCount++;
            return `Computer won! ${computerChoice} beats ${playerChoice} // Player: ${playerScoreCount} - ${computerScoreCount} :Computer`;
        case "draw":
            // playerScoreCount++;
            // computerScoreCount++;
            return `It's a draw! Score: player: ${playerScoreCount} - ${computerScoreCount} :Computer`;
    }
}

function game() {
    let overallWinner;
    for (let i = 0; i < 5; i++) {
        console.log(playRound());
    }
    if (playerScoreCount > computerScoreCount) {
        overallWinner = "You won!";
    } else if (computerScoreCount > playerScoreCount) {
        overallWinner = "Computer won!";
    } else {
        overallWinner = "It's a draw!";
    }
    console.log(
        `Game finished! ${overallWinner} player: ${playerScoreCount} - ${computerScoreCount} :Computer`
    );
}

const earthBtn = document.querySelector('.earthButton');
const waterBtn = document.querySelector('.waterButton');
const fireBtn = document.querySelector('.fireButton');

earthBtn.addEventListener( 'click', function () {
    playRound('earth');
});

waterBtn.addEventListener( 'click', function () {
    playRound('water');
});

fireBtn.addEventListener( 'click', function () {
    playRound('fire');
});
