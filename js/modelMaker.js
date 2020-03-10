
function createModels(manager, scene){
    var down = new THREE.Vector3(0,-1,0);
    var caster = new THREE.Raycaster(new THREE.Vector3(0,0,0), down);
    caster.far = .25;
    var floorMesh = scene.getObjectByName(floorMesh);
    var mixer;
    //load the obj
    const models = {
      melee:    { url: './models/Pirate_Male.glb', name: 'melee', pos: 1.5 },
      ranged:   { url: './models/Ninja_Male.glb', name: 'ranged', pos: 2.5 },
      defender: { url: './models/BlueSoldier_Female.glb', name: 'defender', pos: 0.5 },
    };
    const gltfLoader = new THREE.GLTFLoader(manager);
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


        root.position.set(model.pos, 0.01, -3.75);             
        root.rotation.y += Math.PI;
        root.scale.set(.34,.34,.34)

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

  export {createModels};