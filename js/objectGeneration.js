import { scene, //charactersArray, 
    mapTopZ, mapRightX, mapBottomZ, mapLeftX, highlights } from '/main.js';
    //player 
import { createHighlight } from './worldGeneration.js';
import { Node, LinkedList } from './LinkedList.js';

var down = false;
var characterCount = 1;
var manager = new THREE.LoadingManager();
const gltfLoader = new THREE.GLTFLoader(manager);

//var isDefault = true;
// function setPositions(charactersArray){
                    

//         charactersArray[0].scene.position.set(0.5, 0.25, -3.5);
//         charactersArray[1].position.set(0.5, 0.25, -4.5);
//         charactersArray[2].position.set(0.5, 0.25, -5.5);
    
//     //scene.add(gltf.scene);
//     //scene.add(currentCharacter);
// }

////////////////// These will be replaced with Mat's model code. They are just for testing ///////////////////////////
// function createModel1(){
    
//     var objLoader = new THREE.OBJLoader();
//     var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
//     var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});

//     var obj = objLoader.load('./models/BananaLow_OBJ.obj', function(object){
//         object.traverse(function(node){
//             if(node.isMesh){
//                 node.material = bananaMaterial;
//                 node.scale.set(0.25, 0.25, 0.25);
//             }
//         });
//             charactersArray.push(object);
//             object.name = "banana1";
//             object.turns = 5;
//             scene.add(object);
//             console.log(charactersArray);   
//             object.position.set(1.5, 0.25, -3.5);
//             //created = true;  
//             return object;
//     });        
//     return obj;
// }

// function createModel2(charactersArray, scene){
//     var objLoader = new THREE.OBJLoader();
//     var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
//     var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});

//     var obj = objLoader.load('./models/BananaLow_OBJ.obj', function(object){
//         object.traverse(function(node){
//             if(node.isMesh){
//                 node.material = bananaMaterial;
//                 node.scale.set(0.25, 0.25, 0.25);
//             }
//         });
    
//             charactersArray.push(object);
//             object.name = "banana2";
//             object.turns = 5;
//             scene.add(object);
//             console.log(charactersArray);   
//             object.position.set(0.5, 0.25, -2.5);
//             //created = true;
//             return object;
//     });        
//     return obj;    
// }

// function createModel3(charactersArray, scene){
//     var objLoader = new THREE.OBJLoader();
//     var bananaTexture = new THREE.TextureLoader().load('./textures/Banana_D01.png');
//     var bananaMaterial = new THREE.MeshLambertMaterial({map: bananaTexture});

//     var obj = objLoader.load('./models/BananaLow_OBJ.obj', function(object){
//         object.traverse(function(node){
//             if(node.isMesh){
//                 node.material = bananaMaterial;
//                 node.scale.set(0.25, 0.25, 0.25);
//             }
//         });    
//             charactersArray.push(object);
//             object.name = "banana3";
//             object.turns = 5;
//             scene.add(object);
//             console.log(charactersArray);   
//             object.position.set(-0.5, 0.25, -3.5);
//             //created = true;
//             return object;
//     });            
//     return obj;
// }

//implementing Mat's function that loads the models
function createModels(){
    var redMat = new THREE.MeshLambertMaterial({color:0xF7573E});
    var blueMat = new THREE.MeshLambertMaterial({color:0x2194ce});
    var greenMat = new THREE.MeshLambertMaterial({color:0x11E020});

    const models = {
        melee:    { url: './models/Pirate_Male.glb', name: 'melee', pos: 0.5 },
        ranged:   { url: './models/Ninja_Male.glb', name: 'ranged', pos: 1.5 },
        defender: { url: './models/BlueSoldier_Female.glb', name: 'defender', pos: -0.5 },
    };

    for (const model of Object.values(models)){
      gltfLoader.load(model.url, (gltf) => {
        const root = gltf.scene;
        root.name = model.name;
        root.turns = 5; //determines the number of moves; will need to relocate
        root.position.set(model.pos, 0.01, -3.5);
        //root.rotation.y += Math.PI;
        root.scale.set(.34,.34,.34)
        //root.visible = false;
        scene.add(root);
        
      });
    }
}

