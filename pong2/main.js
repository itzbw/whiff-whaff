import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.149.0/build/three.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a point light
const light = new THREE.AmbientLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Main board
const boardWidth = 10;
const boardLength = 5;
const boardGeometry = new THREE.BoxGeometry(boardWidth, 0.2, boardLength, 10, 10, 10); // Width, height (depth), length
const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }); // Brown color for the board
const board = new THREE.Mesh(boardGeometry, boardMaterial);
board.position.y = -0.1; //
scene.add(board);

// Create paddles


// Left paddle
const leftPaddleGeometry = new THREE.BoxGeometry(0.2, 0.5, 1); // Width, height, depth
const leftPaddleMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color for the paddles
const leftPaddle = new THREE.Mesh(leftPaddleGeometry, leftPaddleMaterial);
leftPaddle.position.set(-5, 0.15, 0); // Position it on the left edge of the board
scene.add(leftPaddle);

// Right paddle
const rightPaddleGeometry = new THREE.BoxGeometry(0.2, 0.5, 1); // Width, height, depth
const rightPaddleMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff }); // Blue color for the paddles
const rightPaddle = new THREE.Mesh(rightPaddleGeometry, rightPaddleMaterial);
rightPaddle.position.set(5, 0.15, 0); // Position it on the right edge of the board
scene.add(rightPaddle);

// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radius, width segments, height segments
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true }); // Red color for the sphere
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Add the sphere to the scene
sphere.position.set(0, 0.1, 0); // Position it at the center of the board
scene.add(sphere);


// Add event listener for resizing the window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add mouse interaction
document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

function onDocumentMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


// Key states for paddle movement
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  KeyW: false,
  KeyS: false
};

// Event listeners for keydown and keyup
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') {
    keys.ArrowUp = true;
  } else if (event.code === 'ArrowDown') {
    keys.ArrowDown = true;
  } else if (event.code === 'KeyW') {
    keys.KeyW = true;
  } else if (event.code === 'KeyS') {
    keys.KeyS = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowUp') {
    keys.ArrowUp = false;
  } else if (event.code === 'ArrowDown') {
    keys.ArrowDown = false;
  } else if (event.code === 'KeyW') {
    keys.KeyW = false;
  } else if (event.code === 'KeyS') {
    keys.KeyS = false;
  }
});




// Render the scene from the perspective of the camera
function animate() {
  requestAnimationFrame(animate);

  // Paddle movement based on key states
  const paddleSpeed = 0.1;
  if (keys.ArrowUp) {
    rightPaddle.position.z -= paddleSpeed;
  }
  if (keys.ArrowDown) {
    rightPaddle.position.z += paddleSpeed;
  }
  if (keys.KeyW) {
    leftPaddle.position.z -= paddleSpeed;
  }
  if (keys.KeyS) {
    leftPaddle.position.z += paddleSpeed;
  }

  // Clamp paddle position within board boundaries
  const boardHeight = 5;
  const paddleLength = 3; // Half of the paddle's height for boundary calculation
  rightPaddle.position.z = THREE.MathUtils.clamp(rightPaddle.position.z, -boardHeight + paddleLength, boardHeight - paddleLength);
  leftPaddle.position.z = THREE.MathUtils.clamp(leftPaddle.position.z, -boardHeight + paddleLength, boardHeight - paddleLength);


  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
