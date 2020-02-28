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



// console.log(linkedlist.isEmpty());
// console.log(linkedlist.printList());
// console.log(linkedlist.head.next);
// console.log(linkedlist.indexOf(1));
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
var enemiesArray = [];
//let linked = new LinkedList();
//createModels(linked, manager);
createModels(charactersArray, enemiesArray, manager);

manager.onLoad = function(){
    //var character = linked.head.element;
    var character = charactersArray[characterCount];

    if (charactersArray.indexOf(character) === (charactersArray.length - 1)){
        characterCount = 0;
        character = charactersArray[characterCount];
    }
    else{
        characterCount++;
        character = charactersArray[characterCount];
    }

    //Reference: https://stackoverflow.com/questions/8941183/pass-multiple-arguments-along-with-an-event-object-to-an-event-handler
    //var handler = function (character, linked) {
    var handler = function (charactersArray, characterCount) {
        return function (event) {
            if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === 'c')
                movePlayer(event.key, charactersArray, characterCount);
            else if (event.key === 'q')
                changeCharacter();
        };
    };

    window.addEventListener('keydown', handler(charactersArray, characterCount), false);
    window.addEventListener('keyup', keyLifted, false);

    animate();
}

export {
    scene, //charactersArray,
    mapTopZ, mapRightX, mapBottomZ, mapLeftX,
    highlights
};
	//player };