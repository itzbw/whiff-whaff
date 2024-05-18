import * as THREE from 'three';
import { VerticalBlurShader } from 'three/examples/jsm/Addons.js';

//https://discourse.threejs.org/t/uncaught-push-problem/37206

let scene, camera, renderer, starGeo, stars, sphere2;
const vertices = [];
const velocity = [];

function init() {
  //create scene object
  scene = new THREE.Scene();

  //setup camera with facing upward
  camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;
  //camera.rotation.x = Math.PI / 2;


  //setup renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  starGeo = new THREE.BufferGeometry(); // Geometry is decrypted
  for (let i = 0; i < 6000; i++) {
    var star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    //starGeo.vertices.push(star);
    vertices.velocity = 0;
    vertices.acceleration = 0.02;
    vertices.push(star.x, star.y, star.z);
    velocity.push(0);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  let sprite = new THREE.TextureLoader().load('./asset/dot.png');
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
  });
  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);


  // add shphere

  const geometry2 = new THREE.SphereGeometry(15, 32, 16);
  const material2 = new THREE.MeshBasicMaterial({
    // map: new THREE.TextureLoader().load("./asset/smoke.png"),
    color: 0xffffbb,
    wireframe: true
  });
  sphere2 = new THREE.Mesh(geometry2, material2);
  scene.add(sphere2);


  animate();
}





//rendering loop
function animate() {

  const positionAttribute = stars.geometry.getAttribute('position');

  for (let i = 0; i < positionAttribute.count; i++) {

    velocity[i] -= 0.1 + Math.random() * 0.1;

    let y = positionAttribute.getY(i);

    y += velocity[i];

    if (y < -200) {

      y = 200;
      velocity[i] = 0;

    }

    positionAttribute.setY(i, y);

  }

  positionAttribute.needsUpdate = true;

  stars.rotation.y += 0.001;
  stars.rotation.x -= 0.001;


  // sphere 2 movement
  sphere2.rotation.x += 0.01;
  sphere2.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();
