import * as THREE from 'three';
import dat from 'https://cdn.skypack.dev/dat.gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({});

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);

cube2.position.x = -3;

camera.position.z = 5;

/// GUI ///
const gui = new dat.GUI();

/// change size

gui.add(cube.scale, 'x', 0, 3).name('Right Scale X');
gui.add(cube.scale, 'y', 0, 3).name('Right Scale Y');
gui.add(cube.scale, 'z', 0, 3).name('Right Scale Z');
gui.add(cube2.scale, 'x', 0, 3).name('Left Scale X');
gui.add(cube2.scale, 'y', 0, 3).name('Left Scale Y');
gui.add(cube2.scale, 'z', 0, 3).name('Left Scale Z');

// change color
const materialParams = {
  cubeMeshColor: cube.material.color.getHex(),
};
const materialParams2 = {
  cube2MeshColor: cube2.material.color.getHex(),
};
gui.add(cube.material, 'wireframe');
gui.add(cube2.material, 'wireframe');
gui
  .addColor(materialParams, 'cubeMeshColor')
  .onChange((value) => cube.material.color.set(value));
gui
  .addColor(materialParams2, 'cube2MeshColor')
  .onChange((value) => cube2.material.color.set(value));

// const materialParams2 = {
//   cube2MeshColor: cube2.material.color.getHex(),
// };
// gui.add(cube2.material, 'wireframe');
// gui
//   .addColor(materialParams2, 'cube2MeshColor')
//   .onChange((value) => cube2.material.color.set(value));

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;

  renderer.render(scene, camera);

}