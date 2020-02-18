import { scene, selectedCharacter, charactersArray, mapTopZ, mapRightX, mapBottomZ, mapLeftX, highlights } from '/main.js';

var down = false;
// function setPositions(charactersArray){
                    

//         charactersArray[0].scene.position.set(0.5, 0.25, -3.5);
//         charactersArray[1].position.set(0.5, 0.25, -4.5);
//         charactersArray[2].position.set(0.5, 0.25, -5.5);
    
//     //scene.add(gltf.scene);
//     //scene.add(currentCharacter);
// }

////////////////// These will be replaced with Mat's model code. They are just for testing ///////////////////////////
function createModel1(){
    
    var objLoader = new THREE.OBJLoader();
    var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
    var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});

    var obj = objLoader.load('./models/BananaLow_OBJ.obj', function(object){
        object.traverse(function(node){
            if(node.isMesh){
                node.material = bananaMaterial;
                node.scale.set(0.25, 0.25, 0.25);
            }
        });
            charactersArray.push(object);
            object.name = "banana1";
            object.turns = 5;
            scene.add(object);
            console.log(charactersArray);   
            object.position.set(1.5, 0.25, -3.5);
            //created = true;  
            return object;
    });         
    return obj;
}

function createModel2(charactersArray, scene){
    var objLoader = new THREE.OBJLoader();
    var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
    var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});

    var obj = objLoader.load('./models/BananaLow_OBJ.obj', function(object){
        object.traverse(function(node){
            if(node.isMesh){
                node.material = bananaMaterial;
                node.scale.set(0.25, 0.25, 0.25);
            }
        });
    
            charactersArray.push(object);
            object.name = "banana2";
            object.turns = 5;
            scene.add(object);
            console.log(charactersArray);   
            object.position.set(0.5, 0.25, -2.5);
            //created = true;
            return object;
    });        
    return obj;    
}

function createModel3(charactersArray, scene){
    var objLoader = new THREE.OBJLoader();
    var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
    var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});

    var obj = objLoader.load('./models/BananaLow_OBJ.obj', function(object){
        object.traverse(function(node){
            if(node.isMesh){
                node.material = bananaMaterial;
                node.scale.set(0.25, 0.25, 0.25);
            }
        });
    
            charactersArray.push(object);
            object.name = "banana3";
            object.turns = 5;
            scene.add(object);
            console.log(charactersArray);   
            object.position.set(-0.5, 0.25, -3.5);
            //created = true;
            return object;
    });            
    return obj;
}

//create event handler to move the banana along with a highlight square
function movePlayer(event){   

        //used to reference the created object
        // var character = window[selectedObj.name]; //needs to be changed to current obj
   
        //create vector to hold object's location
        var positionVector = new THREE.Vector3();
        var player = scene.getObjectByName("banana2");
        console.log(player.turns);

    while(player.turns > 0){
        if(down)    //prevents obj from moving multiple spaces when key is held down
            return;
        down = true;

        if (event.key === 'w') { //w is pressed
            positionVector = player.position;
            //limit movement if out of bounds
            console.log(positionVector);
            if(!(positionVector.z >= mapTopZ)){
                player.position.z += 1;
                //change location of highlight squares
                highlights.forEach(function(highlight){
                    highlight.position.z += 1;
                });
            }
        } else if (event.key === 'a') { //a is pressed
            positionVector = player.position;
            console.log(positionVector);
            if(!(positionVector.x >= mapLeftX)){
                player.position.x += 1;
                highlights.forEach(function(highlight){
                    highlight.position.x += 1;
                });
            }
        } else if (event.key === 's') { //s is pressed
            positionVector = player.position;
            console.log(positionVector);
            if(!(positionVector.z <= mapBottomZ)){
                player.position.z += -1;
                highlights.forEach(function(highlight){
                    highlight.position.z += -1;
                });      
            }
        } else if (event.key === 'd') { //d is pressed
            positionVector = player.position;
            console.log(positionVector);
            if(!(positionVector.x <= mapRightX)){
                player.position.x += -1;
                highlights.forEach(function(highlight){
                    highlight.position.x += -1;
                });        
            }
        }
        //set highlight visibility
        if(player.position.z === (mapTopZ)){
            highlights[0].visible = false;
        }else
            highlights[0].visible = true;
        if(player.position.x === (mapLeftX)){
            highlights[3].visible = false;
        }else
            highlights[3].visible = true;
        if(player.position.z === (mapBottomZ)){
            highlights[2].visible = false;
        }else
            highlights[2].visible = true;    
        if(player.position.x === (mapRightX)){
            highlights[1].visible = false;
        }else
            highlights[1].visible = true;

        --player.turns;
    }
}
//Reference: https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
//prevents obj from moving multiple spaces when key is held down
function keyLifted(){
   down = false;
   
   return down;
}

function changeCharacter(){
    //call this if moves have run out
    //change model to obj with attributes?
}

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

export { createModel1, createModel2, createModel3, keyLifted, movePlayer };