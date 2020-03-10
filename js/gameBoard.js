//This file creates the layout of the scene
function boardGen(scene, heightMap) {
    let mapVerts = heightMap.length;
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
    
    //add natural terrain objects to the map
    layer1();
    //add elements
    scene.add(light, floorMesh, line);

    //add natural terrain objects to the map
    function layer1(){
        //var obstacles = [...Array(mapVerts-1)].map((_, i) => [...Array(mapVerts-1)].map((_, i) => 0));
        var terObjs = [];
        
        let numObjs = Math.floor(((mapVerts-1)*(mapVerts-1))*.2);
        let manager = new THREE.LoadingManager();
        let down = new THREE.Vector3(0,-1,0);
        let caster = new THREE.Raycaster(new THREE.Vector3(0,0,0), down);
        caster.far = 0.05;
        let unit = mapVerts/(mapVerts - 1);
        let x = unit/2;
        console.log(numObjs);

        const models = {
            bush:    { url: './models/Bush_2/Bush_2.gltf'},
            berryBush:   { url: './models/BushBerries_1/BushBerries_1.gltf'},
            commonTree: { url: './models/CommonTree_2/CommonTree_2.gltf'},
            commonTree2: { url: './models/CommonTree_3/CommonTree_3.gltf'},
            pineTree: { url: './models/PineTree_5/PineTree_5.gltf'},
            rock:    { url: './models/Rock_1/Rock_1.gltf'},
            rock2:    { url: './models/Rock_2/Rock_2.gltf'},
          };
          const gltfLoader = new THREE.GLTFLoader(manager);
          for (const model of Object.values(models)){
            gltfLoader.load(model.url, (gltf) => {
              const root = gltf.scene;
              
              root.position.set(-5*unit + x, 0.01, unit/2);     
              x += 2*unit;        
              root.rotation.y += Math.PI;
              root.scale.set(.75,.75,.75)
      
              caster.set(root.position, down);
              let intersects = caster.intersectObjects(scene.children);
              
              while(intersects.length < 1){
                caster.set(root.position, down);
                root.position.y += .05;
                intersects = caster.intersectObjects(scene.children);
              }
              root.position.y += .95;
              scene.add(root);              
            });
        }    
    }    
}

export{boardGen};

