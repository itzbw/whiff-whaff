import * as THREE from 'three';
import { texture } from 'three/examples/jsm/nodes/Nodes.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./asset/smoke.png"),
});
const sphere = new THREE.Mesh(geometry, material);
//scene.add(sphere);


const geometry2 = new THREE.SphereGeometry(15, 32, 16);
const material2 = new THREE.MeshBasicMaterial({
  // map: new THREE.TextureLoader().load("./asset/smoke.png"),
  //color: 0x000000,
  wireframe: true
});
const sphere2 = new THREE.Mesh(geometry2, material2);
//sphere2.position.y -= 100;
scene.add(sphere2);


function animate2() {
  requestAnimationFrame(animate2);

  sphere2.rotation.x += 0.01;
  sphere2.rotation.y += 0.01;

  renderer.render(scene, camera);
};

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
animate2();