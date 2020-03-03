import { worldCreation, highlightGeneration } from './js/worldGeneration.js';
import { createCamera, addCameraControls } from './js/camera.js';
import { keyLifted, movePlayer, createModels, loadCat, changeCharacter, } from './js/objectGeneration.js';
import { Node, LinkedList } from './js/LinkedList.js';
import { addButtons, onEndTurnClick } from './js/HUD.js';

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

loadCat();

const mapTopZ = 4.5;
const mapRightX = -4.5;
const mapBottomZ = -4.5;
const mapLeftX = 4.5;

function animate() {     //returns void
    requestAnimationFrame(animate);
    // Rerenders the scene
    renderer.render(scene, camera);
    //console.log(camera.position);
}

var manager = new THREE.LoadingManager();
var charactersArray = [];
var characterCount = 0;

var managerEnemies = new THREE.LoadingManager();
var enemiesArray = [];
var enemyCount = 0;

//let linked = new LinkedList();
//createModels(linked, manager);
createModels(charactersArray, enemiesArray, manager, managerEnemies);

managerEnemies.onLoad = function() {
    console.log("enemies loaded");
}

//add end turn button

manager.onLoad = function(){

    console.log(characterCount);

    addButtons(charactersArray);

    //Reference: https://stackoverflow.com/questions/8941183/pass-multiple-arguments-along-with-an-event-object-to-an-event-handler
    //var handler = function (character, linked) {
    let handler = function (charactersArray) {
        return function (event) {
            if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'c')
                movePlayer(event.key, charactersArray);
            else if (event.key === 'r')
                changeCharacter();
        };
    };

    window.addEventListener('keydown', handler(charactersArray), false);
    window.addEventListener('keyup', keyLifted, false);
    console.log(characterCount);
    animate();
}

export { scene, charactersArray, enemiesArray, mapTopZ, mapRightX, mapBottomZ, mapLeftX, highlights };