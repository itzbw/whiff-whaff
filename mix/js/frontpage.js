import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.149.0/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@v0.149.0/examples/jsm/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
// zoom out 
camera.position.z = 300;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const mainWindow = document.getElementById('main-window');

const resizeRenderer = () => {
  const width = mainWindow.clientWidth;
  const height = mainWindow.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

// Call resizeRenderer to set initial size
resizeRenderer();

mainWindow.innerHTML = ''; // Clear any existing content
mainWindow.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 32, 16);


var materialMoon = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./img/moon.jpg"),
});

const sphere = new THREE.Mesh(geometry, materialMoon); // smoke by deflaut
// distortion fisheye effect -> change camera persective
sphere.position.x = 0;
sphere.position.y = 0;
//sphere.position.y = -50;
scene.add(sphere);


const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new TextGeometry('3D PONG', {
    font: font,
    size: 10,
    height: 1,
  });

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Position text below the sphere
  textMesh.position.set(-30, -30, 0); // Adjust position as needed
  scene.add(textMesh);
});




function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
};

function loadFrontPage() {
  console.log("Front page loaded");
  animate();
}

window.addEventListener('resize', resizeRenderer);

document.addEventListener("DOMContentLoaded", loadFrontPage);


