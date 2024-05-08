import * as THREE from 'three';

// export function cubeAnimate(cube) {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
// }

// export function cubeCreate() {
//   const geometry = new THREE.BoxGeometry(1, 1, 1);
//   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//   const cube = new THREE.Mesh(geometry, material);

//   return cube
// }

export class Cube extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    super(geometry, material)
  }

  animate() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}