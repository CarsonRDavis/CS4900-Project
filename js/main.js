//This file calls all necessary methods found in our other js files

//set window size
var height = window.innerHeight;
var width = window.innerWidth;
//create renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);
//create scene
var scene = new THREE.Scene;
scene.background = new THREE.Color("#C0C0C0");
//call method from worldGeneration.js
worldCreation(scene);
//create camera and camera controls
var camera = createCamera(width, height, renderer, scene);
var controls = addCameraControls();

//add objects and set selectedCube
var selectedCube = addCubes();
createBanana();
//add event listeners
window.addEventListener('keypress', cameraRotation, false);
window.addEventListener('keypress', moveBanana, false);
//call animate function
animate();

