module Vector = {
  type option<'a> = None | Some('a)
  type rec t = {
    mutable x: float,
    mutable y: float,
    add: t => unit,
    mult: t => unit,
    limit: float => unit,
    mag: unit => float,
    normalize: unit => t,
  }

  @new external make: (option<float>, option<float>) => t = "p5.Vector"

  type floatOrVector =
    | Float(float)
    | Vector(t)
  @val external staticDivideFloat: (t,float) => t = "Vector.div"
  @val external staticDivideVector: (t,t) => t = "Vector.div"
  let staticDivide = (vector:t,arg: floatOrVector) => {
    switch arg {
    | Float(f) => staticDivideFloat(vector,f)
    | Vector(v) => staticDivideVector(vector,v)
    }
  }
  @val external staticSubstractFloat: (t,float) => t = "Vector.sub"
  @val external staticSubstractVector: (t,t) => t = "Vector.sub"
  let staticSub = (vector:t,arg: floatOrVector) => {
    switch arg {
    | Float(f) => staticSubstractFloat(vector,f)
    | Vector(v) => staticSubstractVector(vector,v)
    }
  }
  @val external staticMultFloat: (t,float) => t = "Vector.mult"
  @val external staticMultVector: (t,t) => t = "Vector.mult"
}
type t = {
  //Methods for animation
  mutable setup: unit => unit,
  mutable draw: unit => unit,
  //
  createVector: (float, float) => Vector.t,
  // Methods interacting with the canvas
  createCanvas: (int, int) => unit,
  background: int => unit,
  ellipse: (~x: float, ~y: float, ~w: float, ~h: float=?) => unit,
  constrain: (~val:float,~valueMin:float,~valueMax:float) => float,
  fill:  (int)=> unit
}
// @module("p5") // Can be removed if used with p5 in another file like I do for now
@new external make: (t => unit, string) => t = "p5"
