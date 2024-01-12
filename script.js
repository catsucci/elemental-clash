'use strict'

let roundCounter = 0;
let userScoreCount = 0;
let computerScoreCount = 0;

function getUserInput() {
    return prompt("Choose Your Element:").toUpperCase();
}

function checkUserInput(choice) {
    switch (choice) {
        case "FIRE":
        case "WATER":
        case "EARTH":
            return true;
        default:
            return false;
    }
}

function informIncorrectUserInput() {
    alert(
        "Incorrect user input, please make sure your input is correctly formatted."
    );
}

function getComputerChoice() {
    let choices = ["FIRE", "WATER", "EARTH"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getUserChoice() {
    let userChoice = getUserInput();
    let keepGoing = checkUserInput(userChoice) ? false : true;
    while (keepGoing) {
        informIncorrectUserInput();
        userChoice = getUserInput();
        keepGoing = checkUserInput(userChoice) ? false : true;
    }
    return userChoice;
}

function getWinner(userChoice, computerChoice) {
    if (
        (userChoice === "EARTH" && computerChoice === "WATER") ||
        (userChoice === "FIRE" && computerChoice === "EARTH") ||
        (userChoice === "WATER" && computerChoice === "FIRE")
    ) {
        return "user";
    } else if (
        (computerChoice === "EARTH" && userChoice === "WATER") ||
        (computerChoice === "FIRE" && userChoice === "EARTH") ||
        (computerChoice === "WATER" && userChoice === "FIRE")
    ) {
        return "computer";
    } else {
        return "draw";
    }
}

function playRound() {
    let userChoice = getUserChoice();
    let computerChoice = getComputerChoice();
    let winner = getWinner(userChoice, computerChoice);
    return getRoundWinner(winner, userChoice, computerChoice);
}

function getRoundWinner(winner, userChoice, computerChoice) {
    roundCounter++;
    switch (winner) {
        case "user":
            userScoreCount++;
            return `You won! ${userChoice} beats ${computerChoice} // User: ${userScoreCount} - ${computerScoreCount} :Computer`;
        case "computer":
            computerScoreCount++;
            return `Computer won! ${computerChoice} beats ${userChoice} // User: ${userScoreCount} - ${computerScoreCount} :Computer`;
        case "draw":
            // userScoreCount++;
            // computerScoreCount++;
            return `It's a draw! Score: User: ${userScoreCount} - ${computerScoreCount} :Computer`;
    }
}

function game() {
    let overallWinner;
    for (let i = 0; i < 5; i++) {
        console.log(playRound());
    }
    if (userScoreCount > computerScoreCount) {
        overallWinner = "You won!";
    } else if (computerScoreCount > userScoreCount) {
        overallWinner = "Computer won!";
    } else {
        overallWinner = "It's a draw!";
    }
    console.log(
        `Game finished! ${overallWinner} User: ${userScoreCount} - ${computerScoreCount} :Computer`
    );
}
