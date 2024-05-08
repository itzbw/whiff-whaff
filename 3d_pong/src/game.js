import * as THREE from 'three';
import { Cube } from './cube'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new Cube()
scene.add(cube);

camera.position.set(0, 0, 5)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    cube.animate()
}
animate();