//This file creates the camera for the scene

// Creates the actual camera and returns it
function createCamera(width, height, renderer, scene) {
    //create camera
    var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);
    //set position
    camera.position.set(-0.0111, 5.6547, -4.9849);

    //render
    renderer.render(scene, camera);

    return camera;
}

// Creates the OrbitControls and sets the parameters for it
function addCameraControls(camera, renderer) {
    // Creates an OrbitControls object to be able to rotate the camera around an object
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.name = "controls";
    // //use q and e to move camera     //q now changes characters
    // controls.keys = {
    //     LEFT: 81,
    //     RIGHT: 69
    // };

    controls.update();

    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minPolarAngle = Math.PI / 5;

    controls.minDistance = 3;
    controls.maxDistance = 10;

    return controls
}

export {
    createCamera,
    addCameraControls
};