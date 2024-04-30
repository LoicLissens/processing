

let sandFallSketch = function(p) {
  function make2DArray(cols,rows){
    let arr =  new Array(cols)
    for (let i = 0;i< arr.length;i++){
      arr[i] = new Array(rows)
      for (let j = 0; j < rows ;j++){
        arr[i][j] = 0
      }
    }
    return arr
  }
  let cols,rows;
  let grid;
  let w = 10;
  p.setup = () => {
    p.createCanvas(600, 700);
    cols = p.width/ w
    rows = p.height/ w
    grid = make2DArray(cols,rows)
  };
  p.draw = () => {
    p.background(0);
    for (let i = 0; i < cols;i++){
      for (let j = 0; j < rows ;j++){
        p.noStroke()
        if (grid[i][j] == 1){
          p.fill(255)
          let x = i * w
          let y = j * w
          p.circle(x,y,w)
        }
      }
    }
    if (p.mouseIsPressed){
      let x = p.floor(p.mouseX/w)
      let y = p.floor(p.mouseY/w)
      if (x >= 0 && x <+ cols -1){
        grid[x][y] = 1
      }
    }

    let nextGrid = make2DArray(cols,rows)
    for (let i = 0; i < cols;i++){
      for (let j = 0; j < rows ;j++){
        let currState =  grid[i][j]
        if (currState === 1){
          let bellow =  grid[i][j +1]
          let dir =  1;
          if (p.random(1) > 0.5){
            dir *= -1
          }
          let bellowA;
          let bellowB;

          if (i + dir >= 0 && i + dir <= cols -1){
            bellowA =  grid[i + dir][j + 1]
          }
          if (i - dir >= 0 && i - dir <= cols -1){
            bellowB =  grid[i - dir][j + 1]
          }
          if (j === rows - 1){
             nextGrid[i][j] = 1
          }else if (bellow === 0){
            nextGrid[i][j+1] = 1
            grid[i][j] = 0
          } else if (bellowA === 0){
            nextGrid[i +dir][j + 1] = 1
          } else if (bellowB === 0){
            nextGrid[i - dir][j + 1] = 1
          }else{
            nextGrid[i][j] = 1
          }
        }
      }
    }
    grid = nextGrid
  };
};
let sandFallP5 = new p5(sandFallSketch, "sand-fall");
class Mover{
  constructor(pos,vel,height,width){
    this._position = pos
    this.velocity = vel
    this.height = height
    this.width = width
  }
  get x(){
    return this._position.x
  }
  get y(){
    return this._position.y
  }
  update(p){
    this._position.add(this.velocity)
    this._checkCollision(p)
  }
  displyay(p){
    p.fill(255);
    p.ellipse(this.x, this.y, this.height, this.width)
  }
  _checkCollision(p){ // Can also set the position to 0 if it goes out of bound
    if (this.x + (this.width/2)  > p.width || this.x - (this.width/2) < 0){
      this.velocity.x =  this.velocity.x  * -1
    }
    if (this.y + (this.height/2) > p.height || this.y - (this.height/2) < 0){
      this.velocity.y  = this.velocity.y * -1
    }
  }
}
// BOUNCING BALL
let bouncingBallP5 = new p5((p) => {
  const heightBall = 50
  const widthBall = 50

  let velocity = p.createVector(2.5,2)
  let position = p.createVector(100,100)

  const ball = new Mover(position,velocity, heightBall, widthBall)


  p.setup = () => {
    p.createCanvas(600, 400);
  };
  p.draw = () => {
    p.background(0);
    ball.update(p)
    ball.displyay(p)
  };
}, "bouncing-ball");

class MoverWithMouse extends Mover{
  constructor(pos,vel,height,width){
    super(pos,vel,height,width)
  }
  update(p){
    const mouseVec = p.createVector(p.mouseX,p.mouseY)
    const dir = p5.Vector.sub(mouseVec,this._position)
    dir.normalize()
    this.velocity.add(dir.mult(0.5))
    this.velocity.limit(10)
    this._position.add(this.velocity)
    this._checkCollision(p)
  }
}
// BOUNCING BALL with mouse
let bouncingBallWithMouseP5 = new p5((p) => {
  const heightBall = 50
  const widthBall = 50

  let velocity = p.createVector(2.5,2)
  let position = p.createVector(100,100)

  const ball = new MoverWithMouse(position,velocity, heightBall, widthBall)

  p.setup = () => {
    p.createCanvas(600, 400);
  };
  p.draw = () => {
    p.background(0);
    ball.update(p)
    ball.displyay(p)
  };
}, "bouncing-ball-mouse");

//TODO game of life