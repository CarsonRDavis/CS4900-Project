//This file creates the layout of the scene
function boardGen(scene, heightMap) {
    //add lighting
    var light = new THREE.AmbientLight( 0x404040, 15.0 );
    light.position.set(1, 1, 1);
   
    //add map texture
    var loader = new THREE.TextureLoader();
    var grassTexture = loader.load( './textures/grass2.jpg', function ( grassTexture ) {
        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.offset.set( 0, 0 );
        grassTexture.repeat.set( mapVerts, mapVerts );
    } );
    var material = new THREE.MeshBasicMaterial();
    material.map = grassTexture;

    //setup the geometry for the map
    var mapVerts = heightMap.length;
    var floorGeom = new THREE.PlaneBufferGeometry(mapVerts, mapVerts, mapVerts-1, mapVerts-1);
    var floorMesh = new THREE.Mesh(floorGeom,material);
    floorMesh.rotation.x -= Math.PI / 2;

    //Extraact the position array from the PlaneBufferGeometry
    var positions = floorGeom.getAttribute('position').array;

    //Convert the heightMap to a 1d array
    var hM = [];
    for(var i = 0; i < heightMap.length; i++){
    hM = hM.concat(heightMap[i]);}

    //Apply the heightMap to every third position in the position array (the 'z' positions)   
    for(let i = 0; i<(mapVerts*mapVerts); i++){
        positions[(i*3)+2] = parseFloat(hM[i]);
        //console.log(i, hM[i])
    }
    
    //Add wireframe for visibility
    var wireframe = new THREE.WireframeGeometry( floorGeom );
    var line = new THREE.LineSegments( wireframe );
    line.material.depthTest = true;
    line.material.opacity = 0.5;
    line.material.transparent = false;
    line.rotation.x -= Math.PI / 2;
    
    floorMesh.name = floorMesh;
  
    //add elements
    scene.add(light, floorMesh, line);
} 

export{boardGen};
