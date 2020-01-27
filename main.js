// Sets the size of the window being used
var width = window.innerWidth;
var height = window.innerHeight;

// Creates keyboard object to use the keyboard for commands
var keyboard = {};

// Creates the renderer with Three.js
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Creates Scene Object
var scene = new THREE.Scene;

// Creates Camera Object
var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);

// Creates an OrbitControls object to be able to rotate the camera around an object
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Updates which keys are used to rotate the camera
controls.keys = {
    LEFT: 81,
    RIGHT: 69
};

controls.update();

// Creates temporary cube object, used for testing
var cubeGeometry = new THREE.CubeGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Sets positions for testing
cube.position.set(0, 0.75, 0);
camera.position.set(0, 7, 5);
controls.update();

// Creates 4 cubes for each corner of the floor to test swapping the camera focus
var cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
var cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
var cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
var cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Sets the cubes in the proper positions
cube1.position.set(5, 0.75, 5);
cube2.position.set(-5, 0.75, 5);
cube3.position.set(5, 0.75, -5);
cube4.position.set(-5, 0.75, -5);

// Loads texture onto the plane geometry/floor
var loader = new THREE.TextureLoader();
var material = new THREE.MeshBasicMaterial();
material.map = loader.load('./textures/grass.jpg');

// Creates Floor
var floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    material
);

// Rotates floor to face the right direction
floorMesh.rotation.x -= Math.PI / 2;

// Adds objects to the scene
scene.add(camera);
scene.add(floorMesh);
scene.add(cube);
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);

// Keeps count of which cube the camera is focused on
var selectedCube = cube;

// Performs basic animations
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    // Reorients camera to look at proper cube
    camera.lookAt(selectedCube.position);

    // Rerenders the scene
    renderer.render(scene, camera);
}

// Changes which cube the camera is currently looking at
function changeSelectedCube(event) {
    if (event.key === 'z') {
        if (selectedCube == cube) {
            selectedCube = cube1;
        } else if (selectedCube == cube1) {
            selectedCube = cube2;
        } else if (selectedCube == cube2) {
            selectedCube = cube3;
        } else if (selectedCube == cube3) {
            selectedCube = cube4;
        } else {
            selectedCube = cube;
        }

        camera.position.set(selectedCube.position.x, 7, selectedCube.position.z + 5);
    }
}

// Event for when a key is pushed down
function keyDown(event) {
    keyboard[event.keyCode] = true;
}

// Event for when a key is released
function keyUp(event) {
    keyboard[event.keyCode] = false;
}

// Creates event listeners
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('keypress', changeSelectedCube);

// Triggers animation function
animate();

// Renders scene
renderer.render(scene, camera);