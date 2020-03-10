import { scene, enemiesArray, charactersArray } from "../main.js";
import { enemiesTurn, enemyCount, characterCount } from "./objectGeneration.js";
import { Actor, Melee, Defender, Ranged } from "./actors.js";

//this file contains HUD elements
function addButtons(charactersArray, enemiesArray){
    let endTurnBtn = document.getElementById("endTurn");
    endTurnBtn.addEventListener("click", onEndTurnClick, false);

    let attackBtn = document.getElementById("attack");
    let onAttackClick = function(charactersArray, characterCount, enemiesArray, enemyCount){ 
        return function(event){
            console.log("button clicked");

            let currentCharacter = scene.getObjectByName(charactersArray[characterCount].name);
            let actor = currentCharacter.actor;

            let enemy = scene.getObjectByName(enemiesArray[enemyCount].name);
            let enemyActor = enemy.actor;

            actor.attack(enemyActor, enemiesArray);   ////need to edit the method to use obj vector position

            console.log(actor);
            console.log(enemyActor);
        }
    }
    attackBtn.addEventListener("click", onAttackClick(charactersArray, characterCount, enemiesArray, enemyCount), false);
}

function onEndTurnClick(event){
    console.log("button clicked");
    enemiesTurn(enemiesArray, enemyCount);  //will need to add more parameters 
                                            //once enemy attacking is implemented
}

export { addButtons, onEndTurnClick }