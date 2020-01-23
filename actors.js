//1-22-20 - Starting simple in order to get a working prototype - Mat

class Actor{   //Base character object
    constructor(name){
        this.name = name;
        this.hitPts = 10;       //Hit points
        this.attPow = 2;        //Attack power
        this.xPos = 0;          //X position 
        this.yPos = 0;          //Y position
        this.exp = 0;           //Experience points
        this.movement = 5;      //How far a unit can move in one turn

        this.resist = null;     //Resistances, weakness and attack type are declared 
        this.weakness = null;   //-->as null here for the following basic functions 
        this.attType = null;    //-->that all ACTOR subclasses will have 
    
    }

    //Function for changing the the position of an actor
    move(x, y){
        this.xPos = x;
        this.yPos = y;
    }

    //Function for damaging another actor. For now, it simply checks weakness and resistance before dealing damage
    attack(actor){
        attMod = 1;
        if(this.attType != null && actor.resist != null){   //check to see if that values are assigned
            if(this.arrCheck(this.attType, actor.resist)){  //if the arg actor is resistant, attack mod is halved
                attMod /=2;                     
            }
            if(this.arrCheck(this.attType, actor.weakness)){//if the arg actor is WEAK, attack mod is doubled
                attMod *=2;
            }
        }
        actor.hitPts -= this.attPow * attMod;               //reduce the arg actor's HP 
    }

    //Function for checking an actor's attType against an array 
    arrCheck(attType, arr){
        found = false;
        if(arr.contains(attType))
            found = true;
        return found;
    }
}