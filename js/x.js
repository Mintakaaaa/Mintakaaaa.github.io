import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
//set up scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 500;

//initialize WebGLRenderer
const webglRenderer = new THREE.WebGLRenderer();
webglRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(webglRenderer.domElement);

//initialize CSS3DRenderer
const css3dRenderer = new CSS3DRenderer();
css3dRenderer.setSize(window.innerWidth, window.innerHeight);
css3dRenderer.domElement.style.position = 'absolute';
css3dRenderer.domElement.style.top = 0;
document.body.appendChild(css3dRenderer.domElement);

let controls = new OrbitControls(camera, css3dRenderer.domElement);

//add objects to the scene

//WebGL cube
let geometry = new THREE.BoxGeometry(100, 100, 100);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//CSS3D object
let element = document.createElement('div');
element.style.width = '100px';
element.style.height = '100px';
element.style.background = 'rgba(255,0,0,0.5)';
let button = document.createElement('button');
button.innerHTML = 'Click Me';
element.appendChild(button);
button.addEventListener('click', () => {
  console.log('clicked');
  button.style.color = "red"
});
const iframe = document.createElement( 'iframe' );
iframe.style.width = '480px';
iframe.style.height = '360px';
iframe.style.border = '0px';
iframe.src = [ 'tests.html' ];
element.appendChild( iframe );

let cssObject = new CSS3DObject(element);
cssObject.position.x = 200;
scene.add(cssObject);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

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

    // moveCam(intersects);
    // moveObjectUp(intersects[0].object);
  }
  else {
    console.log("not intersecting objects");
  }
};

//sync renderers
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Rotate the CSS object
  cssObject.rotation.x += 0.01;
  cssObject.rotation.y += 0.01;

  controls.update();

  // Render with both renderers
  webglRenderer.render(scene, camera);
  css3dRenderer.render(scene, camera);
}

animate();

//window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  webglRenderer.setSize(window.innerWidth, window.innerHeight);
  css3dRenderer.setSize(window.innerWidth, window.innerHeight);
}

