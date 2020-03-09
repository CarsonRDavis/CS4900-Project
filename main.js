import {
    worldCreation,
    generateSkybox,
    fillBoard,
    characterRadius
} from './js/worldGeneration.js';
import {
    createCamera,
    addCameraControls
} from './js/camera.js';
import {
    keyLifted,
    movePlayer,
    createModels,
    loadCat,
    changeCharacter
} from './js/objectGeneration.js';
import {
    Node,
    LinkedList
} from './js/LinkedList.js';
import {
    addButton,
    onEndTurnClick
} from './js/HUD.js';

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

//Creates the camera and adds OrbitControl
var camera = createCamera(width, height, renderer, scene);
scene.add(camera);
var controls = addCameraControls(camera, renderer);

// Creates the playing area (i.e. highlights, skybox, and most geometry)
worldCreation(scene);
generateSkybox(scene);
fillBoard(scene);

// Loads cat easter egg and end turn button
loadCat();
addButton();

// Sets the character movement constraints for the map
const mapTopZ = 7.5;
const mapRightX = -7.5;
const mapBottomZ = -7.5;
const mapLeftX = 7.5;

// Animation loop
function animate() { //returns void
    requestAnimationFrame(animate);
    // Rerenders the scene
    renderer.render(scene, camera);
    //console.log(camera.position);
}

// Manager for the playable characters
var manager = new THREE.LoadingManager();
var charactersArray = [];
var characterCount = 0;

// Manager for the enemies
var managerEnemies = new THREE.LoadingManager();
var enemiesArray = [];
var enemyCount = 0;

// Loads all the models
//let linked = new LinkedList();
//createModels(linked, manager);
createModels(charactersArray, enemiesArray, manager, managerEnemies);

// Does a console log once all enemies have been loaded in
managerEnemies.onLoad = function () {
    console.log("enemies loaded");
}

// Adds character movement 
//add end turn button
manager.onLoad = function () {

    characterRadius(scene, character.position.x, character.position.z, character.turns);

    // Handles which method to call depending on which key is pressed
    //Reference: https://stackoverflow.com/questions/8941183/pass-multiple-arguments-along-with-an-event-object-to-an-event-handler
    //var handler = function (character, linked) {
    var handler = function (charactersArray) {
        return function (event) {
            if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'c')
                movePlayer(event.key, charactersArray);
            else if (event.key === 'r')
                changeCharacter();
        };
    };

    // Adds event listeners for when keys are pressed
    window.addEventListener('keydown', handler(charactersArray), false);
    window.addEventListener('keyup', keyLifted, false);

    // Calls the animate function
    animate();
}

export {
    scene,
    charactersArray,
    enemiesArray,
    mapTopZ,
    mapRightX,
    mapBottomZ,
    mapLeftX,
    controls
};