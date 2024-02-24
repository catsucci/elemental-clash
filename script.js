'use strict'

let playerLivesLeft = 5;
let computerLivesLeft = 5;

function getComputerSelection() {
    let selections = ["fire", "water", "earth"];
    return selections[Math.floor(Math.random() * selections.length)];
}

function playRound( playerSelection ) {
    if ( playerLivesLeft > 0 && computerLivesLeft > 0 ) {
        let computerSelection = getComputerSelection();
        let winner = getWinner(playerSelection, computerSelection);
        console.log( getRoundWinner(winner, playerSelection, computerSelection) );
    } else if ( computerLivesLeft === 0 ) {
        console.log('Hehe, poor enemy has no lives left.. He barely holds himself in one piece.');
        console.log('You Won This Battle!');
    } else {
        console.log('Ouch.. No lives left for you. Enjoy the mocking laughter of the enemy.');
        console.log('You Lost This Battle!');
    }
}

function getWinner(playerSelection, computerSelection) {
    if ( playerSelection === computerSelection ) {
        return "draw";
    } else if (
        (computerSelection === "earth" && playerSelection === "water") ||
        (computerSelection === "fire" && playerSelection === "earth") ||
        (computerSelection === "water" && playerSelection === "fire")
    ) {
        computerLivesLeft--;
        return "computer";
    } else {
        playerLivesLeft--;
        return "player";
    }
}

function getRoundWinner(winner, playerSelection, computerSelection) {
    switch (winner) {
        case "player":
            return `Impressive attack! The enemy lost one life, because the great power of your ${playerSelection} crushed his ${computerSelection}!`;
        case "computer":
            return `Unfortunate defeat.. You lost one life, because your ${playerSelection} lacks of power against enemy's ${computerSelection}!`;;
        case "draw":
            return `Hmm.. Two ${playerSelection}s means a draw, so no lives were lost. Let's try again.`;
    }
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
