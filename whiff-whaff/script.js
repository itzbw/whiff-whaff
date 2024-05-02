const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "grey";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;

var winner = false;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;

let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
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


function createBall() { // ball initiation
    ballSpeed = 1;
    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1; // to the right
    }
    else {
        ballXDirection = -1; // to the left
    }
    if (Math.round(Math.random()) == 1) {
        ballYDirection = Math.random() * 1;
    }
    else {
        ballYDirection = Math.random() * -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};

function moveBall() {
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

};
function checkCollision() {
    //Bouncing
    if (ballY <= 0 + ballRadius) {// edge of the ball
        ballYDirection *= -1; // going to opposite direction
    }
    if (ballY >= gameHeight - ballRadius) {
        ballYDirection *= -1;
    }

    // Scoring
    if (ballX <= 0 + ballRadius) {// edge of the ball
        player2Score += 1;
        updateScore();
        createBall();
        return;
    }
    if (ballX >= gameWidth) {// edge of the ball
        player1Score += 1;
        updateScore();
        createBall();
        return;
    }

    //Bouncing with paddles
    if (ballX <= paddle1.x + paddle1.width + ballRadius) {// check x axis
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) { // check y axis , that means there is a collision
            ballX = (paddle1.x + paddle1.width) + ballRadius; // if stcuks
            ballXDirection *= -1;
            ballSpeed += 1; // faster for each collision with paddle
        }
    }
    if (ballX >= (paddle2.x - ballRadius)) {// check x axis
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) { // check y axis , that means there is a collision
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1; // faster for each collision with paddle
        }
    }


};
function changeDirection(event) {
    const keyPressed = event.keyCode;
    // console.log(keyPressed);
    const paddle1Up = 87; //w
    const paddle1Down = 83 //s
    const paddle2Up = 38; // UP
    const paddle2Down = 40; //DOWN

    switch (keyPressed) {
        case (paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
            }
            break;
        case (paddle1Down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed;
            }
            break;

        case (paddle2Up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed;
            }
            break;
        case (paddle2Down):
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed;
            }
            break;
    }

};
function updateScore() {
    scoreText.textContent = `${player1Score} : ${player2Score}`;

    winning();
};

function winning() {
    if (player1Score == 2) {
        winner = true;
        console.log("player 1 WON");
        resetGame();
    }

    if (player2Score == 2) {
        winner = true;
        console.log("player 2 WON");
        resetGame();
    }

}



function resetGame() {

    player1Score = 0;
    player2Score = 0;

    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0,
    }
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100,
    }

    ballSpeed = 1;
    ballX = 0;
    ballY = 0;

    ballXDirection = 0;
    ballYDirection = 0;

    updateScore();
    clearInterval(intervalID);
    gameStart();

};






