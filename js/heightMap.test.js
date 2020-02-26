HeightMap = require('./heightMap.js').HeightMap;

test('initializerr test',() =>{ 
    let heightMap = new HeightMap(5,1,2,3,4);
    expect (heightMap.max).toBe(32);
});