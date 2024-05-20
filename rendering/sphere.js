import * as THREE from 'three';
import { objectPosition, texture } from 'three/examples/jsm/nodes/Nodes.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
// zoom out 
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./asset/smoke.png"),
});
const sphere = new THREE.Mesh(geometry, material);
// distortion fisheye effect -> change camera persective
sphere.position.x = -50;
//sphere.position.y = -50;
//scene.add(sphere);


const geometry2 = new THREE.SphereGeometry(15, 32, 16);
const material2 = new THREE.MeshBasicMaterial({
  // map: new THREE.TextureLoader().load("./asset/smoke.png"),
  //color: 0x000000,
  wireframe: true
});
const sphere2 = new THREE.Mesh(geometry2, material2);

//scene.add(sphere2);


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

function ball1() {
  scene.add(sphere);
  animate();

}

function ball2() {
  scene.add(sphere2);
  animate2();
}

// ball1();
// ball2();

document.getElementById("clickMe").onclick = ball1;

var el = document.getElementById("clickMe");
if (el.addEventListener)
  el.addEventListener("click", ball1, false);
else if (el.attachEvent)
  el.attachEvent('onclick', ball1);

document.getElementById("clickMe2").onclick = ball2;

var el = document.getElementById("clickMe2");
if (el.addEventListener)
  el.addEventListener("click", ball2, false);
else if (el.attachEvent)
  el.attachEvent('onclick', ball2);

//animate2();