import { scene, enemiesArray } from "../main.js";
import { enemiesTurn, enemyCount } from "./objectGeneration.js";

//this file contains HUD elements
function addButton(){
    var button = document.getElementById("endTurn");
    button.addEventListener("click", onEndTurnClick, false);
    //button.addEventListener("onmouseup", )
    
    //scene.add(button);
}

function onEndTurnClick(event){
    console.log("button clicked");
    enemiesTurn(enemiesArray, enemyCount);
}

export { addButton, onEndTurnClick }