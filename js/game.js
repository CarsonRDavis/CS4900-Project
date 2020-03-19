import { boardGen } from './gameBoard.js';
import {createCamera, addCameraControls} from'./camera.js';
import {createModels } from './modelMaker.js';
import {HeightMap, VanillaRandomHeightMap} from './heightMap.js';
var height = window.innerHeight;
var width = window.innerWidth;
//create renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.append(renderer.domElement);

//create scene
var scene = new THREE.Scene;
scene.background = new THREE.Color("#C0C0C0");

//Generate height map and obstacles array 
var heightMap = new VanillaRandomHeightMap(4).map;
let mapVerts = heightMap.length;
var obstacles = [...Array(mapVerts-1)].map((_, i) => [...Array(mapVerts-1)].map((_, i) => 0));

//call method from worldGeneration.js
boardGen(scene, heightMap, obstacles);

//create camera and camera controls
var camera = createCamera(width, height, renderer, scene);
var controls = addCameraControls(camera, renderer);

const manager = new THREE.LoadingManager();
manager.onLoad = init;
createModels(manager,scene, heightMap);

function init(){
    var def = new Defender('Dan');
    def.model = scene.getObjectByName('defender');
    var mel = new Melee('Mike');
    mel.model = scene.getObjectByName('melee');
    var ran = new Range('Rick');
    ran.model = scene.getObjectByName('ranged');
    for(let i = 0; i < obstacles.length;i++){
        console.log(obstacles[i].toString());
    }
    animate1();
}

//add event listeners
//window.addEventListener('keypress', cameraRotation, false);
window.addEventListener('keypress', moveActor, false);
//call animate function

//animation loop
function animate1() {
    requestAnimationFrame(animate1);

    // Rerenders the scene
    renderer.render(scene, camera);
    //update the controls
    controls.update();
}

