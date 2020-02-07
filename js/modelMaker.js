function createModel(type, name, scene){
    // Creates and loads banana object with texture
    var mMaterial = new THREE.MeshLambertMaterial({color:0x2194ce});
    //load the obj
    var objLoader = new THREE.OBJLoader();
    objLoader.load(
        './models/' + type + '.obj',
        function (object) {
            object.traverse(function(node){
                if(node.isMesh){
                    node.material = mMaterial;
                    if(type === 'defender'){
                        node.scale.set(.25, .25, .25);
                    }
                    else
                        node.scale.set(.25, .25, .25);
                }
            });
            object.position.set(0.5, 0.01, -3.5);
            object.rotation.x -= Math.PI / 2;
            object.name = name;
            scene.add(object);
        }
    );
        animate();
    return name;
}

//https://free3d.com/3d-model/fig-winterrangerlongbow-v1--418439.html
//https://free3d.com/3d-model/viking-warriors-swordand-shield-v1--284280.html
//https://free3d.com/3d-model/amazonwarrior-spear-and-shield-v1--685137.html