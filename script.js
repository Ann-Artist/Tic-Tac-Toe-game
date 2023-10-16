const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultTitle = document.getElementById('result-title');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            return boardState[a];
        }
    }
    if (!boardState.includes('') && gameActive) {
        gameActive = false;
        return 'Draw';
    }
    return null;
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;
    
    if (boardState[cellIndex] === '' && gameActive) {
        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        
        const winner = checkWinner();
        if (winner) {
            if (winner === 'Draw') {
                showResult('It\'s a Draw!');
            } else {
                showResult(`Player ${winner} wins!`);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function showResult(result) {
    resultTitle.textContent = result;
    resultScreen.style.display = 'flex';
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    resultScreen.style.display = 'none';
}

function newGame() {
    resetGame();
    resultScreen.style.display = 'none';
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', newGame);

// Initialize the game
status.textContent = `Player ${currentPlayer}'s turn`;
