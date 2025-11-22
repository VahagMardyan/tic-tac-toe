// // creates tr and td with JS

// const parent=document.getElementById('parent');
//     for(let i=0;i<3;i++){
//         const row=document.createElement('tr');
//         for(let j=0;j<3;j++){
//             const cell=document.createElement('td');
//             cell.className='child';
//             row.append(cell);
//         }
//         parent.append(row);
// }

const parent = document.getElementById('parent');
const child = Array.from(document.getElementsByClassName('child'));
const result = document.getElementById('result');
const h1 = document.getElementById('h1');
const x = document.getElementById('X');
const o = document.getElementById('O');
let countX = 0;
let countO = 0;
let step = 'X';
let count = 0;
let gameOver = false;

parent.addEventListener('click', (event) => {
    if (gameOver) {
        return;
    }
    for (let i = 0; i < child.length; i++) {
        if (child[i] === event.target && !child[i].innerText) {
            child[i].innerText = step;
            count++
            if (step === 'O') {
                step = 'X';
                event.target.style.color = `rgb(13, 120, 170)`;
                h1.innerText = `Play with "X"`;
            } else {
                step = 'O';
                event.target.style.color = `rgb(13, 120, 150)`;
                h1.innerText = `Play with "O"`;
            }
            checkWinner();
            checkDraw();
        }
    }
});

function checkWinner() {
    const WinnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < WinnerCombinations.length; i++) {
        const combination = WinnerCombinations[i];
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];
        if (child[a].innerText === child[b].innerText && child[b].innerText === child[c].innerText &&
            child[a].innerText) {
            result.value = `Player '${child[a].innerText}' won!! 😀`;
            result.style.color = 'green';
            result.style.border = '2px solid green';
            h1.innerText = 'Tic-Tac-Toe';
            gameOver = true;
            if (child[a].innerText === 'X') {
                countX++;
                localStorage.setItem('countX', countX);
            } else if (child[a].innerText === 'O') {
                countO++;
                localStorage.setItem('countO', countO);
            }
            updateCount();
        }
    }
}

function checkDraw() {
    if (count === 9 && !gameOver) {
        result.value = `It's a draw!! 😒`;
        result.style.color = 'red';
        result.style.border = '2px solid red';
        h1.innerText = 'Tic-Tac-Toe';
        // countX++
        // countO++
        // localStorage.setItem('countX',countX);
        // localStorage.setItem('countO',countO);
        gameOver = true;
    }
    updateCount();
}

if (localStorage.getItem('countX')) {
    countX = localStorage.getItem('countX');
}
if (localStorage.getItem('countO')) {
    countO = localStorage.getItem('countO');
}

function updateCount() {
    // x.value=`X: ${countX}`;
    // o.value=`O: ${countO}`;
    x.innerText = `X:${countX}`;
    o.innerText = `O:${countO}`;
}
updateCount();

function resetCount() {
    x.innerText = `X:0`;
    o.innerText = `O:0`;
    x.value = `X: 0`;
    o.value = `O: 0`;
    localStorage.clear();
}

function playAgain() {
    return location.reload();
}

document.querySelector('#btn').addEventListener('click', () => resetCount());
document.querySelector('#btn1').addEventListener('click', () => playAgain());