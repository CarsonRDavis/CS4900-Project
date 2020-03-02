import { HeightMap } from "./heightMap.js";

//This file creates the layout of the scene
function boardGen(scene, heightMap) {
    //add lighting
    var light = new THREE.AmbientLight( 0x404040, 15.0 );
    light.position.set(1, 1, 1);

    
    //console.log(heightMap.toString())
    
    //add map texture
    var loader = new THREE.TextureLoader();
    var grassTexture = loader.load( './textures/grass2.jpg', function ( grassTexture ) {
        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.offset.set( 0, 0 );
        grassTexture.repeat.set( mapVerts, mapVerts );
    } );
    var material = new THREE.MeshBasicMaterial();
    material.map = grassTexture;
    //add floor
    var mapVerts = heightMap.length;
    var floorGeom = new THREE.PlaneBufferGeometry(mapVerts, mapVerts, mapVerts-1, mapVerts-1);

    

    var floorMesh = new THREE.Mesh(floorGeom,material);
    floorMesh.rotation.x -= Math.PI / 2;
    var positions = floorGeom.getAttribute('position').array;

    var hM = [];
    for(var i = 0; i < heightMap.length; i++){
    hM = hM.concat(heightMap[i]);
}

    for(let i = 0; i<(mapVerts*mapVerts); i++){
        positions[(i*3)+2] = parseFloat(hM[i]);
        console.log(i, hM[i])
    }
    console.log(positions.toString())
    var wireframe = new THREE.WireframeGeometry( floorGeom );

    var line = new THREE.LineSegments( wireframe );
    line.material.depthTest = true;
    line.material.opacity = 0.5;
    line.material.transparent = false;
    line.rotation.x -= Math.PI / 2;
    scene.add( line );
    
    //add grid
    var gridHelper = new THREE.GridHelper(mapVerts, mapVerts, 0x111111, 0x111111);
    gridHelper.position.set(0, 0.01, 0);
    
  
    //add elements
    scene.add(light);
    scene.add(floorMesh);
    scene.add(gridHelper);
} 

export{boardGen};
