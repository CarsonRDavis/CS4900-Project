var width = window.innerWidth;
var height = window.innerHeight;

var keyboard = {};

// Creates the renderer with Three.js
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Creates Scene Object
var scene = new THREE.Scene;

// Creates Camera Object
var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);

// Creates temporary cube object, used for testing
var cubeGeometry = new THREE.CubeGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Sets positions for testing
cube.position.set(0, 1, 0);
camera.position.set(0, 1.8, 5);

// Creates Floor
var floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0x0000ff
    })
);

// Rotates floor to face the right direction
floorMesh.rotation.x -= Math.PI / 2;

// Adds objects to the scene
scene.add(camera);
scene.add(floorMesh);
scene.add(cube);

// Performs basic animations
function animate() {
    requestAnimationFrame(animate);

    var x = camera.position.x;
    var y = camera.position.y;
    var z = camera.position.z;

    // Rotates camera left around an object
    if (keyboard[69]) {
        camera.position.x = x * Math.cos(0.02) + z * Math.sin(0.02);
        camera.position.z = z * Math.cos(0.02) - x * Math.sin(0.02);
    }

    // Rotates camera right around an object
    if (keyboard[81]) {
        camera.position.x = x * Math.cos(0.02) - z * Math.sin(0.02);
        camera.position.z = z * Math.cos(0.02) + x * Math.sin(0.02);
    }

    camera.lookAt(cube.position);

    renderer.render(scene, camera);
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
window.addEventListener('keyup', keyUp)

// Triggers animation function
animate();

// Renders scene
renderer.render(scene, camera);