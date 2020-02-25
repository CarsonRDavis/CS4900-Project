var down;
const mapTopZ = 4.5;
const mapRightX = -4.5;
const mapBottomZ = -4.5;
const mapLeftX = 4.5;

function moveActor(event){
    if(down)
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
        if(!(positionVector.z >= mapTopZ)){
            banana.position.z += 1;
            //change location of highlight squares
            // highlights.forEach(function(highlight){
            //     highlight.position.z += 1;
            // });
        }
    } else if (event.key === 'a') { //a is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if(!(positionVector.x >= mapLeftX)){
            banana.position.x += 1;
            // highlights.forEach(function(highlight){
            //     highlight.position.x += 1;
            // });
        }
    } else if (event.key === 's') { //s is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if(!(positionVector.z <= mapBottomZ)){
            banana.position.z += -1;
            // highlights.forEach(function(highlight){
            //     highlight.position.z += -1;
            // });      
        }
    } else if (event.key === 'd') { //d is pressed
        positionVector = banana.position;
        console.log(positionVector);
        if(!(positionVector.x <= mapRightX)){
            banana.position.x += -1;
            // highlights.forEach(function(highlight){
            //     highlight.position.x += -1;
            // });        
        }
    }
    //set highlight visibility
    // if(banana.position.z === (mapTopZ)){
    //     highlights[0].visible = false;
    // }else
    //     highlights[0].visible = true;
    // if(banana.position.x === (mapLeftX)){
    //     highlights[3].visible = false;
    // }else
    //     highlights[3].visible = true;
    // if(banana.position.z === (mapBottomZ)){
    //     highlights[2].visible = false;
    // }else
    //     highlights[2].visible = true;    
    // if(banana.position.x === (mapRightX)){
    //     highlights[1].visible = false;
    // }else
    //     highlights[1].visible = true;   
}
//https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript
function bananaUp(){
    down = false;
    
    return down;
}