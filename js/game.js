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
boardGen(scene);
const manager = new THREE.LoadingManager();


//create camera and camera controls
var camera = createCamera(width, height, renderer, scene);
var controls = addCameraControls();
createModels(manager);
//add objects and set selectedCube
//var selectedCube = addCubes();
//createBanana();
// var def = new Defender('Dan');
// var mel = new Melee('Mike');
// var ran = new Range('Rick');

// def.model = createModel('defender', 'Dan');
// mel.model = createModel('melee', 'Mike');
// ran.model = createModel('ranged', 'Rick');

function setPieces(){
    scene.getObjectByName('melee').position.set(3.5, 0.01, -3.5);
    scene.getObjectByName('ranged').position.set(8.5, 0.01, -3.5);
    scene.getObjectByName('defender').position.set(3.5, 0.01, -3.5);
}


//add event listeners
window.addEventListener('keypress', cameraRotation, false);
window.addEventListener('keypress', moveBanana, false);
//call animate function

animate();

