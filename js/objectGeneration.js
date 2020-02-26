import {
    scene, //charactersArray, 
    mapTopZ,
    mapRightX,
    mapBottomZ,
    mapLeftX,
} from '/main.js';
import {
    characterRadius,
    clearRadius
} from './worldGeneration.js';
import {
    LinkedList
} from './LinkedList.js';

var down = false;
var characterCount = 1;

//implementing Mat's function that loads the models
function createModels(linkedList, manager) {
    const gltfLoader = new THREE.GLTFLoader(manager);

    const models = {
        melee: {
            url: './models/Pirate_Male.glb',
            name: 'melee',
            pos: 0.5
        },
        ranged: {
            url: './models/Ninja_Male.glb',
            name: 'ranged',
            pos: 1.5
        },
        defender: {
            url: './models/BlueSoldier_Female.glb',
            name: 'defender',
            pos: -0.5
        },
    };

    for (const model of Object.values(models)) {
        gltfLoader.load(model.url, (gltf) => {
            const root = gltf.scene;
            root.name = model.name;
            root.turns = 5; //determines the number of moves; will need to relocate
            root.position.set(model.pos, 0.01, -3.5);
            root.scale.set(.34, .34, .34);
            //root.visible = false;
            linkedList.add(root); //add the models to the LinkedList
            scene.add(root);
        });
    }
}

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

function initializeFirstCharacter(list) {
    var character = list.head.element.name;

    return character;
}

//create event handler to move the banana along with a highlight square
function movePlayer(currentCharacter, key, linked) {

    var cat = scene.getObjectByName("cat");

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
                currentCharacterObj.position.z += 1;
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

    } //end while(player turns > 0)
    if (down)
        return;

    if (linked.next === null) //continue after exhausting the list; need to check if all members or all enemies are defeated
        return;
    else
        currentCharacter = linked.next; //currentCharacter is referring to the name
}

//Reference: https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
//prevents obj from moving multiple spaces when key is held down
function keyLifted() {
    down = false;

    return down;
}

export { //createModel1, createModel2, createModel3, 
    keyLifted,
    movePlayer,
    createModels,
    loadCat,
    //checkKey, 
    initializeFirstCharacter
};