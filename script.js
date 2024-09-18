const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeButton = document.getElementById('close');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showModal(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        showModal('It\'s a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill('');
    cells.forEach(cell => cell.textContent = '');
    closeModal();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
closeButton.addEventListener('click', closeModal);
newGameButton.addEventListener('click', restartGame);
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});
