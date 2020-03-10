function createModels(manager, scene, heightMap){
  //setup units for setting positions
  let mapVerts = heightMap.length;
  let unit = mapVerts/(mapVerts - 1);
  let x = unit/2;
  //Create a global variable for the down direction, the raycaster the map
  var down = new THREE.Vector3(0,-1,0);
  var caster = new THREE.Raycaster(new THREE.Vector3(0,0,0), down);
  caster.far = .05;
  var floorMesh = scene.getObjectByName(floorMesh);
  var mixer;

  //store the models as objects in an array
  const models = {
    melee:    { url: './models/Pirate_Male.glb', name: 'melee', pos: 1 },
    ranged:   { url: './models/Ninja_Male.glb', name: 'ranged', pos: 2 },
    defender: { url: './models/BlueSoldier_Female.glb', name: 'defender', pos: 0 },
  };
  //create the gltfLoader passing it the loading manager as an argument
  const gltfLoader = new THREE.GLTFLoader(manager);

  //loop through the model array assigning parameters
  for (const model of Object.values(models)){
    gltfLoader.load(model.url, (gltf) => {
      const root = gltf.scene;
      root.name = model.name;
      

      // mixer = new THREE.AnimationMixer(root);
      // root.mixer = mixer;
      // let animations = gltf.animations;
      // //var clip = THREE.AnimationClip.findByName( root.animations, 'Idle' );
      // var action = mixer.clipAction( animations[0] );
      // action.play();

      //Place the model, "root" at the proper coordinates
      root.position.set(x, 0.01, -3*(unit/2));   
      x += unit;          
      root.rotation.y += Math.PI;
      root.scale.set(.34,.34,.34)

      //place the raycaster at the same location as the model
      caster.set(root.position, down);
      let intersects = caster.intersectObjects(scene.children);
      
      //bump the model up until the raycaster intersects the ground
      while(intersects.length < 1){
        caster.set(root.position, down);
        root.position.y += .05;
        intersects = caster.intersectObjects(scene.children);
      }

      //move the model up so that it is above the ground
      root.position.y += .95;
      scene.add(root);        
    });
  } 
}

  export {createModels};