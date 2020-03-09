import {
    scene,
    mapTopZ,
    mapRightX,
    mapBottomZ,
    mapLeftX
} from '/main.js';
import {
    characterRadius,
    clearRadius
} from './worldGeneration.js';
import {
    LinkedList
} from './LinkedList.js';
//import { Node, LinkedList } from './LinkedList.js';
import {
    Actor,
    Defender,
    Melee,
    Ranged
} from './actors.js';

// Creates variables for if a key is pressed,
// Currently selected character for both
// player and enemies
var down = false;
var characterCount = 1;
var enemyCount = 0;

//implementing Mat's function that loads the models

// GLTF Model loader for all models in our game
//function createModels(linkedList, manager) {
function createModels(charactersArray, enemiesArray, manager, managerEnemies) {

    const gltfLoader = new THREE.GLTFLoader(manager);
    const gltfLoaderEnemies = new THREE.GLTFLoader(managerEnemies);

    // Player character models
    const characters = {
        melee: {
            url: './models/PirateTest.glb',
            name: 'melee',
            pos: 0
        },
        ranged: {
            url: './models/Ninja_Male.glb',
            name: 'ranged',
            pos: 1
        },
        defender: {
            url: './models/BlueSoldier_Female.glb',
            name: 'defender',
            pos: -1
        }
    };

    // Enemy Player Models
    const enemies = {
        meleeEnemy: {
            url: './models/Goblin_Male_Red.glb',
            name: 'meleeEnemy',
            pos: 0
        },
        rangedEnemy: {
            url: './models/Cowgirl.glb',
            name: 'rangedEnemy',
            pos: 1
        },
        defenderEnemy: {
            url: './models/Viking.glb',
            name: 'defenderEnemy',
            pos: -1
        },
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
            root.position.set(model.pos, 0.01, -3);
            root.scale.set(.34, .34, .34);
            //root.visible = false;
            ///////////linkedList.add(root); //add the models to the LinkedList
            if (root.name === "melee") {
                console.log("melee");
                let mike = new Melee("Mike");
                root.actor = mike;
            } else if (root.name === "ranged") {
                console.log("ranged");
                let rachel = new Ranged("Rachel");
                root.actor = rachel;
            } else if (root.name === "defender") {
                console.log("defender");
                let donovan = new Defender("Donovan");
                root.actor = donovan;
            }
            charactersArray.push(root);
            scene.add(root);
        });
    } //end for

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
            enemiesArray.push(root);
            scene.add(root);
        });
    } //end for
}

// Loads cat for easter egg
function loadCat() { //cat doesn't get added to the LinkedList
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

// Changes the seleceted character for player
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
    var positionVector = new THREE.Vector3();
    var currentCharacterObj = scene.getObjectByName(currentCharacter.name);

    while (currentCharacterObj.turns > 0) {
        if (down) //prevents obj from moving multiple spaces when key is held down
            return;
        down = true;

        if (event.key === 'w') { //w is pressed
            positionVector = currentCharacterObj.position;
            //limit movement if out of bounds
            if (!(positionVector.z >= mapTopZ)) {
                clearRadius(scene, currentCharacterObj.position.x, currentCharacterObj.position.z, currentCharacterObj.turns);
                decrementTurns(currentCharacterObj);
                currentCharacterObj.position.z += 1;
                characterRadius(scene, currentCharacterObj.position.x, currentCharacterObj.position.z, currentCharacterObj.turns);
            }
        } else if (event.key === 'a') { //a is pressed
            positionVector = currentCharacterObj.position;
            console.log(positionVector);
            if (!(positionVector.x >= mapLeftX)) {
                currentCharacterObj.position.x += 1;
            }
        } else if (event.key === 's') { //s is pressed
            positionVector = currentCharacterObj.position;
            console.log(positionVector);
            if (!(positionVector.z <= mapBottomZ)) {
                currentCharacterObj.position.z += -1;
            }
        } else if (event.key === 'd') { //d is pressed
            positionVector = currentCharacterObj.position;
            console.log(positionVector);
            if (!(positionVector.x <= mapRightX)) {
                currentCharacterObj.position.x += -1;
            }
            //The following can be used to manually swap characters, skipping moves
        } else if (event.key == 'c') { //cat easter egg
            //loadCat();
            cat.visible = true;
            return;
        }

        --currentCharacterObj.turns;

        //console.log(player);
        //console.log(player.turns);
        //console.log(player);

    } //end while(player turns > 0)

    if (characterCount < 2)
        characterCount++;
    else
        characterCount = 0;

    if (down)
        return;
}

//Reference: https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
//prevents obj from moving multiple spaces when key is held down
function keyLifted() {
    down = false;

    return down;
}

// Temporary function for moving enemies
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
// Delays movements by a set amount of time
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

export {
    keyLifted,
    movePlayer,
    createModels,
    loadCat,
    changeCharacter,
    enemiesTurn,
    characterCount,
    enemyCount
};