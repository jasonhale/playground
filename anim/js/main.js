import WebGL from './WebGL.js';

// base
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  // 75,
  45,
  window.innerWidth / window.innerHeight,
  // 0.1,
  1,
  // 1000
  500
  );

camera.position.set(0,0,100);
camera.lookAt(0,0,0);
  
const scene = new THREE.Scene();

// main

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line(geometry, material);
scene.add(line);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const light = new THREE.DirectionalLight(0xFFFFFF);
// const lightHelper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(lightHelper);

// camera.position.z = 5;
const upper = 10;
const lower = .01;
let direction = .01;

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  if (camera.position.z >= upper) {
    direction = -.01;
  }
  if (camera.position.z <= lower) {
    direction = .01;
  }
  camera.position.z += direction;

  renderer.render(scene, camera);
}

function START() {
  if ( WebGL.isWebGLAvailable() ) {

    // Initiate function or other initializations here
    animate();
  
  } else {
  
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
  
  }
}

START();