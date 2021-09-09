import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { BackSide, DoubleSide } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//torus

// const waterTexture = new THREE.TextureLoader().load('textureWater.jpg')
// const geometry = new THREE.TorusKnotGeometry(2, 0.75, 100, 100);
// const material = new THREE.MeshStandardMaterial({map: waterTexture});
// const torus = new THREE.Mesh( geometry, material );

// scene.add(torus);
// torus.position.set(-5,-2,30);

//Luz
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0x888888;  // brownish orange
const intensity = 2;
const light = new THREE.HemisphereLight(groundColor, skyColor, intensity);
scene.add(light);

//Guia
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add( gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//Bolhas
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter:THREE.LinearMipmapLinearFilter } );
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

const pivot = new THREE.Object3D();
scene.add(pivot);

const pivot2 = new THREE.Object3D();
scene.add(pivot2);

const pivot3 = new THREE.Object3D();
scene.add(pivot3);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.45, 24, 24);
  const material = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xB1E1FF,
    specular: 0xffffff,
    envMap: cubeRenderTarget.texture,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });  
  const Ball = new THREE.Mesh(geometry, material);
  Ball.castShadow = true;
  Ball.receiveShadow = true;
  Ball.add(cubeCamera);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  Ball.position.set(x,y,z);
  pivot.add(Ball);
}

Array(100).fill().forEach(addStar);

function addStar2() {
  const geometry = new THREE.SphereGeometry(1.45, 24, 24);
  const material = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xB1E1FF,
    specular: 0x9999ff,
    envMap: cubeRenderTarget.texture,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });  
  const Ball = new THREE.Mesh(geometry, material);
  Ball.castShadow = true;
  Ball.receiveShadow = true;
  Ball.add(cubeCamera);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  Ball.position.set(x,y,z);
  pivot2.add(Ball);
}

Array(100).fill().forEach(addStar2);

function addStar3() {
  const geometry = new THREE.SphereGeometry(0.75, 24, 24);
  const material = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xB1E1FF,
    specular: 0xffffff,
    envMap: cubeRenderTarget.texture,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });  
  const Ball = new THREE.Mesh(geometry, material);
  Ball.castShadow = true;
  Ball.receiveShadow = true;
  Ball.add(cubeCamera);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  Ball.position.set(x,y,z);
  pivot3.add(Ball);
}

Array(100).fill().forEach(addStar3);

//Avatar

// const vitorTexture = new THREE.TextureLoader().load('Perfil.png')
// const vitor = new THREE.Mesh(
//   new THREE.CircleGeometry(3),
//   new THREE.MeshBasicMaterial({map:vitorTexture, side: DoubleSide})
// );

// scene.add(vitor);
// vitor.position.set(10,0,0)





//bg
const seaTexture = new THREE.TextureLoader().load('sea.jpg');

const sea = new THREE.Mesh(
  new THREE.SphereGeometry(100,32,32),
  new THREE.MeshStandardMaterial({map:seaTexture, side: BackSide})
);

scene.add(sea);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = (t * -0.01)-1;
  camera.position.x = (t * -0.0002)-1;
  camera.position.y = (t * -0.0002)-1;
  

};

document.body.onscroll = moveCamera;


function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.005;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.005;

  pivot.rotation.x += 0.0003;
  pivot.rotation.y += 0.001;
  pivot.rotation.z += 0.0001;

  pivot2.rotation.x += 0.001;
  pivot2.rotation.y += 0.0001;
  pivot2.rotation.z += 0.0003;

  pivot3.rotation.x += 0.0001;
  pivot3.rotation.y += 0.0003;
  pivot3.rotation.z += 0.001;

  // vitor.rotation.y += 0.01;

  controls.update();
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
}

animate();