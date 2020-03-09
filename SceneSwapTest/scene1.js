function loadScene1() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFFFF");

    var fontLoader = new THREE.FontLoader();

    fontLoader.load('./font/Insomnia_Regular.json', function (font) {
        var titleGeometry = new THREE.TextGeometry("Tacticool", {

            font: font,

            size: 50,
            height: 10,
            curveSegments: 12,
        });

        titleGeometry.computeBoundingBox();

        var textMaterial = new THREE.MeshNormalMaterial();

        var offset = -0.5 * (titleGeometry.boundingBox.max.x - titleGeometry.boundingBox.min.x);

        titleGeometry = new THREE.BufferGeometry().fromGeometry(titleGeometry);

        titleGeometry.center();

        var titleMesh = new THREE.Mesh(titleGeometry, textMaterial);

        titleMesh.position.x = offset;
        titleMesh.position.y = 0;
        titleMesh.position.z = 0;

        titleMesh.rotation.x = 0;
        titleMesh.rotation.y = Math.PI * 2;

        scene.add(titleMesh);

    });

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    var pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);

    return scene;
}