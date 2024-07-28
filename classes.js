//TODO separate when access to iternet and bundle this
class Mover{
    constructor(x, y, mass, velocity,damping) {
        this._position = new p5.Vector(x, y)
        this.mass = mass || null
        this.velocity = velocity || new p5.Vector(0, 0)
        this.acceleration = new p5.Vector()
        this.damping = damping || null
    }
    get x() {
        return this._position.x
    }
    get y() {
        return this._position.y
    }
    get position() {
        return this._position
    }
    _update(limit) {
        this.velocity.add(this.acceleration)
        if (this.damping) this.velocity.mult(this.damping)
        if (limit) this.velocity.limit(limit)
        this._position.add(this.velocity)
        this.acceleration.mult(0);
    }
    applyForce(force) {
        if (this.mass > 0) {
            let f = p5.Vector.div(force, this.mass)
            this.acceleration.add(f)
            return
        }
        this.acceleration.add(force)
    }
}
class Ball extends Mover{
    constructor(x, y, height, width, mass,velocity,damping) {
        super(x,y,mass,velocity,damping)
        this.height = height
        this.width = width
    }
    displyay(p) {
        p.fill(255);
        p.ellipse(this.x, this.y, this.height, this.width)
    }
    update(p){
        this._update()
        this._checkCollision(p)

    }
    _checkCollision(p) { // Can also set the position to 0 if it goes out of bound
        if (this.x + (this.width / 2) > p.width || this.x - (this.width / 2) < 0) {
            this.velocity.x = this.velocity.x * -1
        }
        if (this.y + (this.height / 2) > p.height || this.y - (this.height / 2) < 0) {
            this.velocity.y = this.velocity.y * -1
        }
    }
}
class BallWithMouse extends Ball {
    constructor(pos, vel, height, width) {
        super(pos, vel, height, width)
    }
    update(p) {
        const mouseVec = p.createVector(p.mouseX, p.mouseY)
        const dir = p5.Vector.sub(mouseVec, this._position)
        dir.normalize()
        this.velocity.add(dir.mult(0.5))
        this.velocity.limit(10)
        this._position.add(this.velocity)
        this._checkCollision(p)
    }
}

class Pendulum { //TODO add a child class with mouse direction
    /**
     * Constructor of Pendulum
     * @param {p5.Vector} origin - origin of the pendulum
     * @param {p5.Vector} position - position of the pendulum
     * @param {float} r - length of the pendulum
     * @param {float} angle - Starting angle of the pendulum
     * @param {float} damping - damping of the pendulum (artificial way to simulate friction of the air and slow donw the swing)
     */
    constructor(origin, position, r, angle = Math.PI / 4, damping = 0.995) {
        /**
       * @property {p5.Vector} position - position of the pendulum
       */
        this.position = position
        /**
         * @property {p5.Vector} origin - origin of the pendulum
         */
        this.origin = origin
        /**
         * @property {float} r - length of the pendulum
         */
        this.r = r
        /**
         * @property {float} angle - angle of the pendulum
         */
        this.angle = angle
        /**
         * @property {float} angleVelocity - angular velocity of the pendulum
         */
        this.angleVelocity = 0
        /**
         * @property {float} angleAcceleration - angular acceleration of the pendulum
         */
        this.angleAcceleration = 0
        /**
         * @property {float} damping - damping of the pendulum
         */
        this.damping = damping
        /**
        * @property {float} damping - damping of the pendulum
        */
        this._gravity = 0.4
    }
    /**
     *
     * @param {p5} p5 instance
     */
    go(p) {
        this.update()
        this.display(p)
    }
    update() {
        // formula this modify the angle related to the gravity and the length of the pendulum's arm (r)
        this.angleAcceleration = (-1 * this._gravity / this.r) * Math.sin(this.angle)
        this.angleVelocity += this.angleAcceleration
        this.angle += this.angleVelocity
        this.angleVelocity *= this.damping
    }
    /**
     *
     * @param {p5} p - p5 instance
     */
    display(p) {
        // Set the position of the pendulum: sin and cos are used to calculate the x and y coordinates of the pendulum.
        // And at the same time convert polar coordinate to cartesian (x,y).
        this.position.set(this.r * Math.sin(this.angle), this.r * Math.cos(this.angle))
        this.position.add(this.origin) // Add the origin to make the position relative to it.
        p.stroke(175)
        p.line(this.origin.x, this.origin.y, this.position.x, this.position.y)
        p.fill(175)
        p.ellipse(this.position.x, this.position.y, 16, 16) // 16 and 16 should be att of the class as well
    }
}
class Spring {
    /**
     * Constructor of Spring
     * @param {float} x - x position of the anchor
     * @param {float} y - y position of the anchor
     * @param {float} len - The lenght of the spring's arm
     */
    constructor(x, y, len) {
        /**
        * @property {p5.Vector} anchor - Anchor position of the spring
        * @property {float} len - The lenght of the spring's arm
        * @property {float} k - The rigidity of the spring
        */
        this.anchor = new p5.Vector(x, y)
        this.len = len
        this.k = 0.2
        this.height = 50
        this.width = 50
    }
    /**
     * Function that will compute and apply the sping's force to the mover object.
     * @param {Mover} mover -  Mover object instance
     */
    connect(mover) {
        let force = p5.Vector.sub(mover.position, this.anchor)
        const d = force.mag() // direction pointed by the force
        const stretch = d - this.len
        force.normalize()
        force.mult(-1 * this.k * stretch)
        mover.applyForce(force)
    }
    display(p) {
        p.fill(100)
        p.rectMode("CENTER")
        p.rect(this.anchor.x, this.anchor.y, this.height, this.width)
    }
    /**
    * Function that will displya a line between the anchor and the connected mover object.
    * @param {Mover} connectedMover -  Mover object instance
    */
    displayLine(connectedMover, p) {
        p.stroke(255)
        p.line(connectedMover.x, connectedMover.y, this.anchor.x + this.width / 2, this.anchor.y + this.height / 2)
    }
}

