//This file creates the layout of the scene
function boardGen (scene) {
    //add lighting
    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(1, 1, 1);
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
    var floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), material);
    floorMesh.rotation.x -= Math.PI / 2;
    //add grid
    var gridHelper = new THREE.GridHelper(10, 10, 0x111111, 0x111111);
    gridHelper.position.set(0, 0.01, 0);
    
  
    //add elements
    scene.add(light);
    scene.add(floorMesh);
    scene.add(gridHelper);
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