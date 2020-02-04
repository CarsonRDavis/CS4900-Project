//This file generates the objects and their corresponding methods

//add test cubes and set their obj names
function addCubes() {
    var cube = createCubes();
    cube.name = "cube";
    var cube1 = createCubes();
    cube1.name = "cube1";
    var cube2 = createCubes();
    cube2.name = "cube2";
    var cube3 = createCubes();
    cube3.name = "cube3";
    var cube4 = createCubes();
    cube4.name = "cube4";

    //set positions
    cube.position.set(0, 0.25, 0);
    cube1.position.set(5, 0.25, 5);
    cube2.position.set(5, 0.25, -5);
    cube3.position.set(-5, 0.25, 5);
    cube4.position.set(-5, 0.25, -5);
    //add to scene
    scene.add(cube);
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);
    //return for use in main.js
    return cube;
}
//method to create the cubes and returns to addCubes()
function createCubes() {
    var cubeGeometry = new THREE.CubeGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    var temp = new THREE.Mesh(cubeGeometry, cubeMaterial);

    return temp;
}

//Reference: https://blender.stackexchange.com/questions/64932/using-three-js-how-to-add-texture-to-obj-object
//create the banana obj and add texture
function createBanana() {
    // Creates and loads banana object with texture
    var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
    var bananaMaterial = new THREE.MeshLambertMaterial({
        map: bananaTexture
    });
    //load the obj
    var objLoader = new THREE.OBJLoader();
    objLoader.load(
        './models/BananaLow_OBJ.obj',
        function (object) {
            object.traverse(function (node) {
                if (node.isMesh) {
                    node.material = bananaMaterial;
                    node.scale.set(.25, .25, .25);
                }
            });
            object.position.set(0.5, 0.25, -3.5);
            object.name = "banana";
            //add obj to scene
            scene.add(object);
            setCameraPosition();
        }
    );
}
//create event handler to move the banana along with a highlight square
function moveBanana(event) {
    //used to reference the created objects
    var banana = scene.getObjectByName("banana");
    var highlight = scene.getObjectByName("highlight");
    //create vector to hold object's location
    var positionVector = new THREE.Vector3();

    if (event.key === 'w') { //w is pressed
        positionVector = banana.position;
        //limit movement if out of bounds
        if (!(positionVector.z > 3.5)) {
            banana.position.z += 1;
            camera.position.z += 1;
            //change location of highlight square
            if (!(positionVector.z > 3.5))
                highlight.position.z += 1;
        }
    } else if (event.key === 'a') { //a is pressed
        positionVector = banana.position;
        if (!(positionVector.x > 3.5)) {
            banana.position.x += 1;
            highlight.position.x += 1;
            camera.position.x += 1;
        }
    } else if (event.key === 's') { //s is pressed
        positionVector = banana.position;
        if (!(positionVector.z < -3.5)) {
            banana.position.z += -1;
            highlight.position.z += -1;
            camera.position.z += -1;
        }
    } else if (event.key === 'd') { //d is pressed
        positionVector = banana.position;
        if (!(positionVector.x < -3.5)) {
            banana.position.x += -1;
            highlight.position.x += -1;
            camera.position.x += -1;
        }
    }
}