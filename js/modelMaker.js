function createModels(manager){
    // Creates and loads banana object with texture
    var redMat = new THREE.MeshLambertMaterial({color:0xF7573E});
    var blueMat = new THREE.MeshLambertMaterial({color:0x2194ce});
    var greenMat = new THREE.MeshLambertMaterial({color:0x11E020});
    //load the obj
    
    const models = {
      melee:    { url: './models/melee.obj', name: 'melee', material: redMat, pos: 3.5 },
      ranged:   { url: './models/ranged.obj', name: 'ranged', material: blueMat, pos: 1.75 },
      defender: { url: './models/defender.obj', name: 'defender', material: greenMat, pos: 0.5 },
    };
    const objLoader = new THREE.OBJLoader(manager);

    for (const model of Object.values(models)) {
      objLoader.load(model.url, function (object) {
        object.traverse(function(node){
          if(node.isMesh){
            node.material = model.material;                        
            node.scale.set(.25, .25, .25);
          }
        });
        object.position.set(model.pos, 0.01, -3.5);
        object.rotation.x -= Math.PI / 2;
        object.name = model.name;
        scene.add(object);
        }
      );
    }
    //manager.onLoad = setPieces();
}

// const manager = new THREE.LoadingManager();
// manager.onLoad = init;
// const models = {
//   melee:    { url: './models/melee.obj', name: 'melee' },
//   ranged:   { url: './models/ranged.obj', name: 'ranged' },
//   defender: { url: './models/defender.obj', name: 'defender' },
// };
// {
//   const objLoader = new THREE.OBJLoader(manager);
//   for (const model of Object.values(models)) {
//     objLoader.load(model.url, function (object) {
//             object.traverse(function(node){
//                 if(node.isMesh){
//                     node.material = mMaterial;                        
//                     node.scale.set(.25, .25, .25);
//                 }
//             });
//             object.position.set(0.5, 0.01, -3.5);
//             object.rotation.x -= Math.PI / 2;
//             object.name = name;
//             scene.add(object);
//         }
//     );
//   }
// }
 
// function init() {
//   // TBD
// }

//Model sources
//https://free3d.com/3d-model/fig-winterrangerlongbow-v1--418439.html
//https://free3d.com/3d-model/viking-warriors-swordand-shield-v1--284280.html
//https://free3d.com/3d-model/amazonwarrior-spear-and-shield-v1--685137.html