var max, map;

class HeightMap{
  constructor(n, bottom, top, left, right){
    //Start by setting max initalizing a 2d array of size 2^(n+1) with the corner values set to the arguments
    this.max = Math.pow(2,n);
    
    this.map = [...Array(this.max + 1)].map((_, i) => [...Array(this.max + 1)].map((_, i) => 0));
    
    this.map[0][0] = bottom;        
    this.map[0][this.max] = right;
    this.map[this.max][0] = left;
    this.map[this.max][this.max] = top;

    computeDisplacement(this.map,0,0, this.max);

    console.log(this.map);
  }
  
}
module.exports.HeightMap = HeightMap;

//This method will use the Diamond-Square Algorithm to generate a heightmap for our terrain
function computeDisplacement(heightMap, startX,startY, size){
  if((size) < 2){
    return;
  }
  let mid = size/2;
  console.log(size)
  
  heightMap[startX+mid][startY+mid] = (heightMap[startX][startY] + heightMap[startX][startY+size] + heightMap[startX+size][startY] + heightMap[startX+size][startY+size])/4;

  averageDiamond(heightMap, startX, startY+mid, mid);
  averageDiamond(heightMap, startX+size, startY+mid, mid);
  averageDiamond(heightMap, startX+mid, startY, mid);
  averageDiamond(heightMap, startX+mid, startY+size, mid);

  computeDisplacement(heightMap, startX, startY, mid);
  computeDisplacement(heightMap, startX, mid, mid);
  computeDisplacement(heightMap, mid, mid, mid);
  computeDisplacement(heightMap, mid, startY, mid);
}

function averageDiamond(heightMap, x, y, mid){
  var tot = 0;
  var count = 0;
  
  if (x+mid <= heightMap.length){
    tot += heightMap[x+mid][y]; count++;
  }
  if (x-mid >= 0){
    tot += heightMap[x-mid][y]; count++;
  }
  if (y+mid <= heightMap.length){
    tot += heightMap[x][y+mid]; count++;
  }
  if (y-mid >= 0){
    tot += heightMap[x][y-mid]; count++;
  }
  
  heightMap[x][y] = tot/count;
}

//  {   
// for (var i=size; i > 1; i=i>>1){
//     diamondStep(i);
//     squareStep(i);
    
//   }
//   console.log(heightMap);

//     //return heightMap;
// }

// function diamondStep(chunk){
//     let half = size/2;
//     if(half < 1)
//         return;
    
//     for(let y = 0; y < size - chunk; y += chunk){
//         for(let x = 0; x < size - chunk; x+=chunk){
//             let midY = y + half;
//             let midX = x + half;

//             //diamond step
//             let i2 = i + chunk;
//             let j2 = j + chunk;
            
//         }
//     }
// }

// /* Calculates where all the midpoints of the diamonds are
// dist is the full width of each diamond */
// function squareStep(chunk){
//     var mid = chunk/2;
//     var i, j;
//     var oddIteration = true;
//     for (i=0; i<size; i+= mid){
//       j = (oddIteration) ? mid : 0;
//       for (; j<size; j+=chunk){
//         // each square of len>=2 has 4 diamond centres
//         heightMap[i][j] = avgDiamond(i, j, mid);
//       }
//       oddIteration = !oddIteration;
//     }
//   }

  /* Calculates the mean of the points of a diamond
(x, y): center of diamond, half: width */
function avgDiamond(x, y, half){
    // console.log("diamond: ", x, y);
    var tot = 0;
    var count = 0;
    
    if (x+half < size){
      tot += this.map[x+half][y]; count++;
    }
    if (x-half >= 0){
      tot += heightMap[x-half][y]; count++;
    }
    if (y+half < size){
      tot += heightMap[x][y+half]; count++;
    }
    if (y-half >= 0){
      tot += heightMap[x][y-half]; count++;
    }
    
    return tot/count;
  }

  