const parent = document.getElementById('parent');
const child = Array.from(document.getElementsByClassName("child"));
const result = document.getElementById("result");
const h1 = document.getElementById('h1');
const xDisplay = document.getElementById("X");
const oDisplay = document.getElementById("O");

let countX = Number(localStorage.getItem('countX')) || 0;
let countO = Number(localStorage.getItem("countO")) || 0;
let step = "X";
let count = 0;
let gameOver = false;

const winnerCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

parent.addEventListener("click", (event) => {
    const target = event.target;

    if (gameOver || !target.classList.contains("child") || target.innerText !== "") {
        return;
    }

    target.innerText = step;
    count++;

    if(step == "X") {
        target.style.color = "rgb(13, 120, 150)";
        step = "O";
        h1.innerText = "Play with O";
    } else {
        target.style.color = "rgb(13, 120, 150)";
        step = "X";
        h1.innerHTML = "Play with X";
    }

    checkWinner();
    if (!gameOver) {
        checkDraw();
    }
});

function checkWinner() {
    for(let combination of winnerCombinations) {
        const [a,b,c] = combination;
        const valA = child[a].innerText;

        if(valA && valA === child[b].innerText && valA === child[c].innerText) {
            result.value = `Player '${valA}' won!! 😀`;
            result.style.color = "green";
            result.style.border = "2px solid green";
            h1.innerText = "Tic-Tac-Toe";
            gameOver = true;

            if (valA === "X") {
                countX++;
                localStorage.setItem("countX", countX);
            } else {
                countO++;
                localStorage.setItem("countO", countO);
            }
            updateCount();
            return;
        }
    }
}

function checkDraw() {
    if(count === 9) {
        result.value = `It's a draw!! 😒`;
        result.style.color = "red";
        result.style.border = "2px solid red";
        h1.innerText = "Tic-Tac-Toe";
        gameOver = true;
    }
}

function updateCount() {
    xDisplay.innerText = `X: ${countX}`;
    oDisplay.innerText = `O: ${countO}`;
}

function resetCount() {
    countX = 0;
    countO = 0;
    localStorage.clear();
    updateCount();
}

function playAgain() {
    child.forEach(cell => {
        cell.innerText = "";
        cell.style.color = "";
    });
    count = 0;
    step = "X";
    gameOver = false;
    result.value = '';
    result.style.border = '';
    h1.innerText = 'Play with "X"';
}

updateCount();

document.getElementById("btn").addEventListener('click', resetCount);
document.getElementById('btn1').addEventListener('click', playAgain);