//This file creates the camera for the scene
function createCamera(width, height) {
    //create camera
    var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);
    //set position

    return camera;
}

function createCameraControls() {
    var banana = scene.getObjectByName("banana");
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.keys = {
        LEFT: 81,
        RIGHT: 69
    }

    controls.maxPolarAngle = Math.PI / 2;

    return controls;
}

function onModelLoad() {
    var banana = scene.getObjectByName("banana");
    camera.position.set(banana.position.x, 7, banana.position.z - 5);
    camera.lookAt(banana.position);
}