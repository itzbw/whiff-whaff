const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoretext");
const resetButton = document.querySelector("#resetButton");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "grey";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12;
const paddleSpeed = 50;

let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;

let ballXDirection = 0;
let ballYDirection = 0;
let play1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
}
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
}

window.addEventListener("keydown", changeDirection);
resetButton?.addEventListener("click", resetGame);

gameStart();
drawPaddle();

function gameStart() {
    createBall();
    nextTick();
};

function drawPaddle() {
    ctx.strokeStyle = paddleBorder;
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

function nextTick() {
    // A callback is a function passed as an argument to another function
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddle();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick(); // for another round
    }, 10)

};
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};


function createBall() { };
function moveBall() { };
function drawBall(ballX, ballY) { };
function checkCollision() { };
function changeDirection() { };
function updateScore() { };
function resetGame() { };


