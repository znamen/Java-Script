const grid = document.getElementById("grid");

const GRID_SIZE = 10;
const CELL_SIZE = 30;
let playerPosition = { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) };

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
