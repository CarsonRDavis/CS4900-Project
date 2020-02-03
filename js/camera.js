//This file creates the camera for the scene
function createCamera (width, height, renderer, scene) {
    //create camera
    var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);
    //set position
    camera.position.set(0, 7, -5);
    
    //render
    renderer.render(scene, camera);
    
    return camera;
}

function addCameraControls(){
    // Creates an OrbitControls object to be able to rotate the camera around an object
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.name = "controls";
    //use q and e to move camera
    controls.keys = {
        LEFT: 81,
        RIGHT: 69
    };
    
    controls.update();
    
    return controls;
}
