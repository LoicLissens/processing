

let sandFallSketch = function (p) {
  function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows)
      for (let j = 0; j < rows; j++) {
        arr[i][j] = 0
      }
    }
    return arr
  }
  let cols, rows;
  let grid;
  let w = 10;
  p.setup = () => {
    p.createCanvas(600, 700);
    cols = p.width / w
    rows = p.height / w
    grid = make2DArray(cols, rows)
  };
  p.draw = () => {
    p.background(0);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        p.noStroke()
        if (grid[i][j] == 1) {
          p.fill(255)
          let x = i * w
          let y = j * w
          p.circle(x, y, w)
        }
      }
    }
    if (p.mouseIsPressed) {
      let x = p.floor(p.mouseX / w)
      let y = p.floor(p.mouseY / w)
      if (x >= 0 && x < + cols - 1) {
        grid[x][y] = 1
      }
    }

    let nextGrid = make2DArray(cols, rows)
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let currState = grid[i][j]
        if (currState === 1) {
          let bellow = grid[i][j + 1]
          let dir = 1;
          if (p.random(1) > 0.5) {
            dir *= -1
          }
          let bellowA;
          let bellowB;

          if (i + dir >= 0 && i + dir <= cols - 1) {
            bellowA = grid[i + dir][j + 1]
          }
          if (i - dir >= 0 && i - dir <= cols - 1) {
            bellowB = grid[i - dir][j + 1]
          }
          if (j === rows - 1) {
            nextGrid[i][j] = 1
          } else if (bellow === 0) {
            nextGrid[i][j + 1] = 1
            grid[i][j] = 0
          } else if (bellowA === 0) {
            nextGrid[i + dir][j + 1] = 1
          } else if (bellowB === 0) {
            nextGrid[i - dir][j + 1] = 1
          } else {
            nextGrid[i][j] = 1
          }
        }
      }
    }
    grid = nextGrid
  };
};
let sandFallP5 = new p5(sandFallSketch, "sand-fall");

// BOUNCING BALL
let bouncingBallP5 = new p5((p) => {
  const heightBall = 50
  const widthBall = 50

  let velocity = p.createVector(2.5, 2)
  const ball = new Ball(100, 100, heightBall, widthBall, 0, velocity)


  p.setup = () => {
    p.createCanvas(600, 400);
  };
  p.draw = () => {
    p.background(0);
    ball.update(p)
    ball.displyay(p)
  };
}, "bouncing-ball");


// BOUNCING BALL with mouse
let bouncingBallWithMouseP5 = new p5((p) => {
  const heightBall = 50
  const widthBall = 50

  let position = p.createVector(100, 100)

  const ball = new BallWithMouse(100, 100, heightBall, widthBall)

  p.setup = () => {
    p.createCanvas(600, 400);
  };
  p.draw = () => {
    p.background(0);
    ball.update(p)
    ball.displyay(p)
  };
}, "bouncing-ball-mouse");

// PENDULUM champ 3.9
const pendulumSwingBasic = new p5((p) => {
  const pendulum = new Pendulum(p.createVector(300, 200), p.createVector(), 50)
  p.setup = () => {
    p.createCanvas(600, 400);
  };
  p.draw = () => {
    p.background(0);
    pendulum.go(p)
  };
}, "pendulum-swing-basic")
// Spring force 3.10
const spingForce = new p5((p) => {
  const bob = new Ball(100, 100, 50, 50, 20, null, 0.98)
  const spring = new Spring(120, 160, 100)
  const gravity = new p5.Vector(0, 1)
  p.setup = () => {
    p.createCanvas(600, 400);
  };
  p.draw = () => {
    p.background(0);
    bob.applyForce(gravity)
    spring.connect(bob)
    spring.display(p)
    spring.displayLine(bob, p)
    bob.update(p)
    bob.displyay(p)
  };
}, "spring-force")

// 4.4 particle system
const particleSystem = new p5((p) => {
  const system = new ParticleSystem(300, 200)
  const gravity = new p5.Vector(0, 0.1)
  p.setup = () => {
    p.createCanvas(600, 400);
  }
  p.draw = () => {
    p.background(0);
    system.addForceToApply(gravity)
    system.addParticle()
    system.run(p)
  }
}, "particle-system")

// 4.5 System of system
const systemOfSystems = new p5((p) => {
  const systemsList = []
  p.setup = () => {
    p.createCanvas(600, 400);
  }
  p.draw = () => {
    p.background(0);
    for (let i = systemsList.length - 1; i > 0; i--) {
      const system = systemsList[i]
      if (system.lifeSpan < 0) {
        systemsList.splice(i, 1)
        continue
      }
      system.lifeSpan--
      system.system.addParticle()
      system.system.run(p)
    }
  }
  p.mousePressed = () => {
    const system = new ParticleSystem(p.mouseX, p.mouseY)
    systemsList.push({ lifeSpan: 255, system: system })
  }
}, "system-of-system")

// 4.X ? Particle system with repeller and wind
const PSWithRepeller = new p5((p) => {
  const system = new ParticleSystem(300, 100)
  const repeller = new Repeller(300, 300, 500, 30)
  const gravity = new p5.Vector(0, 0.1)
  p.setup = () => {
    p.createCanvas(600, 400);
  }
  p.draw = () => {
    const dx = p.map(p.mouseX, 0, p.width, -0.2, 0.2)
    const wind = new p5.Vector(dx,0)
    p.background(0);
    repeller.display(p)
    system.addForceToApply(wind)
    system.addForceToApply(gravity)
    system.addObjectToInteract(repeller)
    system.addParticle()
    system.run(p)
  }
}, "ps-w-repeller")