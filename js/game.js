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
//create camera and camera controls
var camera = createCamera(width, height, renderer, scene);
var controls = addCameraControls();

//add objects and set selectedCube
//var selectedCube = addCubes();
//createBanana();
var def = new Defender('Dan');
var mel = new Melee('Mike');

def.model = createModel('defender', 'Dan', scene);
mel.model = createModel('melee', 'Mike', scene);
while(scene.getObjectByName(mel.model).position = undefined){
    setTimeout(animate(), 50);
    console.log("Timer");
}
scene.getObjectByName(mel.model).position.set(3.5, 0.01, -3.5);

//add event listeners
window.addEventListener('keypress', cameraRotation, false);
window.addEventListener('keypress', moveBanana, false);
//call animate function
animate();