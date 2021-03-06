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
        var attMod = 1;                                       //attack modifier
   
        if(this.attType != null && actor.weakness != null){   
            for(var i = 0; i < this.attType.length; i++){     
                if(actor.weakness.includes(this.attType[i])){ //if the arg actor's weakness includes the type, attack mod is doubled
                    attMod *=2;                     
                }
            }
        }
        if(actor.resist != null){
            for(var i = 0; i < this.attType.length; i++){     //second verse, same as the first (but for resistance)
                if(actor.resist.includes(this.attType[i])){   //if the arg actor is resitant, attack mod is halved
                    attMod /= 2;
                }    
            }
        }
        actor.hitPts -= this.attPow * attMod;                  //reduce the arg actor's HP 
    }
}

//define a subclass for melee actors
class Melee extends Actor{
    constructor(name){
        super(name);
        this.weakness = ['Defender'];
        this.attType = ['Melee'];
    }
}

//define a subclass for defender actors
class Defender extends Actor{
    constructor(name){
        super(name);
        this.weakness = ['Ranged'];
        this.attType = ['Defender'];
    }
}

//define a subclass for ranged actors
class Ranged extends Actor{
    constructor(name){
        super(name);
        this.weakness = ['Melee'];
        this.attType = ['Ranged'];
    }
}
//module.exports.Actor = Actor;
//module.exports.Melee = Melee; 
//module.exports.Defender = Defender;
//module.exports.Ranged = Ranged;