class Oscillator {
    /**
     * Constructor of Oscillator
     * @param {float} XVel - X velocity of the Angle
     * @param {float} YVel - Y velocity of the Angle
     * @param {float} XAmplitude - ""
     * @param {float} YAmplitude - ""
     */
    constructor(XVel, YVel, XAmplitude, YAmplitude) {
        /**
        * @property {p5.Vector} angle - The angle
        * @property {p5.Vector} Avelocity - The velocity of the angle
        * @property {p5.Vector} amplitude - The amplitude
        */
        this.angle = new p5.Vector()
        this.Avelocity = new p5.Vector(XVel, YVel)
        this.amplitude = new p5.Vector(XAmplitude, YAmplitude)
    }
    /**
     * Function that make the oscillator oscillate by adding the
     * angle's velocity
     */
    oscillate(){
        this.angle.add(this.Avelocity)
    }
     /**
     *
     * @param {p5} p - p5 instance
     */
    display(p){
        const x = Math.sin(this.angle.x) * this.amplitude.x
        const y =  Math.sin(this.angle.y) * this.amplitude.y
        p.pushMatrix()
        p.translate(p.width/2,p.height/2)
        p.stroke(0)
        p.fill(175)
        p.line(0,0,x,y)
        p.ellipse(x,y,16,16) // Again size is arbitrary
        p.popMatrix()
    }
}
class Particle extends Mover {
     /**
     * Constructor of Particle
     * @param {float} lifespan - Lifespan of the partcile (in frame)
     * @param {float} XLoc - X position of the particle
     * @param {float} YLoc - Y position of the particle
     * @param {float} XVel - X velocity of the particle
     * @param {float} YVel - Y velocity of the particle
     */
    constructor(lifespan,XLoc,Yloc,XVel,YVel,height,width){
        /**
        * @property {p5.Vector} position - The position of the particle
        * @property {p5.Vector} velocity - The velocity of the particle
        * @property {p5.Vector} acceleration - The acceleration of the particle
        * @property {float} lifespan - Lifespan of the partcile (in frame)
        */
        const velocity = (XVel & YVel) ? new p5.Vector(XVel,YVel) : new p5.Vector()
        super(XLoc,Yloc,4,velocity,null)
        this.lifespan = lifespan
        this.height = height
        this.width =  width
    }
    run(p){
        this._update(2)
        this.display(p)
        this.lifespan--
    }
    isDead(){
        return this.lifespan < 0
    }
}
class RoundParticle extends Particle {
    display(p){
        p.fill(p.random(0,this.lifespan),p.random(0,this.lifespan),p.random(0,this.lifespan));
        p.ellipse(this.x, this.y, this.height, this.width)
    }
}
class SquareParticle extends Particle {
    display(p){
        const theta =  p.map(this.x,0,p.width,0,p.TWO_PI * 2) // map the position on the x axe to 360 degreee to spin
        p.fill(p.random(0,this.lifespan),p.random(0,this.lifespan),p.random(0,this.lifespan));
        p.rectMode("CENTER")
        p.push()
        p.translate(this.x,this.y)
        p.rotate(theta)
        p.square(0,0, 15)
        p.pop()
    }
}

