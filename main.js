//accessor to create the scene
function getScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("#C0C0C0");

    return scene;
}

//accessor to create the camera
function getCamera() {
    var aspectRatio = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 1000);

    camera.position.set(0, 1, -4);

    return camera;
}

//accessor to create the lighting        
function getLighting(scene) {
    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(1, 1, 1);
    scene.add(light);
    return light;
}

//accessor to create the renderer
function getRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    return renderer;
}

//Reference: https://bl.ocks.org/duhaime/8c2be958e71ea1814e8c11f95592a3a4
//get the controls to scroll and change camera
function getControls(camera, renderer) {
    var controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.zoomSpeed = 0.4;
    controls.panSpeed = 0.4;

    return controls;
}

//function to load the model        
function loadModel() {
    var loader = new THREE.OBJLoader();

    loader.load(
        './Models/CatMac.obj', 
        function(object){ 
            object.position.set(0.25, -1, -0.25);
            object.name = "cat";
            scene.add(object);
        }
    );
}

function createGrid() {
    //create grid           
    var size = 5;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions, 0x111111, 0x111111);
    gridHelper.position.set(0, -1, 2);
    scene.add(gridHelper);
}

//render loop
function animate() {
    requestAnimationFrame(animate);

//            var cat = scene.getObjectByName("cat");
    document.addEventListener("keydown", onDocumentKeyDown, false);
    renderer.render(scene, camera);
    controls.update();
}

//Reference: https://stackoverflow.com/questions/42958252/how-do-i-move-a-three-js-cube-with-keyboard-input/42959008
//create event function that moves object
function onDocumentKeyDown() {            
    var cat = scene.getObjectByName("cat");

    var code = event.keyCode;

    if(code == 87){ //w is pressed
        cat.position.z += 0.5;
    } else if(code == 65){ //a is pressed
        cat.position.x += 0.5;
    }else if(code == 83){ //s is pressed
        cat.position.z += -0.5;
    }else if (code == 68){ //d is pressed
        cat.position.x += -0.5;
    }

    controls.update();
}

//call accessors
var scene = getScene();
var camera = getCamera();
var light = getLighting(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);

//document.addEventListener("keyDown", onDocumentKeyDown);
//document.addEventListener('keyUp', keyUp, false);

//load the model and create grid
loadModel();
createGrid();
//call render loop
animate();