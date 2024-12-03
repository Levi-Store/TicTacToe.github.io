const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Create the board
function createBoard() {
  gameBoard.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
}

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameBoard[index] !== "" || !isGameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (gameBoard.every((cell) => cell !== "")) {
    status.textContent = "It's a tie!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  return winConditions.some((combination) => {
    return combination.every((index) => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

// Restart game
restartBtn.addEventListener("click", () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  status.textContent = "Player X's turn";
  board.innerHTML = "";
  createBoard();
});

// Initialize game
createBoard();
