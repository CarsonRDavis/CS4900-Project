//This file creates the layout of the scene
function worldCreation (scene) {
    //add lighting
    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(1, 1, 1);
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
    
    var highLightMesh1 = createHighlight();
    highLightMesh1.name = "highlight1";
    var highLightMesh2 = createHighlight();
    highLightMesh2.name = "highlight2";
    var highLightMesh3 = createHighlight();
    highLightMesh3.name = "highlight3";
    var highLightMesh4 = createHighlight();
    highLightMesh4.name = "highlight4";
    
    //raise the highlight block and set transparent value
    highLightMesh1.position.set(0.5, 0.25, -2.5);
    highLightMesh2.position.set(-0.5, 0.25, -3.5);
    highLightMesh3.position.set(0.5, 0.25, -4.5);
    highLightMesh4.position.set(1.5, 0.25, -3.5);
    //highLightMesh.transparent = true;
    //change opacity
    //highLightMesh.opacity = 0;
    //add elements
    scene.add(light);
    scene.add(floorMesh);
    scene.add(gridHelper);
    scene.add(highLightMesh1);
    scene.add(highLightMesh2);
    scene.add(highLightMesh3);
    scene.add(highLightMesh4);
}

function createHighlight(){
    //adding plane geometry to act as highlighted coordinates
    var highlightPlane = new THREE.PlaneGeometry(.9, .9);
    var highlightMaterial = new THREE.MeshBasicMaterial({
        color: "#FFD700",
        transparent: true,
        opacity: 0.5
    });
    //highlightMaterial.name = "highlightMaterial";
    //highlightMaterial.opacity = 1;
    
    // Creating highlight
    var highLightMesh = new THREE.Mesh(highlightPlane,
        highlightMaterial
    );
    //highLightMesh.name = "highlight";
    highLightMesh.rotation.x -= Math.PI / 2;
    
    return highLightMesh;
}

//animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rerenders the scene
    renderer.render(scene, camera);
    //update the controls
    controls.update();
}