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
        this.resistances = null;//Resistances and weakness are declared as null 
        this.weaknesses = null; //-->here so "Actors" can be used as arguments 
        
    
    }
    move(x, y){
        this.xPos = x;
        this.yPos = y;
    }
    attack(actor){
        
    }
}