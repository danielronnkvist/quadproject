/*

flightControl()

Returns an object consisting of if buttons are pressed and velocities with their value.

The function temp.velocities.decrease(t, axis) decreases the velocity on the axis by 2*t.
  * axis [string]
  * t [float]

*/
function flightControl(){
  var temp = {};
  temp.x   = { pos: false, neg: false };
  temp.y   = { pos: false, neg: false };
  temp.z   = { pos: false, neg: false };
  temp.yaw = { pos: false, neg: false };

  temp.rotors = {

    r1: 1,
    r2: 1,
    r3: 1,
    r4: 1,
  };

  temp.hover = 554.65;

  temp.velocities = {
    z: 0,
    y: 0,
    x: 0,
    decrease: function(t, axis){
      if(Math.abs(this[axis]) > 0){
        if(this[axis] < 0){
          this[axis] += 2*t;
          if(this[axis] > 0)
            this[axis] = 0;
        }else{
          this[axis] -= 2*t;
          if(this[axis] < 0)
            this[axis] = 0;
        }
      }
    }


};



  /*

  Alters the velocity with delta depending on which buttons are pressed.
  If no button is pressed on an axis the axis velocity is decreased.

  */
  temp.update = function(delta) {
    delta = delta/10;
    var r1Move = false;
    var r2Move = false;
    var r3Move = false;
    var r4Move = false;

    if(temp.x.neg){
      // turning left key A
      temp.rotors.r1 -= delta;
      temp.rotors.r2 += delta;
      temp.rotors.r3 -= delta;
      temp.rotors.r4 += delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.x.pos){
      // turning right key D
      temp.rotors.r1 += delta;
      temp.rotors.r2 -= delta;
      temp.rotors.r3 += delta;
      temp.rotors.r4 -= delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.y.neg){
      temp.rotors.r1 -= delta;
      temp.rotors.r2 -= delta;
      temp.rotors.r3 -= delta;
      temp.rotors.r4 -= delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.y.pos){
      // going forwards key I
      temp.rotors.r1 += delta;
      temp.rotors.r2 += delta;
      temp.rotors.r3 += delta;
      temp.rotors.r4 += delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.z.neg){ // going forward, key W
      temp.rotors.r1 += delta;
      temp.rotors.r2 += delta;
      temp.rotors.r3 -= delta;
      temp.rotors.r4 -= delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.z.pos){ // going backwards, key S
      temp.rotors.r1 -= delta;
      temp.rotors.r2 -= delta;
      temp.rotors.r3 += delta;
      temp.rotors.r4 += delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.yaw.neg){ // yawing clockwise key L
      temp.rotors.r1 += delta;
      temp.rotors.r2 -= delta;
      temp.rotors.r3 -= delta;
      temp.rotors.r4 += delta;
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }if(temp.yaw.pos){ // yawing counter-clockwise key J ev. adding a variable
      r1Move = true;
      r2Move = true;
      r3Move = true;
      r4Move = true;
    }

    if(!r1Move)
      temp.rotors.r1 = 1;
    if(!r2Move)
      temp.rotors.r2 = 1;
    if(!r3Move)
      temp.rotors.r3 = 1;
    if(!r4Move)
      temp.rotors.r4 = 1;
  };

  // Event listeners on keypresses
  document.onkeydown = function(evt) {
    switch(evt.keyCode){
      case 65: /*A*/ temp.x.neg = true; break;
      case 68: /*D*/ temp.x.pos = true; break;
      case 75: /*K*/ temp.y.neg = true; break;
      case 73: /*I*/ temp.y.pos = true; break;
      case 87: /*W*/ temp.z.neg = true; break;
      case 83: /*S*/ temp.z.pos = true; break;
      case 76: /*L*/ temp.yaw.neg = true; break;
      case 74: /*J*/ temp.yaw.pos = true; break;
      case 32: /*space*/ reset(); break;
    };
  };
  document.onkeyup = function(evt) {
    switch(evt.keyCode){
      case 65: /*A*/ temp.x.neg = false; break;
      case 68: /*D*/ temp.x.pos = false; break;
      case 75: /*K*/ temp.y.neg = false; break;
      case 73: /*I*/ temp.y.pos = false; break;
      case 87: /*W*/ temp.z.neg = false; break;
      case 83: /*S*/ temp.z.pos = false; break;
      case 76: /*L*/ temp.yaw.neg = false; break;
      case 74: /*J*/ temp.yaw.pos = false; break;
    };
  };

  // Reset the copters values
  function reset(){
    copter.position.setX(0);
    copter.position.setY(0);
    copter.position.setZ(0);
    copter.rotation.y = 0;
    temp.rotors.r1 = temp.rotors.r2 = temp.rotors.r3 = temp.rotors.r4 = 1;
    temp.velocities.x = temp.velocities.y = temp.velocities.z = 0;
  };

  return temp;
}
