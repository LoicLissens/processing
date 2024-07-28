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
