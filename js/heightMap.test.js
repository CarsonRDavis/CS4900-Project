HeightMap = require('./heightMap.js').HeightMap;

test('initializerr test',() =>{ 
    let heightMap = new HeightMap(3,1,1,1,1);
    expect (heightMap.max).toBe(8);
});