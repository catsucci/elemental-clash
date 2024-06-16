"use strict";

const nodes = {
    elementButtons: document.querySelectorAll(".elementButton"),
    rounds: document.querySelector(".rounds"),
    combatText: document.querySelector(".combatText"),
    buttonPlayAgain: document.querySelector(".playAgain"),
    npcIcon: document.querySelector(".npcIcon"),
    gameOutput: document.querySelector(".gameOutput"),
    npcPlayDiv: document.querySelector(".npcPlayDiv"),
    health: document.querySelector(".health"),
    gameEndText: document.querySelector(".gameEndText"),
    elementIcons: document.querySelectorAll(".elementIcon"),
};

const weapons = {
    assassin: "sword",
    archer: "bow",
    tank: "shield",
};

const player = {
    health: 5,
    selection: "",
};

const npc = {
    health: 5,
    selection: "",

    getSelection: function () {
        let selections = ["assassin", "archer", "tank"];
        npc.selection =
            selections[Math.floor(Math.random() * selections.length)];
        return npc.selection;
    },
    play: function () {
        let selection = npc.getSelection();
        const PRE_PATH = "drawable/images/";

        if (selection === "assassin") {
            nodes.npcIcon.setAttribute("src", PRE_PATH + "Basic-Sword.png");
        } else if (selection === "archer") {
            nodes.npcIcon.setAttribute("src", PRE_PATH + "Basic-Bow.png");
        } else if (selection === "tank") {
            nodes.npcIcon.setAttribute("src", PRE_PATH + "Basic-Shield.png");
        }
        return selection;
    },
};

const round = {
    number: 0,
    winner: "",

    countRounds: function () {
        round.number += 1;
        nodes.rounds.innerText = `Round: ${round.number}`;
        return round;
    },
    countHealth: function () {
        switch (true) {
            case player.selection === npc.selection:
                nodes.combatText.innerText = `Hmm.. Two ${weapons[player.selection]}s means a draw, so no health were lost. Let's try again.`;
                nodes.gameOutput.style.border = "4px solid #8070ac";
                nodes.npcPlayDiv.classList.remove(
                    "greyBorder",
                    "greenBorder",
                    "redBorder",
                );
                nodes.npcPlayDiv.classList.add("purpleBorder");
                break;
            case player.selection === "assassin" && npc.selection === "archer":
            case player.selection === "archer" && npc.selection === "tank":
            case player.selection === "tank" && npc.selection === "assassin":
                nodes.combatText.textContent = `Impressive attack! The enemy lost one life, because the great power of your ${weapons[player.selection]} crushed his ${weapons[npc.selection]}!`;
                nodes.gameOutput.style.border = "4px solid #62b49c";
                nodes.npcPlayDiv.classList.remove(
                    "greyBorder",
                    "redBorder",
                    "purpleBorder",
                );
                nodes.npcPlayDiv.classList.add("greenBorder");
                npc.health -= 1;
                break;
            default:
                nodes.combatText.innerText = `Unfortunate defeat.. You lost one life, because your ${weapons[player.selection]} lacks of power against enemy's ${weapons[npc.selection]}!`;
                nodes.gameOutput.style.border = "4px solid #b96b78";
                nodes.npcPlayDiv.classList.remove(
                    "greyBorder",
                    "greenBorder",
                    "purpleBorder",
                );
                nodes.npcPlayDiv.classList.add("redBorder");
                player.health -= 1;
                break;
        }

        nodes.health.innerText = `Your Health: ${player.health} ︱ Enemy's health: ${npc.health}`;
        return [player.health, npc.health];
    },
};

const game = {
    end: function () {
        if (player.health === 0 || npc.health === 0) {
            nodes.elementButtons.forEach((button) => {
                button.setAttribute("disabled", "");
                button.classList.add("disabledButton", "opacity");
            });

            nodes.npcIcon.style.opacity = "0.5";

            if (player.health > npc.health) {
                nodes.combatText.innerText =
                    "Hehe, poor enemy has no lives left.. He barely holds himself in one piece.";
                nodes.gameEndText.textContent = "You Won This Battle!";
                nodes.gameEndText.style.color = "#62b49c";
            } else {
                nodes.combatText.innerText =
                    "Ouch.. No lives left for you. Enjoy the mocking laughter of the enemy.";
                nodes.gameEndText.textContent = "You Lost This Battle!";
                nodes.gameEndText.style.color = "#b96b78";
            }
            nodes.buttonPlayAgain.style.visibility = "visible";
        }
    },
    reset: function () {
        nodes.buttonPlayAgain.addEventListener("click", () => {
            window.location.reload();
        });
    },
    play: function () {
        round.countRounds();
        npc.play();
        round.countHealth();
        game.end();
        game.reset();
    },
};

nodes.elementButtons.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.classList.contains("assassinButton")) {
            nodes.elementIcons[0].style.color = "#8070ac";
            nodes.elementIcons[1].style.color = "#5e5e5e";
            nodes.elementIcons[2].style.color = "#5e5e5e";
            player.selection = "assassin";
        } else if (element.classList.contains("archerButton")) {
            nodes.elementIcons[1].style.color = "#62b49c";
            nodes.elementIcons[0].style.color = "#5e5e5e";
            nodes.elementIcons[2].style.color = "#5e5e5e";
            player.selection = "archer";
        } else {
            nodes.elementIcons[2].style.color = "#b96b78";
            nodes.elementIcons[0].style.color = "#5e5e5e";
            nodes.elementIcons[1].style.color = "#5e5e5e";
            player.selection = "tank";
        }
        game.play();
    });
});
