
function createModels(manager, scene, arr){
    // Creates and loads banana object with texture
    var redMat = new THREE.MeshLambertMaterial({color:0xF7573E});
    var blueMat = new THREE.MeshLambertMaterial({color:0x2194ce});
    var greenMat = new THREE.MeshLambertMaterial({color:0x11E020});
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
        

        mixer = new THREE.AnimationMixer(root);
        root.mixer = mixer;
        let animations = gltf.animations;
        //var clip = THREE.AnimationClip.findByName( root.animations, 'Idle' );
        var action = mixer.clipAction( animations[0] );
        action.play();


        root.position.set(model.pos, 1.5, -3.75);             
        root.rotation.y += Math.PI;
        root.scale.set(.34,.34,.34)
        //root.visible = false;
        scene.add(root);
        
      });
    }
  }

  export {createModels};