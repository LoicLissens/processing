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