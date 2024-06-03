// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.z = 5;


// Create paddles
const paddleGeometry = new THREE.BoxGeometry(1, 0.2, 0.1);
const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
leftPaddle.position.set(-3, 0, 0);
rightPaddle.position.set(3, 0, 0);
scene.add(leftPaddle);
scene.add(rightPaddle);

// Create ball
const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// Set initial ball velocity
let ballVelocity = new THREE.Vector3(0.02, 0.02, 0);

// Paddle movement
const paddleSpeed = 0.1;
const keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.code] = false;
});

function movePaddles() {
  // Move left paddle
  if (keysPressed['KeyW'] && leftPaddle.position.y < 2.5) {
    leftPaddle.position.y += paddleSpeed;
  }
  if (keysPressed['KeyS'] && leftPaddle.position.y > -2.5) {
    leftPaddle.position.y -= paddleSpeed;
  } a
  // Move right paddle
  if (keysPressed['ArrowUp'] && rightPaddle.position.y < 2.5) {
    rightPaddle.position.y += paddleSpeed;
  }
  if (keysPressed['ArrowDown'] && rightPaddle.position.y > -2.5) {
    rightPaddle.position.y -= paddleSpeed;
  }
}

// Ball movement and collision detection
function updateBall() {
  ball.position.add(ballVelocity);

  // Check for collision with top and bottom walls
  if (ball.position.y > 2.5 || ball.position.y < -2.5) {
    ballVelocity.y = -ballVelocity.y;
  }

  // Check for collision with paddles
  if ((ball.position.x < leftPaddle.position.x + 0.5 && ball.position.x > leftPaddle.position.x - 0.5 &&
    ball.position.y < leftPaddle.position.y + 0.1 && ball.position.y > leftPaddle.position.y - 0.1) ||
    (ball.position.x < rightPaddle.position.x + 0.5 && ball.position.x > rightPaddle.position.x - 0.5 &&
      ball.position.y < rightPaddle.position.y + 0.1 && ball.position.y > rightPaddle.position.y - 0.1)) {
    ballVelocity.x = -ballVelocity.x;
  }

  // Check for scoring
  if (ball.position.x > 4 || ball.position.x < -4) {
    ball.position.set(0, 0, 0);
    ballVelocity.set(0.02, 0.02, 0);
  }
}


function animate() {
  requestAnimationFrame(animate);

  updateBall();

  renderer.render(scene, camera);
}

animate();

