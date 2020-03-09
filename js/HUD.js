import {
    scene,
    enemiesArray
} from "../main.js";
import {
    enemiesTurn,
    enemyCount
} from "./objectGeneration.js";

//this file contains HUD elements

// Finds the button in the html
// and adds an event listener for if it is clicked
function addButton() {
    var button = document.getElementById("endTurn");
    button.addEventListener("click", onEndTurnClick, false);
    //button.addEventListener("onmouseup", )

    //scene.add(button);
}

// Event for when the button is clicked
function onEndTurnClick(event) {
    console.log("button clicked");
    enemiesTurn(enemiesArray, enemyCount);
}

export {
    addButton,
    onEndTurnClick
}