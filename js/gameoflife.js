function make2DArray(cols, rows) { //TODO: Add to an util file
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0
    }
  }
  return arr
}
function countAdjacentCells(grid, x, y) {
  let count = 0
  return count
}

// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#:~:text=A%20cell%20is%20born%20if,survive%20to%20the%20next%20generation.
let gameOfLife = new p5((p) => {
  let cols, rows;
  let grid;
  let w = 10;
  p.setup = () => {
    p.createCanvas(600, 400);
    cols = p.width / w
    rows = p.height / w
    grid = make2DArray(cols, rows)
    grid[cols / 2][rows / 2] = 1 // first point in the middle
    p.noLoop();
  };
  p.draw = () => {
    console.log("draw");
    p.background(255); // Set the background to white
    p.rect(0, 0, p.width - 1, p.height - 1);
    for (let i = 0; i < cols; i++) {
      let x = i * w
      for (let j = 0; j < rows; j++) {
        let y = j * w
        if (grid[i][j] === 1) {
          p.fill(0)
          p.square(x, y, w)
          p.noFill()
        }
      }
    }
    let nextGrid = make2DArray(cols,rows)
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j]
        let adjacentCells = 0 //TODO: add a function to count ajacent cells
        if (state === 0 && adjacentCells === 3) {
          nextGrid[i][j] = 1
        } else if (state === 1 && (adjacentCells < 2 || adjacentCells > 3)) {
          nextGrid[i][j] = 0
        } else {
          nextGrid[i][j] = state
        }
      }
    }
    grid = nextGrid
  };
}, "gameoflife");
