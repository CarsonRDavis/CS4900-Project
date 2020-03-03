import { scene, mapTopZ, mapRightX, mapBottomZ, mapLeftX, highlights } from '/main.js';
import { createHighlight } from './worldGeneration.js';
import { LinkedList } from './LinkedList.js';
//import { Node, LinkedList } from './LinkedList.js';
import { Actor, Defender, Melee, Ranged } from './actors.js';

var down = false;
var characterCount = 1;
var enemyCount = 0;

var positionVector = new THREE.Vector3();

//var current = list.head;
//implementing Mat's function that loads the models

//function createModels(linkedList, manager) {
function createModels(charactersArray, enemiesArray, manager, managerEnemies) {

    const gltfLoader = new THREE.GLTFLoader(manager);
    const gltfLoaderEnemies = new THREE.GLTFLoader(managerEnemies);

    const characters = {
        melee: { url: './models/PirateTest.glb', name: 'melee', pos: 0.5 },
        ranged: { url: './models/Ninja_Male.glb', name: 'ranged', pos: 1.5 },
        defender: { url: './models/BlueSoldier_Female.glb', name: 'defender', pos: -0.5 }
    };

    const enemies = {
        meleeEnemy: { url: './models/Goblin_Male_Red.glb', name: 'meleeEnemy', pos: 0.5 },
        rangedEnemy: { url: './models/Cowgirl.glb', name: 'rangedEnemy', pos: 1.5 },
        defenderEnemy: { url: './models/Viking.glb', name: 'defenderEnemy', pos: -0.5 },
    };

    //count number of characters on the level
    // var numCharacters = 0;
    // for (const model of Object.values(characters)) {
    //     numCharacters++;
    // }


    //load characters and populate characters array
    for (const model of Object.values(characters)) {
        gltfLoader.load(model.url, (gltf) => {
            const root = gltf.scene;
            root.name = model.name;
            root.turns = 5; //determines the number of moves; will need to relocate
            root.position.set(model.pos, 0.01, -3.5);
            root.scale.set(.34, .34, .34);
            //root.visible = false;
            ///////////linkedList.add(root); //add the models to the LinkedList
            if (root.name === "melee") {
                console.log("melee");
                let mike = new Melee("Mike");///////////////////////use obj location for actor; stay away from duplicate info
                root.actor = mike;
            } else if (root.name === "ranged") {
                console.log("ranged");
                let rachel = new Ranged("Rachel");
                root.actor = rachel;
            } else if (root.name === "defender") {
                console.log("defender");
                let joe = new Defender("Joe");
                root.actor = joe;
            }
            charactersArray.push(root);
            scene.add(root);
        });
    }//end for

    //load enemies and populate enemies array
    for (const model of Object.values(enemies)) {
        gltfLoaderEnemies.load(model.url, (gltf) => {
            const root = gltf.scene;
            root.name = model.name;
            root.turns = 5; //determines the number of moves; will need to relocate
            root.position.set(model.pos, 0.01, 3.5);
            root.rotation.y += Math.PI;
            root.scale.set(.34, .34, .34);
            //root.visible = false;
            ///////////linkedList.add(root); //add the models to the LinkedList
            if (root.name === "meleeEnemy") {
                console.log("meleeEnemy");
                let makayla = new Melee("Makayla");
                root.actor = makayla;
            } else if (root.name === "rangedEnemy") {
                console.log("rangedEnemy");
                let lkay = new Ranged("LKay");
                root.actor = lkay;
            } else if (root.name === "defenderEnemy") {
                console.log("defenderEnemy");
                let denise = new Defender("Denise");
                root.actor = denise;
            }
            enemiesArray.push(root);
            scene.add(root);
        });
    }//end for
}

function loadCat() {     //cat doesn't get added to the LinkedList
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('./models/Felixx.glb', function (gltf) {
        const root = gltf.scene;
        root.name = "cat";
        root.visible = false;
        //root.turns = 5; //determines the number of moves; will need to relocate
        root.position.set(-0.25, 0.01, 2);
        root.rotation.y += Math.PI;
        root.scale.set(10, 10, 10);
        scene.add(root);
    });
}

function changeCharacter() {
    console.log(characterCount);
    if (characterCount < 2)
        characterCount++;
    else
        characterCount = 0;
    return;
}

