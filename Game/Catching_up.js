const grid = document.getElementById("grid");
const GRID_SIZE = 10;
const CELL_SIZE = 30;
let playerPosition = { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) };
let redCellPosition = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
let countdownTimer;
let gameOver = false;

function showRunMessage() {
    const runMessage = document.getElementById("runMessage");
    runMessage.style.display = "block";
    setTimeout(() => {
        runMessage.style.display = "none";
        startGame();
    }, 2000);
}

function startGame() {
    updateTimer(15);
    countdownTimer = setInterval(updateCountdown, 1000);
    redCellInterval = setInterval(moveRedCell, 2000); // каждую 1 секунду
}

function updateTimer(time) {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time left: ${time}`;
}

function updateCountdown() {
    const timerElement = document.getElementById("timer");
    let currentTime = parseInt(timerElement.textContent.split(" ")[2]);
    if (currentTime > 0) {
        currentTime--;
        updateTimer(currentTime);
    }
    if (currentTime === 0) {
        gameOver = true;
        clearInterval(countdownTimer);
        clearInterval(redCellInterval);
        document.getElementById("youWin").style.display = "block";
    }
}

function createGrid() {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.style.left = x * CELL_SIZE + "px";
            cell.style.top = y * CELL_SIZE + "px";
            grid.appendChild(cell);
        }
    }
	const redCell = document.createElement("div");
    redCell.id = "redCell";
    redCell.style.width = CELL_SIZE + "px";
    redCell.style.height = CELL_SIZE + "px";
    redCell.style.backgroundColor = "red";
    redCell.style.position = "absolute";
    redCell.style.left = redCellPosition.x * CELL_SIZE + "px";
    redCell.style.top = redCellPosition.y * CELL_SIZE + "px";
    grid.appendChild(redCell);
}

function updatePlayerPosition() {
    const player = document.getElementById("player");
    player.style.left = playerPosition.x * CELL_SIZE + "px";
    player.style.top = playerPosition.y * CELL_SIZE + "px";
}

function highlightAdjacentCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.style.backgroundColor = "#545");

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const newX = playerPosition.x + dx;
            const newY = playerPosition.y + dy;
            const cell = document.querySelector(`.cell[data-x="${newX}"][data-y="${newY}"]`);
            if (cell) {
                cell.style.backgroundColor = "white";
            }
        }
    }
}

function movePlayer(newX, newY) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    updatePlayerPosition();
}

function moveRedCell() {
    if (gameOver) return;

    const dx = playerPosition.x - redCellPosition.x;
    const dy = playerPosition.y - redCellPosition.y;

    if (dx !== 0) redCellPosition.x += Math.sign(dx);
    if (dy !== 0) redCellPosition.y += Math.sign(dy);

    const redCell = document.getElementById("redCell");
    redCell.style.left = redCellPosition.x * CELL_SIZE + "px";
    redCell.style.top = redCellPosition.y * CELL_SIZE + "px";

    if (redCellPosition.x === playerPosition.x && redCellPosition.y === playerPosition.y) {
        gameOver = true;
        clearInterval(redCellInterval);
        clearInterval(countdownTimer);
        document.getElementById("gameOver").style.display = "block";
    }
}

function restartGame() {
    gameOver = false;
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("youWin").style.display = "none";
    playerPosition = { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) };
    initializeRedCellPosition();
    updatePlayerPosition();
    highlightAdjacentCells();
    moveRedCell(); // Обновляем положение красной клетки сразу
    showRunMessage();
}


function initializeRedCellPosition() {
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
        case 0:
            redCellPosition = { x: 0, y: Math.floor(Math.random() * GRID_SIZE) }; // Левый край
            break;
        case 1:
            redCellPosition = { x: GRID_SIZE - 1, y: Math.floor(Math.random() * GRID_SIZE) }; // Правый край
            break;
        case 2:
            redCellPosition = { x: Math.floor(Math.random() * GRID_SIZE), y: 0 }; // Верхний край
            break;
        case 3:
            redCellPosition = { x: Math.floor(Math.random() * GRID_SIZE), y: GRID_SIZE - 1 }; // Нижний край
            break;
    }
}

grid.addEventListener("click", event => {
    const clickedCell = event.target;
    const newX = parseInt(clickedCell.dataset.x);
    const newY = parseInt(clickedCell.dataset.y);
    if (clickedCell.classList.contains("cell") && clickedCell.style.backgroundColor === "white") {
        movePlayer(newX, newY);
        highlightAdjacentCells();
        clickedCell.style.backgroundColor = "#333"; // Удаляем белую клетку после перемещения
    }
});

createGrid();
highlightAdjacentCells();
updatePlayerPosition();
initializeRedCellPosition();
moveRedCell(); // Устанавливаем положение красной клетки сразу
showRunMessage(); // Показываем сообщение "Run"
let redCellInterval = setInterval(moveRedCell, 2000); // каждые 2 секунды
