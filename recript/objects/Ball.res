module Vector = P5.Vector

type t = {
    body:Mover.t, //TODO should continue wioth a sort of composition for the body or try to immpelment a sort of inheritance ?
    height:float,
    width:float,
    color:string
}
let make = (~x: float, ~y: float,~height: float,~width: float, ~vel: Mover.option<Vector.t>, ~mass:float, ~damping:float, ~color:option<string>): t => {
  let body = Mover.make(~x,~y,~vel,~mass,~damping)
  let color = switch color {
    | Some(v) => v
    | None => "#000000"
  }
  {body, height,width,color}
}
let getPosition = (ball:t):Vector.t=>{
    Mover.getPosition(ball.body)
}
let display = (ball:t,p:P5.t) => {
    let pos =  getPosition(ball)
    p.fill(255)
    p.ellipse(~x=pos.x,~y=pos.y,~w=ball.width)
}
let update = (ball:t,p:P5.t) =>{
    let body = Mover.update(ball.body,None)

}
let checkColision=(p:P5.t,body:Mover.t):Mover.t => {
    let position = Mover.getPosition(body)
}