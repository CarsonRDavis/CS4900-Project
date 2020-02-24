import { worldCreation, highlightGeneration } from './js/worldGeneration.js';
import { createCamera, addCameraControls } from './js/camera.js';
import { //createModel1, createModel2, createModel3, 
    keyLifted, movePlayer, 
    createModels, 
    loadCat, 
    //checkKey, 
    initializeFirstCharacter
} from './js/objectGeneration.js';
import { Node, LinkedList } from './js/LinkedList.js';

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

var linked = new LinkedList();
linked = createModels(linked);

console.log(linked.isEmpty());
console.log(linked.printList());
console.log(linked.next);
console.log(linked.indexOf(1));
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
//Reference: https://stackoverflow.com/questions/8941183/pass-multiple-arguments-along-with-an-event-object-to-an-event-handler
var character = linked.next;
//initializeFirstCharacter(list);
console.log(character);
var handler = function (character) {
    return function (event) {
        if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd')
            movePlayer(character, event.key);
        else if (event.key === 'q')
            changeCharacter();
    };
};

window.addEventListener('keydown', handler(character), false);
window.addEventListener('keyup', keyLifted, false);

animate();

export {
    scene, //charactersArray,
    mapTopZ, mapRightX, mapBottomZ, mapLeftX,
    highlights
};
	//player };
