// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Ball from "./objects/Ball.res.mjs";

var bouncingBallP5 = new p5((function (p) {
        var velocity = new p5.Vector(2.5, 2.0);
        Ball.make(100.0, 100.0, 50.0, 50.0, velocity, 1.0, 1.0, undefined);
        p.setup = (function () {
            p.createCanvas(640, 480);
          });
        p.draw = (function () {
            p.background(220);
          });
      }), "bouncing-ball");

export {
  bouncingBallP5 ,
}
/* bouncingBallP5 Not a pure module */
