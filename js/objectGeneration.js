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

var down = false;
var characterCount = 1;

//implementing Mat's function that loads the models
function createModels() {
    var manager = new THREE.LoadingManager();
    var redMat = new THREE.MeshLambertMaterial({
        color: 0xF7573E
    });
    var blueMat = new THREE.MeshLambertMaterial({
        color: 0x2194ce
    });
    var greenMat = new THREE.MeshLambertMaterial({
        color: 0x11E020
    });

    const models = {
        melee: {
            url: './models/Pirate_Male.glb',
            name: 'melee',
            pos: -1
        },
        ranged: {
            url: './models/Ninja_Male.glb',
            name: 'ranged',
            pos: 0
        },
        defender: {
            url: './models/BlueSoldier_Female.glb',
            name: 'defender',
            pos: 1
        },
    };

    const gltfLoader = new THREE.GLTFLoader(manager);
    for (const model of Object.values(models)) {
        gltfLoader.load(model.url, (gltf) => {
            const root = gltf.scene;
            root.name = model.name;
            root.turns = 5; //determines the number of moves; will need to relocate
            root.position.set(model.pos, 0.01, -3);
            //root.rotation.y += Math.PI;
            root.scale.set(.34, .34, .34)
            //root.visible = false;
            scene.add(root);

        });
    }
}

function loadCat() {
    var objLoader = new THREE.OBJLoader();
    var catTexture = new THREE.TextureLoader().load('./textures/CatMac_C.png');
    var catMaterial = new THREE.MeshLambertMaterial({
        map: catTexture,
        transparent: true,
        opacity: 1
        //visible: false
    });

    objLoader.load('./models/CatMac.obj', function (object) {
        object.traverse(function (node) {
            if (node.isMesh) {
                node.material = catMaterial;
                node.scale.set(1, 1, 1);
            }
        });
        //charactersArray.push(object);
        object.name = "cat";
        //object.turns = 5;
        scene.add(object);
        //console.log(charactersArray);   
        object.position.set(0.5, 0.02, -2.5);
        //created = true;
        return object;
    });
    //return obj;    
}

//create event handler to move the banana along with a highlight square
function movePlayer(event) {
    if (characterCount == 1) {
        var player = scene.getObjectByName("melee");
    } else if (characterCount == 2) {
        var player = scene.getObjectByName("ranged");
    } else
        var player = scene.getObjectByName("defender");

    var cat = scene.getObjectByName("cat");

    var camera = scene.getObjectByName("camera");

    //used to reference the created object
    // var character = window[selectedObj.name]; //needs to be changed to current obj

    //create vector to hold object's location
    var positionVector = new THREE.Vector3();
    console.log(player.turns);
    //console.log(isDefault);

    var radius = 5;

    while (player.turns > 0) {

        if (down) //prevents obj from moving multiple spaces when key is held down
            return;
        down = true;
        console.log(player.name);
        if (event.key === 'w') { //w is pressed
            positionVector = player.position;
            //limit movement if out of bounds
            if (!(positionVector.z >= mapTopZ)) {
                player.position.z += 1;
            }
        } else if (event.key === 'a') { //a is pressed
            positionVector = player.position;
            if (!(positionVector.x >= mapLeftX)) {
                player.position.x += 1;
            }
        } else if (event.key === 's') { //s is pressed
            positionVector = player.position;
            if (!(positionVector.z <= mapBottomZ)) {
                player.position.z += -1;
            }
        } else if (event.key === 'd') { //d is pressed
            positionVector = player.position;
            if (!(positionVector.x <= mapRightX)) {
                player.position.x += -1;
            }
            //The following can be used to manually swap characters, skipping moves
        }
        --player.turns;
    }
    characterCount++;

    //console.log(player.name);
    //var player = changeCharacter(player);
    //console.log(player.name);
    //return player;
}

//Reference: https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
//prevents obj from moving multiple spaces when key is held down
function keyLifted() {
    down = false;

    return down;
}

function resetHighlights() {

}

export { //createModel1, createModel2, createModel3, 
    keyLifted,
    movePlayer,
    createModels,
    loadCat,
};