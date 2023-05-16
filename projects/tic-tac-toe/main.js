const cells = document.querySelectorAll("#board .cell");
const restart = document.querySelector('#restart');
const state = document.querySelector('.state');
let playerTurn = 'X';
state.textContent = setGameState();
function setGameState(){
    return `It's ${playerTurn}'s turn!`;
}
function sendWinningMessage(){
    return `Player ${playerTurn} has won!`;
}
function sendDrawMessage(){
    return `It's a draw!`;
}
let gameState = ['','','','','','','','',''];
let gameActive = true;
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
restart.addEventListener('click', restartGame);
for(const cell of cells){
    cell.addEventListener('click', handleClickedCell);
}
function handleClickedCell(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if(gameState[clickedCellIndex] !== '' || !gameActive){
        return;
    }
    handlePlayedCell(clickedCell, clickedCellIndex);
    checkWinningConditions();
}
function handlePlayedCell(cell, cellIndex){
    gameState[cellIndex] = playerTurn;
    cell.textContent = playerTurn;
}
function checkWinningConditions(){
    var roundWin = false;
    for(let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === ''||b === ''||c === ''){
            continue;
        }
        if(a === b && b === c){
            roundWin = true;
            break;
        }
    }
    const roundDraw = !gameState.includes("");
    if(roundWin){
        state.textContent = sendWinningMessage();
        gameActive = false;
        return;
    }
    if(roundDraw){
        state.textContent = sendDrawMessage();
        gameActive = false;
        return;
    }

    changePlayerTurn();
}
function changePlayerTurn(){
    playerTurn = playerTurn === "X" ? "O" : "X";
    state.textContent = setGameState();
}
function restartGame(){
    playerTurn = 'X';
    gameState = ['','','','','','','','',''];
    gameActive = true;
    for(const cell of cells){
        cell.textContent = '';
    }
    state.textContent = setGameState();
}