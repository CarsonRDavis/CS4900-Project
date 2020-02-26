import {
    worldCreation,
    generateSkybox,
    fillBoard
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
    initializeFirstCharacter
} from './js/objectGeneration.js';
import {
    Node,
    LinkedList
} from './js/LinkedList.js';

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
var controls = addCameraControls(camera, renderer);

worldCreation(scene);
generateSkybox(scene);
fillBoard(scene);

createModels();
loadCat();

const mapTopZ = 7.5;
const mapRightX = -7.5;
const mapBottomZ = -7.5;
const mapLeftX = 7.5;

function animate() { //returns void
    requestAnimationFrame(animate);
    // Rerenders the scene
    renderer.render(scene, camera);
    //console.log(camera.position);
}

var manager = new THREE.LoadingManager();
let linked = new LinkedList();
createModels(linked, manager);

manager.onLoad = function () {
    //var character = linked.head.element;
    //Reference: https://stackoverflow.com/questions/8941183/pass-multiple-arguments-along-with-an-event-object-to-an-event-handler
    var handler = function (character, linked) {
        return function (event) {
            if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'c')
                movePlayer(character, event.key, linked);
            else if (event.key === 'q')
                changeCharacter();
        };
    };

    window.addEventListener('keydown', handler(character, linked), false);
    window.addEventListener('keyup', keyLifted, false);

    animate();
}

export {
    scene, //charactersArray,
    mapTopZ,
    mapRightX,
    mapBottomZ,
    mapLeftX,
    controls
};