let bouncingBallP5 =  P5.make((p:P5.t) => {
    let heightBall = 50.0
    let widthBall = 50.0
    let velocity = P5.Vector.make(Some(2.5),Some(2.0))
    let ball =  Ball.make(~x=100.0,~y=100.0,~height=heightBall,~width=widthBall,~vel=Some(velocity),~mass=1.0,~damping=1.0,~color=None)
    p.setup = () => {
        p.createCanvas(640, 480)
    }
    p.draw = () => {
        p.background(220)
    }
}, "bouncing-ball")
// BOUNCING BALL with mouse
