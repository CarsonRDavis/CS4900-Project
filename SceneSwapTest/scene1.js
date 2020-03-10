var scene = new THREE.Scene();
var font;

function loadScene1() {
    scene.background = new THREE.Color("#FFFFFF");

    var fontLoader = new THREE.FontLoader();

    fontLoader.load('./font/Insomnia_Regular.json', function (response) {
        font = response;
        createText();
    });

    return scene;
}

function createText() {

    materials = [
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true
        }), // front
        new THREE.MeshPhongMaterial({
            color: 0xffffff
        }) // side
    ];

    var textGeo = new THREE.TextGeometry("Tacticool", {
        font: font,

        size: 10,
        height: 10,
    });

    textGeo.computeBoundingBox();

    var centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    textGeo = new THREE.BufferGeometry().fromGeometry(textGeo);

    textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 0;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    scene.add(textMesh1);
}