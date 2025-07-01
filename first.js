let turn = "player_1";
let total_turn = 0;

let board_array = new Array(9).fill("E");

let answer = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let [i0, i1, i2] of answer) {
        if (
            board_array[i0] !== "E" &&
            board_array[i0] === board_array[i1] &&
            board_array[i1] === board_array[i2]
        ) {
            return 1;
        }
    }
    return 0;
}

function setBlinkingPlayer(currentTurn) {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");

    if (currentTurn === "player_1") {
        player1.classList.add("blink");
        player2.classList.remove("blink");
    }
    else {
        player2.classList.add("blink");
        player1.classList.remove("blink");
    }
}

const printer = (event) => {
    total_turn++;

    if (board_array[event.target.id] === "E") {
        const message = document.getElementById("winningmessage");

        if (turn === "player_1") {
            event.target.innerHTML = "O";
            board_array[event.target.id] = "O";
            if (checkWinner()) {
                message.innerHTML = "Winner is Muskii";
                message.classList.add("glow-text");
                board.removeEventListener("click", printer);
                return;
            }
            turn = "player_2";
            setBlinkingPlayer(turn);
        } else {
            event.target.innerHTML = "X";
            board_array[event.target.id] = "X";
            if (checkWinner()) {
                message.innerHTML = "Winner is Aman";
                message.classList.add("glow-text");
                board.removeEventListener("click", printer);
                return;
            }
            turn = "player_1";
            setBlinkingPlayer(turn);
        }
    }

    if (total_turn === 9) {
        const message = document.getElementById("winningmessage");
        message.innerHTML = "Match is drawn between Aman & Muskii";
        message.classList.add("draw-glow");

        // Stop blinking
        document.getElementById("player1").classList.remove("blink");
        document.getElementById("player2").classList.remove("blink");
    }
};

const board = document.querySelector(".board");
board.addEventListener("click", printer);

const restart = document.getElementById("restartGame");
restart.addEventListener("click", () => {
    const cell = document.getElementsByClassName("cell");
    Array.from(cell).forEach((value) => {
        value.innerHTML = "";
    });

    turn = "player_1";
    total_turn = 0;
    board_array = new Array(9).fill("E");
    board.addEventListener("click", printer);

    const message = document.getElementById("winningmessage");
    message.innerHTML = "";
    message.classList.remove("draw-glow", "glow-text");

    document.getElementById("player1").classList.remove("winner-glow");
    document.getElementById("player2").classList.remove("winner-glow");

    // Restore blinking to initial player
    setBlinkingPlayer(turn);
});

setBlinkingPlayer(turn);
