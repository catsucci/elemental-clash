'use strict'

const nodes = {
}

const player = {
    health: 5,
    selection: "",
    test: function() {
        console.log('hello');
        document.querySelector('.computerIcon').setAttribute('alt', 'Fire');
    },
}

const computer = {
    health: 5,
    selection: "",

    getSelection: function() {
        let selections = ["earth", "water", "fire"];
        computer.selection = selections[Math.floor(Math.random() * selections.length)];
        return computer.selection;
    },

    play: function() {
        let selection = computer.getSelection();
        let computerIcon = document.querySelector('.computerIcon');

        if (selection === 'earth') {
            computerIcon.setAttribute('alt', 'Earth');
        } else if (selection === 'water') {
            computerIcon.setAttribute('alt', 'Water');
        } else if (selection === 'fire') {
            computerIcon.setAttribute('alt', 'Fire');
        }
        return selection;
    },


}

const round = {
    roundCount: 0,
    winner: "",

    playRound: function() { console.log('hello'); },

    countHealth: function() {
        const gameOutput = document.querySelector('.gameOutput');
        const computerPlayDiv = document.querySelector('.computerPlayDiv');
        const combatText = document.querySelector('.combatText');
        switch (true) {
            case (player.selection === computer.selection):
                combatText.innerText = `Hmm.. Two ${player.selection}s means a draw, so no health were lost. Let's try again.`;
                gameOutput.style.border = '4px solid #8070ac';
                computerPlayDiv.classList.remove('greyBorder', 'greenBorder', 'redBorder');
                computerPlayDiv.classList.add('purpleBorder');
                break;
            case (player.selection === 'earth' && computer.selection === 'water'):
            case (player.selection === 'water' && computer.selection === 'fire'):
            case (player.selection === 'fire' && computer.selection === 'earth'):
                combatText.textContent = `Impressive attack! The enemy lost one life, because the great power of your ${player.selection} crushed his ${computer.selection}!`;
                gameOutput.style.border = '4px solid #62b49c';
                computerPlayDiv.classList.remove('greyBorder', 'redBorder', 'purpleBorder');
                computerPlayDiv.classList.add('greenBorder');
                computer.health -= 1;
                break;
            default:
                combatText.innerText = `Unfortunate defeat.. You lost one life, because your ${player.selection} lacks of power against enemy's ${computer.selection}!`;
                gameOutput.style.border = '4px solid #b96b78';
                computerPlayDiv.classList.remove('greyBorder', 'greenBorder', 'purpleBorder');
                computerPlayDiv.classList.add('redBorder');
                player.health -= 1;
                break;
        }

        const health = document.querySelector('.health');
        health.innerText = `Your Health: ${player.health} ︱ Enemy's health: ${computer.health}`;
        return [player.health, computer.health];
    },
};

const game = {
    rounds: 0,
    winner: "",

    countRounds: function() {
        game.rounds += 1;
        game.rounds.innerText = `Round: ${game.rounds}`;
        return game.rounds;
    },

    end: function() {
        const weaponsButtons = document.querySelectorAll('.weaponButton');
        const combatText = document.querySelector('.combatText');
        if (player.health === 0 || computer.health === 0) {
            weaponsButtons.forEach((button) => {
                button.setAttribute('disabled', '');
                button.classList.add('disabledButton', 'opacity');
            });

            const computerIcon = document.querySelector('.computerIcon');
            computerIcon.style.opacity = '0.5';

            const gameEndText = document.querySelector('.gameEndText');
            if (player.health > computer.health) {
                combatText.innerText = 'Hehe, poor enemy has no lives left.. He barely holds himself in one piece.';
                gameEndText.textContent = 'You Won This Battle!';
                gameEndText.style.color = '#62b49c';
            } else {
                combatText.innerText = 'Ouch.. No lives left for you. Enjoy the mocking laughter of the enemy.';
                gameEndText.textContent = 'You Lost This Battle!';
                gameEndText.style.color = '#b96b78';
            }
            buttonPlayAgain.style.visibility = 'visible';
        }
    },

    reset: function() {
        const buttonPlayAgain = document.querySelector('.playAgain');
        buttonPlayAgain.addEventListener('click', () => {
            window.location.reload();
        });
    },

    play: function() {
        const weaponsButtons = document.querySelectorAll('.weaponButton');
        weaponsButtons.forEach((weapon) => {
            weapon.addEventListener('click', () => {
                const weaponIcons = document.querySelectorAll('.weaponIcon');
                if (weapon.classList.contains('earthButton')) {
                    weaponIcons[0].style.color = '#8070ac';
                    weaponIcons[1].style.color = '#5e5e5e';
                    weaponIcons[2].style.color = '#5e5e5e';
                    playerSelection = 'earth';
                } else if (weapon.classList.contains('waterButton')) {
                    weaponIcons[1].style.color = '#62b49c';
                    weaponIcons[0].style.color = '#5e5e5e';
                    weaponIcons[2].style.color = '#5e5e5e';
                    playerSelection = 'water';
                } else {
                    weaponIcons[2].style.color = '#b96b78';
                    weaponIcons[0].style.color = '#5e5e5e';
                    weaponIcons[1].style.color = '#5e5e5e';
                    playerSelection = 'fire';
                }
                game.countRounds();
                round.countHealth();
                game.end();
                game.reset();
            });
        });
    },
}








let playerLivesLeft = 5;
let computerLivesLeft = 5;
let roundCount = 0;

const nodeRound = document.querySelector('.round');
const nodeLives = document.querySelector('.lives');
const nodeCombatText = document.querySelector('.combatText');
const nodeGameEndText = document.querySelector('.gameEndText');
const nodeComputerIcon = document.querySelector('.omputerIcon');

function getComputerSelection() {
    let selections = ["fire", "water", "earth"];
    return selections[Math.floor(Math.random() * selections.length)];
}

function playRound(playerSelection) {
    if (playerLivesLeft > 0 && computerLivesLeft > 0) {
        let computerSelection = getComputerSelection();
        let winner = getWinner(playerSelection, computerSelection);
        console.log(getRoundWinner(winner, playerSelection, computerSelection));
    } else if (computerLivesLeft === 0) {
        console.log('Hehe, poor enemy has no lives left.. He barely holds himself in one piece.');
        console.log('You Won This Battle!');
    } else {
        console.log('Ouch.. No lives left for you. Enjoy the mocking laughter of the enemy.');
        console.log('You Lost This Battle!');
    }
    roundCount++;
    nodeRound.textContent = `Round: ${roundCount}`;
}

function getWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
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

earthBtn.addEventListener('click', function() {
    playRound('earth');
});

waterBtn.addEventListener('click', function() {
    playRound('water');
});

fireBtn.addEventListener('click', function() {
    playRound('fire');
});