//create event handler to move the banana along with a highlight square
function movePlayer(key, charactersArray) {

    let currentCharacter = scene.getObjectByName(charactersArray[characterCount].name);
    var cat = scene.getObjectByName("cat");

    //LinkedList Implementation
    //while (current != null) { //while the list is not null (no chars left) --- can edit this to continue
    //var currentCharacter = charactersArray[characterCount];

    //create vector to hold object's location
    //var positionVector = new THREE.Vector3();
    var currentCharacterObj = scene.getObjectByName(currentCharacter.name);

    while (currentCharacterObj.turns > 0) {
        if (down)    //prevents obj from moving multiple spaces when key is held down
            return;
        down = true;

        if (event.key === 'w') { //w is pressed
            positionVector = currentCharacterObj.position;  //////pass into actor method for movement fuck carson


            //limit movement if out of bounds
            console.log(positionVector);
            if (!(positionVector.z >= mapTopZ)) {
                currentCharacterObj.position.z += 1;
                console.log(currentCharacterObj.actor);                //change location of highlight squares
                highlights.forEach(function (highlight) {
                    highlight.position.z += 1;
                });
            }
        } else if (event.key === 'a') { //a is pressed
            positionVector = currentCharacterObj.position;
            console.log(positionVector);
            if (!(positionVector.x >= mapLeftX)) {
                currentCharacterObj.position.x += 1;
                highlights.forEach(function (highlight) {
                    highlight.position.x += 1;
                });
            }
        } else if (event.key === 's') { //s is pressed
            positionVector = currentCharacterObj.position;
            console.log(positionVector);
            if (!(positionVector.z <= mapBottomZ)) {
                currentCharacterObj.position.z += -1;
                highlights.forEach(function (highlight) {
                    highlight.position.z += -1;
                });
            }
        } else if (event.key === 'd') { //d is pressed
            positionVector = currentCharacterObj.position;
            console.log(positionVector);
            if (!(positionVector.x <= mapRightX)) {
                currentCharacterObj.position.x += -1;
                highlights.forEach(function (highlight) {
                    highlight.position.x += -1;
                });
            }
        } else if (event.key == 'c') {//cat easter egg
            //loadCat();
            cat.visible = true;
            return;
        }

        //set highlight visibility
        if (currentCharacterObj.position.z === (mapTopZ)) {
            highlights[0].visible = false;
        } else
            highlights[0].visible = true;
        if (currentCharacterObj.position.x === (mapLeftX)) {
            highlights[3].visible = false;
        } else
            highlights[3].visible = true;
        if (currentCharacterObj.position.z === (mapBottomZ)) {
            highlights[2].visible = false;
        } else
            highlights[2].visible = true;
        if (currentCharacterObj.position.x === (mapRightX)) {
            highlights[1].visible = false;
        } else
            highlights[1].visible = true;

        --currentCharacterObj.turns;

        //console.log(player);
        //console.log(player.turns);
        //console.log(player);

    }//end while(player turns > 0)

    if (characterCount < 2)
        characterCount++;
    else
        characterCount = 0;

    resetHighlights(currentCharacter.name);

    if (down)
        return;
}
//Reference: https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
//prevents obj from moving multiple spaces when key is held down
function keyLifted() {
    down = false;

    return down;
}

function resetHighlights(playerName) {
    if (playerName === "melee") {
        for (var i = 0; i < 4; i++) {
            highlights[i].visible = true;
        }
        highlights[0].position.set(1.5, 0.02, -2.5);
        highlights[1].position.set(0.5, 0.02, -3.5);
        highlights[2].position.set(1.5, 0.02, -4.5);
        highlights[3].position.set(2.5, 0.02, -3.5);
    } else if (playerName === "ranged") {
        for (var i = 0; i < 4; i++) {
            highlights[i].visible = true;
        }
        highlights[0].position.set(-0.5, 0.02, -2.5);
        highlights[1].position.set(-1.5, 0.02, -3.5);
        highlights[2].position.set(-0.5, 0.02, -4.5);
        highlights[3].position.set(0.5, 0.02, -3.5);
    } else if (playerName === "defender") {
        for (var i = 0; i < 4; i++) {
            highlights[i].visible = true;
        }
        highlights[0].position.set(-0.5, 0.02, -2.5);
        highlights[1].position.set(-1.5, 0.02, -3.5);
        highlights[2].position.set(-0.5, 0.02, -4.5);
        highlights[3].position.set(0.5, 0.02, -3.5);
    }
}

function enemiesTurn(enemiesArray, enemyCount) {
    let currentEnemy = scene.getObjectByName(enemiesArray[enemyCount].name);
    console.log(currentEnemy);

    //create vector to hold object's location
    var positionVector = new THREE.Vector3();
    var currentEnemyObj = scene.getObjectByName(currentEnemy.name);


    while (currentEnemyObj.turns > 0) {

        console.log("turn");
        positionVector = currentEnemyObj.position;
        //limit movement if out of bounds
        if (!(positionVector.z >= mapTopZ)) {
            currentEnemyObj.position.z -= 1;
            console.log(positionVector);
        }
        --currentEnemyObj.turns;
        currentEnemyObj.updateMatrix();
        sleep(2000);

    }

    // if (enemyCount < 2)
    //     enemyCount++;
    // else
    //     enemyCount = 0;

}



//Reference: https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing/16873849
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

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

export { keyLifted, movePlayer, createModels, loadCat, changeCharacter, enemiesTurn, characterCount, enemyCount };