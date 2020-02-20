import { worldCreation, highlightGeneration } from './js/worldGeneration.js';
import { createCamera, addCameraControls } from './js/camera.js';
import { //createModel1, createModel2, createModel3, 
    keyLifted, movePlayer, createModels, loadCat } from './js/objectGeneration.js';

//set window size
var height = window.innerHeight;
var width = window.innerWidth;
//create renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);
//create scene
var scene = new THREE.Scene();
scene.background = new THREE.Color("#C0C0C0");

var camera = createCamera(width, height, renderer, scene);
scene.add(camera);
addCameraControls(camera, renderer);

worldCreation(scene);
var highlights = [];
highlights = highlightGeneration(scene);

// var charactersArray = [];

// createModel1(charactersArray);
// createModel2(charactersArray, scene);
// createModel3(charactersArray, scene);

createModels();
loadCat();

const mapTopZ = 4.5;
const mapRightX = -4.5;
const mapBottomZ = -4.5;
const mapLeftX = 4.5;

function animate(){     //returns void
    requestAnimationFrame(animate);
    // Rerenders the scene
    renderer.render(scene, camera);
}

var player = window.addEventListener('keydown', movePlayer, false);
window.addEventListener('keyup', keyLifted, false);

animate();

export { scene, //charactersArray,
        mapTopZ, mapRightX, mapBottomZ, mapLeftX, 
        highlights };
	//player };
