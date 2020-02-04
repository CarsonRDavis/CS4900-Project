//This file creates the camera for the scene
function createCamera(width, height) {
    //create camera
    var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);
    //set position
    camera.position.set(0, 7, -5);

    return camera;
}

// Set camera's position on the object
function setCameraPosition() {
    var banana = scene.getObjectByName("banana");
    camera.position.set(banana.position.x, 7, banana.position.z - 5);
    camera.lookAt(banana.position);
}