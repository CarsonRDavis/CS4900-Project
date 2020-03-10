function onLoad() {

    var currentScene = 1;
    var scene;

    var height = window.innerHeight;
    var width = window.innerWidth;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.append(renderer.domElement);

    switch (currentScene) {
        case 1:
            scene = loadScene1();
            break;
        case 2:
            scene = loadScene2();
            break;
    }

    var direction = new THREE.Vector3();

    var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);
    scene.add(camera);
    camera.position.set(-43, 0, -5);
    camera.lookAt(-43, 0, 0);

    renderer.render(scene, camera);
}

onLoad();