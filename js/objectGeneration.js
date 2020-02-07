//This file generates the objects and their corresponding methods

//add test cubes and set their obj names
function addCubes(){
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
    //initialize starting cube
    var selectedCube = cube;
    //set positions
    cube.position.set(0, 0.25, 0);
    cube1.position.set(5, 0.25, 5);
    cube2.position.set(5, 0.25, -5);
    cube3.position.set(-5, 0.25, 5);
    cube4.position.set(-5, 0.25, -5);
    //add cubes to scene
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
function createBanana(){
    // Creates and loads banana object with texture
    var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
    var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});
    //load the obj
    var objLoader = new THREE.OBJLoader();
    objLoader.load(
        './models/BananaLow_OBJ.obj',
        function (object) {
            object.traverse(function(node){
                if(node.isMesh){
                    node.material = bananaMaterial;
                    node.scale.set(.25, .25, .25);
                }
            });
            object.position.set(0.5, 0.25, -3.5);
            object.name = "banana";
            //add obj to scene
            scene.add(object);
        }
    );
}
//create event handler to move the banana along with a highlight square
function moveBanana(event){
    if(down)
        return;
    down = true;
    //used to reference the created object
    var banana = scene.getObjectByName("banana");
    
    //create vector to hold object's location
    var positionVector = new THREE.Vector3();
    
    if (event.key === 'w') { //w is pressed
        positionVector = banana.position;
        //limit movement if out of bounds
        console.log(positionVector);
        if(!(positionVector.z >= mapTopZ)){
            banana.position.z += 1;
            //change location of highlight squares
            highlights.forEach(function(highlight){
                highlight.position.z += 1;
            });
        }
    } else if (event.key === 'a') { //a is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if(!(positionVector.x >= mapLeftX)){
            banana.position.x += 1;
            highlights.forEach(function(highlight){
                highlight.position.x += 1;
            });
        }
    } else if (event.key === 's') { //s is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if(!(positionVector.z <= mapBottomZ)){
            banana.position.z += -1;
            highlights.forEach(function(highlight){
                highlight.position.z += -1;
            });      
        }
    } else if (event.key === 'd') { //d is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if(!(positionVector.x <= mapRightX)){
            banana.position.x += -1;
            highlights.forEach(function(highlight){
                highlight.position.x += -1;
            });        
        }
    }
    //set highlight visibility
    if(banana.position.z === (mapTopZ)){
        highlights[0].visible = false;
    }else
        highlights[0].visible = true;
    if(banana.position.x === (mapLeftX)){
        highlights[3].visible = false;
    }else
        highlights[3].visible = true;
    if(banana.position.z === (mapBottomZ)){
        highlights[2].visible = false;
    }else
        highlights[2].visible = true;    
    if(banana.position.x === (mapRightX)){
        highlights[1].visible = false;
    }else
        highlights[1].visible = true;   
}
//https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
function bananaUp(){
    down = false;
    
    return down;
}
//function that looks at and cycles through each cube with z
function cameraRotation(event) {   
    //used to reference the created cubes
    var cube = scene.getObjectByName("cube");
    var cube1 = scene.getObjectByName("cube1");
    var cube2 = scene.getObjectByName("cube2");
    var cube3 = scene.getObjectByName("cube3"); 
    var cube4 = scene.getObjectByName("cube4");   
    //if z is pressed, change selected cube
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
        //set the new camera position
        camera.position.set(selectedCube.position.x, 7, selectedCube.position.z);
        //make the camera look at the desired cube
        camera.lookAt(selectedCube.position);
    }
}