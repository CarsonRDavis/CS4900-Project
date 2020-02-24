//import { HeightMap } from "./heightMap";

var height = window.innerHeight;
var width = window.innerWidth;
//create renderer
var renderer = new THREE.WebGLRenderer();
var actors = {};
renderer.setSize(width, height);

renderer.encodingOutput = 20; 
document.body.append(renderer.domElement);
//create scene
var scene = new THREE.Scene;
scene.background = new THREE.Color("#C0C0C0");
//call method from worldGeneration.js
boardGen(scene);

//create camera and camera controls
var camera = createCamera(width, height, renderer, scene);
var controls = addCameraControls();

const manager = new THREE.LoadingManager();
manager.onLoad = init;
createModels(manager);

function init(){
    var def = new Defender('Dan');
    def.model = scene.getObjectByName('defender');
    var mel = new Melee('Mike');
    mel.model = scene.getObjectByName('melee');
    var ran = new Range('Rick');
    ran.model = scene.getObjectByName('ranged');

    console.log("Creating height map");
    heightMap = new HeightMap(2,1,2,3,4);
}

//add event listeners
window.addEventListener('keypress', cameraRotation, false);
window.addEventListener('keypress', moveActor, false);
//call animate function

animate();