class ParticleSystem{
    /**
     * Constructor of ParticleSystem
     * @param {float} XLoc - X position of the particle system
     * @param {float} YLoc - Y position of the particle system
     */
    constructor(XLoc,Yloc){
        /**
        * @property {p5.Vector} position - The position of the particle system
        * @property {array[Particle]} particles - Particles in the system
        * @property {array[p5.Vector]} forces - All force that should be apply to particles
        * @property {any} objectToInteractWith -Objects that will interact with particles
        */
        this.position = new p5.Vector(XLoc,Yloc)
        this.particles =  new Array()
        this.forces = []
        this.objectToInteractWith = []
    }
    /**
     * Function that will add a force to apply to every particle.
     * @param {p5.Vector} force -  The force to apply
     */
    addForceToApply(force){
        this.forces.push(force)
    }
    //TODO The object should be an "interface" with a method "computeForce"
    /**
     * Function that will add an object that will interact with particle.
     * @param {any} object -  The object
     */
    addObjectToInteract(object){
        this.objectToInteractWith.push(object)
    }

    addParticle(){
        const Xvel = Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)
        const Yvel = Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)
        const i =  Math.random()
        let particle =  undefined
        if (i < 0.33){
            particle = new RoundParticle(255,this.position.x,this.position.y,Xvel,Yvel,20,20)
        } else {
            particle = new SquareParticle(255,this.position.x,this.position.y,Xvel,Yvel,15,15)
        }
        this.particles.push(particle)
    }
    clearForces(){
        this.forces = []
        this.objectToInteractWith = []
    }
    run(p){
        let done = false
        const it =  this.particles[Symbol.iterator]()
        while(!done){
            const particle = it.next()
            done = particle.done
            if (done) break
            if (particle.value.isDead()){
                this.particles.splice(this.particles.indexOf(particle.value),1)
            }
            for (const force of this.forces){
                particle.value.applyForce(force)
            }
            for (const object of this.objectToInteractWith){
                const force = object.computeForce(particle.value,p)
                particle.value.applyForce(force)
            }
            particle.value.run(p)
        }
        this.clearForces()
    }
}
class Repeller {
     /**
     * Constructor of Repeller
     * @param {float} XLoc - X position of the particle system
     * @param {float} YLoc - Y position of the particle system
     * @param {float} strength - The strenght force of the repeller
     * @param {float} r - The radius of the repeller shape
     */
     constructor(XLoc,Yloc,strength,r){
        /**
        * @property {p5.Vector} _position - The position of the particle system
        * @property {float} strength - The strenght force of the repeller
        * @property {float} r - The radius of the repeller shape
        */
        this._position = new p5.Vector(XLoc,Yloc)
        this.strength =  strength
        this.r = r
    }
    get x() {
        return this._position.x
    }
    get y() {
        return this._position.y
    }
    display(p){
        p.stroke(255)
        p.fill(255)
        p.ellipse(this.x,this.y,this.r*2,this.r * 2)
    }
    /**
     * Function that will compute and apply the repeller's force to the mover object.
     * @param {Mover} mover -  Mover object instance
     * @param {p5} p - p5 instance
     */
    computeForce(mover,p){
        let dir = p5.Vector.sub(this._position,mover.position)
        let d = dir.mag()
        dir.normalize()
        d = p.constrain(d,5,100)
        const force =  -1 * this.strength / (d*d)
        dir.mult(force)
        return dir
    }
}