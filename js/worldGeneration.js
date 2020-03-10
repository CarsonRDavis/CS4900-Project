function worldCreation (scene) {    //returns void
        //add lighting
        var light = new THREE.AmbientLight( 0xffffff, 2 );
        light.position.set(5, 5, 5);
        //add map texture
        var loader = new THREE.TextureLoader();
        var grassTexture = loader.load( './textures/grass2.jpg', function ( grassTexture ) {
            grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
            grassTexture.offset.set( 0, 0 );
            grassTexture.repeat.set( 10, 10 );
        } );
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

function createHighlight(){    //returns highlight mesh
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
    //highLightMesh.name = "highlight";
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
    //console.log(temp);
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
            //console.log(temp.name);
            temp.visible = false;
            scene.add(temp);
        }
    }
}

// function highlightGeneration (scene){     //returns void
//     var highLightMesh1 = createHighlight();
//     highLightMesh1.name = "highlight1";
//     var highLightMesh2 = createHighlight();
//     highLightMesh2.name = "highlight2";
//     var highLightMesh3 = createHighlight();
//     highLightMesh3.name = "highlight3";
//     var highLightMesh4 = createHighlight();
//     highLightMesh4.name = "highlight4";
    
//     //raise the highlight block and set transparent value
//     highLightMesh1.position.set(0.5, 0.02, -2.5);
//     highLightMesh2.position.set(-0.5, 0.02, -3.5);
//     highLightMesh3.position.set(0.5, 0.02, -4.5);
//     highLightMesh4.position.set(1.5, 0.02, -3.5);
//     //create highlight array for easy storage
//     var highlights = [];
//     //push highlights to array
//     highlights.push(highLightMesh1);
//     highlights.push(highLightMesh2);
//     highlights.push(highLightMesh3);
//     highlights.push(highLightMesh4);
    
//     scene.add(highLightMesh1);
//     scene.add(highLightMesh2);
//     scene.add(highLightMesh3);
//     scene.add(highLightMesh4);

//     return highlights;
// }

//attempting to create the title screen
// function makeTitle(){
//     var loader = new THREE.FontLoader();

//     loader.load("./Recreativos_Regular.json", function ( font ) {
    
//         var geometry = new THREE.TextGeometry( 'Hello three.js!', {
//             font: font,
//             size: 80,
//             height: 5,
//         } );
//         let titleMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff });
//         var titleMesh = new THREE.Mesh(geometry, titleMaterial);
//         scene.add(titleMesh);
//     } );
// }

export { worldCreation, //highlightGeneration, 
        createHighlight, 
        characterRadius, fillBoard, clearRadius, 
        //makeTitle 
    };