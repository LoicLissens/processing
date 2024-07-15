//TODO separate when access to iternet and bundle this

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

  /**
   * Pendulum class
   */
  class Pendulum{
    /**
     * Constructor of Pendulum
     * @param {p5.Vector} origin - origin of the pendulum
     * @param {p5.Vector} location - location of the pendulum
     * @param {float} r - length of the pendulum
     * @param {float} angle - Starting angle of the pendulum
     * @param {float} damping - damping of the pendulum (artificial way to simulate friction of the air and slow donw the swing)
     */
    constructor(origin,location,r,angle = Math.PI/4,damping = 0.995){
      /**
     * @property {p5.Vector} location - location of the pendulum
     */
    this.location = location
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
    this.angle =  angle
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
    go (p){
        this.update()
        this.display(p)
    }
    update(){
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
    display(p){
        // Set the location of the pendulum: sin and cos are used to calculate the x and y coordinates of the pendulum.
        // And at the same time convert polar coordinate to cartesian (x,y).
        this.location.set(this.r * Math.sin(this.angle), this.r * Math.cos(this.angle))
        this.location.add(this.origin) // Add the origin to make the location relative to it.
        p.stroke(175)
        p.line(this.origin.x, this.origin.y,this.location.x,this.location.y)
        p.fill(175)
        p.ellipse(this.location.x,this.location.y,16,16) // 16 and 16 should be att of the class as well
    }
  }
