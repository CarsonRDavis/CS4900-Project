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
var highlights = worldCreation(scene);
//create camera and camera controls
var camera = createCamera(width, height, renderer, scene);
var controls = addCameraControls();

const mapTopZ = 4.5;
const mapRightX = -4.5;
const mapBottomZ = -4.5;
const mapLeftX = 4.5;

//add objects and set selectedCube
var selectedCube = addCubes();
createBanana();
//add event listeners
//window.addEventListener('keypress', cameraRotation, false);
var down = true;
window.addEventListener('keydown', moveBanana, false);
window.addEventListener('keyup', bananaUp, false);
//call animate function
animate();