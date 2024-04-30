function make2DArray(cols,rows){ //TODO: Add to an util file
    let arr =  new Array(cols)
    for (let i = 0;i< arr.length;i++){
      arr[i] = new Array(rows)
      for (let j = 0; j < rows ;j++){
        arr[i][j] = 0
      }
    }
    return arr
}


// Conway's game of life
let bouncingBallWithMouseP5 = new p5((p) => {
    let cols,rows;
    let grid;
    let w = 10;
    p.setup = () => {
        p.createCanvas(600, 400);
        cols = p.width/ w
        rows = p.height/ w
        grid = make2DArray(cols,rows)
    };
    p.draw = () => {

    };
}, "gameoflife");