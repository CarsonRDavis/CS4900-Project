class Actor{   //Base character object
    constructor(name){
        this.name = name;
        this.hitPts = 10;       //Hit points
        this.attPow = 2;        //Attack power
        this.xPos = 0;          //X position 
        this.yPos = 0;          //Y position
        this.exp = 0;           //Experience points
        this.movement = 5;      //How far a unit can move in one turn
        this.range = 1;         //How far the unit can reach

        this.resist = null;     //Resistances, weakness and attack type are declared 
        this.weakness = null;   //-->as null here for the following basic functions 
        this.attType = null;    //-->that all ACTOR subclasses will have 
        this.model = null;      //String that holds the model's name
    }

    //Function for changing the the position of an actor
    move(x, y){ 
        this.xPos = x;
        this.yPos = y;
    }

    //Function for damaging another actor. For now, it simply checks weakness and resistance before dealing damage
    attack(actor){
        var attMod = 1;                                       //attack modifier
        
        if(!this.inRange(actor))
            return;

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

    //Check to see if an actor is in attack range
    inRange(actor){
        var xDiff = this.getDiff(this.xPos, actor.xPos);
        var yDiff = this.getDiff(this.yPos, actor.yPos);

        if(xDiff + yDiff > this.range)
            return false;
        else    
            return true;
    }

    //Get the difference between two ints
    getDiff(int1, int2){
        if(int2 > int1)
            return int2 - int1;
        else    
            return int1 - int2;
    }

    //Algorithm for scanning the range of an actor. For now, it marks the range of an actor on a 2d array
    rangeScan(){
        var arr = ([[0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0]]);
        this.move(5,5);                 //position the actor in the center of the new array
        var x = this.xPos;
        var y = this.yPos;
        var lessRange = 0;              //setup variables to hold the actors position and the 'i' variable 

        for(var r = this.range; r > 0; r--){
            for(var i = 0; i <= lessRange; i++){    //Starting at each point, 'draw' a diamond shape around the actor 
                arr[x-i][y+r] = 1;                  // by visiting i cells in the clockwise direction, r cells away from the actor
                arr[x+i][y-r] = 1;
                arr[x+r][y+i] = 1;
                arr[x-r][y-i] = 1;
            }
            lessRange++;
        }
        return arr;
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
        this.range = 5;
        this.weakness = ['Melee'];
        this.attType = ['Ranged'];
    }
}
//module.exports.Actor = Actor;
//module.exports.Melee = Melee; 
//module.exports.Defender = Defender;
//module.exports.Ranged = Ranged;
