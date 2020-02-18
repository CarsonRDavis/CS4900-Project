function worldCreation (scene) {    //returns void
    //add lighting
    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(1, 5, -1);
    //add map texture
    var loader = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial();
    material.map = loader.load("./textures/grass.jpg");
    //add floor
    var floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), material);
    floorMesh.rotation.x -= Math.PI / 2;
    //add grid
    var gridHelper = new THREE.GridHelper(10, 10, 0x111111, 0x111111);
    gridHelper.position.set(0, 0.25, 0);

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

function highlightGeneration (scene){     //returns void
    var highLightMesh1 = createHighlight();
    highLightMesh1.name = "highlight1";
    var highLightMesh2 = createHighlight();
    highLightMesh2.name = "highlight2";
    var highLightMesh3 = createHighlight();
    highLightMesh3.name = "highlight3";
    var highLightMesh4 = createHighlight();
    highLightMesh4.name = "highlight4";
    
    //raise the highlight block and set transparent value
    highLightMesh1.position.set(0.5, 0.25, -1.5);
    highLightMesh2.position.set(-0.5, 0.25, -2.5);
    highLightMesh3.position.set(0.5, 0.25, -3.5);
    highLightMesh4.position.set(1.5, 0.25, -2.5);
    //create highlight array for easy storage
    var highlights = [];
    //push highlights to array
    highlights.push(highLightMesh1);
    highlights.push(highLightMesh2);
    highlights.push(highLightMesh3);
    highlights.push(highLightMesh4);
    
    scene.add(highLightMesh1);
    scene.add(highLightMesh2);
    scene.add(highLightMesh3);
    scene.add(highLightMesh4);

    return highlights;
}

export { worldCreation, highlightGeneration };