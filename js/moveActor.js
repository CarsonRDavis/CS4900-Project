var down;
const mapTopZ = 4.5;
const mapRightX = -4.5;
const mapBottomZ = -4.5;
const mapLeftX = 4.5;

function moveActor(event) {
    if (down)
        return;
    // down = true;
    //used to reference the created object
    var banana = scene.getObjectByName("defender");

    //create vector to hold object's location
    var positionVector = new THREE.Vector3();

    if (event.key === 'w') { //w is pressed
        positionVector = banana.position;
        //limit movement if out of bounds
        console.log(positionVector);
        if (!(positionVector.z >= mapTopZ)) {
            banana.position.z += 1;
        }
    } else if (event.key === 'a') { //a is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if (!(positionVector.x >= mapLeftX)) {
            banana.position.x += 1;
        }
    } else if (event.key === 's') { //s is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if (!(positionVector.z <= mapBottomZ)) {
            banana.position.z += -1;
        }
    } else if (event.key === 'd') { //d is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if (!(positionVector.x <= mapRightX)) {
            banana.position.x += -1;
        }
    }
}
//https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
function bananaUp() {
    down = false;

    return down;
}