function loadCat(){
      gltfLoader.load('./models/Felixx.glb', function(gltf) {
        const root = gltf.scene;
        root.name = "cat";
        root.visible = false;
        //root.turns = 5; //determines the number of moves; will need to relocate
        root.position.set(-0.25, 0.01, 2);
        root.rotation.y += Math.PI;
        root.scale.set(10, 10, 10)
        scene.add(root);
        
      });
}

//create event handler to move the banana along with a highlight square
function movePlayer(event){
    var player;
    if(characterCount == 1){
        player = scene.getObjectByName("melee");
    }else if(characterCount == 2){
        player = scene.getObjectByName("ranged");
    }else if(characterCount == 3){
        player = scene.getObjectByName("defender");
        console.log(player.turns);
        if(player.turns == 0){
            player = null;
            characterCount = 1;
            player = scene.getObjectByName("melee");
        }
    }
    console.log(player);
    console.log(player.turns);
    //console.log(player);
    
    var cat = scene.getObjectByName("cat");
    
    //used to reference the created object
    // var character = window[selectedObj.name]; //needs to be changed to current obj
   
    //create vector to hold object's location
    var positionVector = new THREE.Vector3();
    //console.log(player.turns);

    // if(player.turns === 0){
    //     player.turns = 5;
    // }
    //console.log(isDefault);

    while(player.turns > 0){
        if(down)    //prevents obj from moving multiple spaces when key is held down
            return;
        down = true;
        console.log(player.name);
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
                    //The following can be used to manually swap characters, skipping moves
        }else if (event.key == 'c'){//cat easter egg
            //loadCat();
            cat.visible = true;
        break;
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
    }//end while
    console.log(characterCount);
    //isDefault = false;
    if(characterCount <= 3){
        characterCount++;
    }else
        characterCount = 1;

    resetHighlights(player.name);
    console.log(player.turns);
    //player.turns = 5;

    //console.log(player.name);
    //var player = changeCharacter(player);
    //console.log(player.name);
    //return player;
}
//Reference: https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
//prevents obj from moving multiple spaces when key is held down
function keyLifted(){
   down = false;
   
   return down;
}

function resetHighlights(playerName){
    if(playerName === "melee"){
        for(var i = 0; i < 4; i++){
            highlights[i].visible = true;
        }
        highlights[0].position.set(1.5, 0.02, -2.5);
        highlights[1].position.set(0.5, 0.02, -3.5);
        highlights[2].position.set(1.5, 0.02, -4.5);
        highlights[3].position.set(2.5, 0.02, -3.5);
    }else if(playerName === "ranged"){
        for(var i = 0; i < 4; i++){
            highlights[i].visible = true;
        }
        highlights[0].position.set(-0.5, 0.02, -2.5);
        highlights[1].position.set(-1.5, 0.02, -3.5);
        highlights[2].position.set(-0.5, 0.02, -4.5);
        highlights[3].position.set(0.5, 0.02, -3.5);
    }else if(playerName === "defender"){
        for(var i = 0; i < 4; i++){
            highlights[i].visible = true;
        }
        highlights[0].position.set(-0.5, 0.02, -2.5);
        highlights[1].position.set(-1.5, 0.02, -3.5);
        highlights[2].position.set(-0.5, 0.02, -4.5);
        highlights[3].position.set(0.5, 0.02, -3.5);
    }
}

// function changeCharacter(player){
//     //call this if moves have run out
//     console.log("changing");
//     if(player.name === "banana1"){
//         return scene.getObjectByName("banana3");
//     }else if(player.name === "banana2"){
//         return scene.getObjectByName("banana1");
//     }
// }

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

export { //createModel1, createModel2, createModel3, 
    keyLifted, movePlayer, createModels, loadCat };