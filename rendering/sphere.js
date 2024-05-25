import * as THREE from 'three';
import { objectPosition, texture } from 'three/examples/jsm/nodes/Nodes.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
// zoom out 
camera.position.z = 500;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 32, 16);


var materialSmoke = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./asset/smoke.png"),
});
var materialStars = new THREE.MeshBasicMaterial({
  wireframe: true
});



const sphere = new THREE.Mesh(geometry, materialSmoke); // smoke by deflaut
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

// scene.add(sphere2);


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

function ball_1() {
  if (sphere2)
    scene.remove(sphere2);
  scene.add(sphere);
  animate();
}

function ball_2() {
  if (sphere)
    scene.remove(sphere);
  scene.add(sphere2);
  animate2();

}

var ball1 = document.getElementById("ball1");
var ball2 = document.getElementById("ball2");



ball1.onclick = function () {
  ball_1();

}

ball2.onclick = function () {
  ball_2();
}

window.onload = function () {
  ball_1();
}

