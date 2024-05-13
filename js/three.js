import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import * as TWEEN from '@tweenjs/tween.js'
// import { Interaction } from 'three.interaction';
// install other addons with the format in this link... very helpful
// https://threejs.org/docs/#manual/en/introduction/Installation

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener("mousedown", onDocumentMouseDown, false);
// document.addEventListener("mousemove", onDocumentMouseMove, false);

function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  // if (intersects.length > 0) {
  if (intersects.length > 0 && intersects[0].object !== gridHelper) {
    console.log(intersects);
    intersects[0].object.material.color.set(0xff0000);
    console.log(intersects[0].object);

    moveCam(intersects);
  }
  else {
    console.log("not intersecting objects");
  }
};

function moveCam(intersects) {
  const p = intersects[0].point
  new TWEEN.Tween(controls.target)
      .to(
          {
              x: p.x,
              y: p.y,
              z: p.z,
          },
          500
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
}

// function onDocumentMouseMove(event) {
//   event.preventDefault();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children);
//   if (intersects.length > 0 && intersects[0].object !== gridHelper) {
//     console.log(intersects);
//     intersects[0].object.material.color.set(0xff0000);
//     console.log(intersects[0].object);
//   }
//   else {
//     console.log("not intersecting objects");
//   }
// };



let geometry = new THREE.BoxGeometry(3,5,3);
let material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

let gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

let controls = new OrbitControls(camera, renderer.domElement);
camera.position.set( 0, 20, 30 );
controls.update();

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  TWEEN.update()

  renderer.render(scene, camera);
}

animate();