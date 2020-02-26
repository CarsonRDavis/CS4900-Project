
class HeightMap{
  constructor(n, bottom, top, left, right){
    //Start by setting max initalizing a 2d array of size 2^(n+1) with the corner values set to the arguments
    this.max = Math.pow(2,n);
    
    ///Create a square array of zeros
    this.map = [...Array(this.max + 1)].map((_, i) => [...Array(this.max + 1)].map((_, i) => 0));
    
    //Set the intitail corner values
    this.map[0][0] = bottom;        
    this.map[0][this.max] = right;
    this.map[this.max][0] = left;
    this.map[this.max][this.max] = top;

    //Make the initial computeDisplacement call
    computeDisplacement(this.map,0,0, this.max);

    console.log(this.map);
  }
  
}
// module.exports.HeightMap = HeightMap; //for testing
const _HeightMap = HeightMap;
export { _HeightMap as HeightMap };

//This method will use the Diamond-Square Algorithm to recursively generate a heightmap for our terrain
function computeDisplacement(heightMap, x, y, size){
  if((size) < 2){
    return;
  }
  let mid = size/2;
  
  //Square step: find the value of the center of the array by averaging the four corners
  heightMap[x+mid][y+mid] = (heightMap[x][y] + heightMap[x][y+size] + heightMap[x+size][y] + heightMap[x+size][y+size])/4;

  //Diamond step: helper function that fills in the 
  diamondStep(heightMap, x, y, size);

  computeDisplacement(heightMap, x, y, mid);
  computeDisplacement(heightMap, x, y+mid, mid);
  computeDisplacement(heightMap, x+mid, y+mid, mid);
  computeDisplacement(heightMap, x+mid, y, mid);
}

function diamondStep(heightMap, x, y, size){
  let mid = size/2;
  let topLeft = heightMap[x][y];
  let bottomLeft = heightMap[x][y+size];
  let topRight = heightMap[x+size][y];
  let bottomRight = heightMap[x+size][y+size];
  let center = heightMap[x+mid][y+mid];

  heightMap[x][y+mid] = (topLeft+bottomLeft+center)/3; //Center left
  heightMap[x+mid][y] = (topLeft+topRight+center)/3; //Top center
  heightMap[x+mid][y+size] = (bottomLeft+bottomRight+center)/3; //Bottom center
  heightMap[x+size][y+mid] = (topRight+bottomRight+center)/3;  //Center right
}

