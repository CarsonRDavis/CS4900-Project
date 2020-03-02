function worldCreation(scene) { //returns void
    //add lighting
    var light = new THREE.AmbientLight(0xffffff, 2.5);
    light.position.set(0, 5, 0);
    //add map texture
    var loader = new THREE.TextureLoader();
    var grassTexture = loader.load('./textures/grass2.jpg', function (grassTexture) {
        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.offset.set(0, 0);
        grassTexture.repeat.set(10, 10);
    });
    var material = new THREE.MeshBasicMaterial();
    material.map = grassTexture;
    //add floor
    var floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(17, 17, 17, 17), material);
    floorMesh.rotation.x -= Math.PI / 2;
    //add grid
    var gridHelper = new THREE.GridHelper(17, 17, 0x111111, 0x111111);
    gridHelper.position.set(0, 0.2, 0);

    //add elements
    scene.add(light);
    scene.add(floorMesh);
    scene.add(gridHelper);
}

function createHighlight() { //returns highlight mesh
    //adding plane geometry to act as highlighted coordinates
    var highlightPlane = new THREE.PlaneGeometry(.9, .9);
    var highlightMaterial = new THREE.MeshBasicMaterial({
        color: "#FFD700",
        transparent: true,
        opacity: 0.5
    });

    // Creating highlight
    var highLightMesh = new THREE.Mesh(highlightPlane,
        highlightMaterial
    );

    highLightMesh.rotation.x -= Math.PI / 2;

    return highLightMesh;
}

// Uses the Flood Fill algorithm to make all the highlights in the range visible
function characterRadius(scene, x, y, radius) {

    // Stops the recursive statement
    if (radius == -1) {
        return;
    }

    // This is the implementation of flood fill
    characterRadius(scene, x + 1, y, radius - 1);
    characterRadius(scene, x, y + 1, radius - 1);
    characterRadius(scene, x - 1, y, radius - 1);
    characterRadius(scene, x, y - 1, radius - 1);

    // Finds the highlight in the scene if it exists and 
    // sets its visibility to true
    var temp = "highlight - " + x + " - " + y;
    var highlight = scene.getObjectByName(temp);
    if (highlight == undefined) {
        return;
    }
    highlight.visible = true;

}

// Works the same as characterRadius, but sets
// highlight visibility to false
function clearRadius(scene, x, y, radius) {

    if (radius == -1) {
        return;
    }

    clearRadius(scene, x + 1, y, radius - 1);
    clearRadius(scene, x, y + 1, radius - 1);
    clearRadius(scene, x - 1, y, radius - 1);
    clearRadius(scene, x, y - 1, radius - 1);

    var temp = "highlight - " + x + " - " + y;
    var highlight = scene.getObjectByName(temp);
    if (highlight == undefined) {
        return;
    }
    highlight.visible = false;

}

// Fills the board with multiple, invisible highlights
// Creates the name of the highlight using it's x and z position
function fillBoard(scene) {

    for (var i = 8; i > -9; i--) {
        for (var j = -8; j < 9; j++) {
            var temp = createHighlight();
            temp.position.set(i, 0.2, j);
            temp.name = "highlight - " + i + " - " + j;
            temp.visible = false;
            scene.add(temp);
        }
    }

}

function generateSkybox(scene) {
    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load('../textures/front.png');
    var texture_bk = new THREE.TextureLoader().load('../textures/back.png');
    var texture_up = new THREE.TextureLoader().load('../textures/top.png');
    var texture_dn = new THREE.TextureLoader().load('../textures/bottom.png');
    var texture_rt = new THREE.TextureLoader().load('../textures/right.png');
    var texture_lf = new THREE.TextureLoader().load('../textures/left.png');

    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_ft
    }));
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_bk
    }));
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_up
    }));
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_dn
    }));
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_rt
    }));
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_lf
    }));

    for (var i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    var skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);
}

export {
    worldCreation,
    createHighlight,
    generateSkybox,
    characterRadius,
    fillBoard,
    clearRadius
};