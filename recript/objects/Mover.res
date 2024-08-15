module Vector = P5.Vector

type t = {
  mutable position: Vector.t,
  mutable velocity: Vector.t,
  mutable acceleration: Vector.t,
  mass?: float,
  damping?: float,
}
type option<'a> = None | Some('a)

let make = (~x: float, ~y: float, ~vel: option<Vector.t>, ~mass, ~damping): t => { //TODO fix damping should be nullable
  let position = P5.Vector.make(Some(x), Some(y))
  let velocity = switch vel {
  | Some(v) => v
  | None => P5.Vector.make(Some(0.0), Some(0.0))
  }
  let acceleration = P5.Vector.make(None, None)
  {position, velocity, acceleration, mass, damping}
}

let getPosition = (mover: t): Vector.t => {
  mover.position
}
let getVelocity = (mover: t): Vector.t => {
  mover.velocity
}
let getMass = (mover:t): float =>{
    switch mover.mass {
    | Some(mass) => mass
    | None => 0.0
    }
}
let _applyDamping = (mover: t): t => {
  switch mover.damping {
  | Some(damping) =>
    mover.velocity.x = mover.velocity.x *. damping // todo use mult method of vetor
    mover.velocity.y = mover.velocity.y *. damping
  | None => ()
  }
  mover
}
let _applyVelocityLimit = (mover: t, limit: option<float>): t => {
  switch limit {
  | Some(limit) => mover.velocity.limit(limit)
  | None => ()
  }
  mover
}
let _addAccToVel = (mover: t): t => {
  mover.velocity.add(mover.acceleration)
  mover
}
let _addVelToPos = (mover: t): t => {
  mover.position.add(mover.velocity)
  mover
}
let _resetAcc = (mover: t): t => {
  mover.acceleration.mult(Vector.make(Some(0.0), Some(0.0)))
  mover
}
let update = (mover: t, limit: option<float>): t => {
  mover->_addAccToVel->_applyDamping->_applyVelocityLimit(limit)->_resetAcc
}
let applyForce = (mover: t, force: Vector.t): t => {
    let {acceleration} = mover
    switch mover.mass {
  | Some(0.0) => acceleration.add(Vector.staticDivide(force, Vector.Float(1.0))) // avoid div by 0
  | Some(v) => acceleration.add(Vector.staticDivide(force, Vector.Float(v)))
  | None => acceleration.add(force) // No mass add force directly
    }
  {
    ...mover,
    acceleration
  }
}
let attract = (mover: t,moverToAttract:t, p: P5.t, gravity: float) => {
    let force = Vector.staticSubstractVector(getPosition(mover),getPosition(moverToAttract))
    let distance = force.mag()
    let distance =  p.constrain(~val=distance,~valueMax=25.0,~valueMin=5.0)
    let force = force.normalize()
    let strengh = (gravity *. getMass(mover)) /. (distance *. distance)
    let force = Vector.staticMultFloat(force,strengh)
    force
}
