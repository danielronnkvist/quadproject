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

    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
  };


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
    var r1Move = new Boolean(false);
    var r2Move = new Boolean(false);
    var r3Move = new Boolean(false);
    var r4Move = new Boolean(false);

    if(temp.x.neg){
      // temp.velocities.x -= delta;
      // turning left key A
      temp.rotors.r2 += delta;
      temp.rotors.r4 += delta;
      r2Move = true; 
      r4Move = true; 
    }if(temp.x.pos){
      // temp.velocities.x += delta;
      // turning right key D
      temp.rotors.r1 += delta;
      temp.rotors.r3 += delta;
    }if(temp.y.neg){
      // temp.velocities.y -= delta;
      // going backwards key K
      temp.rotors.r1 += delta;
      temp.rotors.r2 += delta;
    }if(temp.y.pos){ // going forwards key I
      temp.rotors.r3 += delta;
      temp.rotors.r4 += delta;
    }if(temp.z.neg){ // going up, key W
      temp.rotors.r1 += delta;
      temp.rotors.r2 += delta;
      temp.rotors.r3 += delta;
      temp.rotors.r4 += delta;
    }if(temp.z.pos){ // going down, key S
      temp.rotors.r1 += delta;
      temp.rotors.r2 += delta;
      temp.rotors.r3 += delta;
      temp.rotors.r4 += delta;
    }if(temp.yaw.neg){ // yawing clockwise key L
      temp.rotors.r1 += delta;
      temp.rotors.r4 += delta;
    }if(temp.yaw.pos){ // yawing counter-clockwise key J ev. adding a variable      
      temp.rotors.r2 += delta;
      temp.rotors.r3 += delta;
    }
    if(r1Move == false && temp.rotors.r1 > 0) {
      temp.rotors.r1 -= delta/4; 
      if (temp.rotors.r1 <0)temp.rotors.r1 = 0;
    }
    if(r2Move == false && temp.rotors.r2 > 0) {
      temp.rotors.r2 -= delta/4; 
      if (temp.rotors.r2 <0)temp.rotors.r2 = 0;
    }
    if(r3Move == false && temp.rotors.r3 > 0) {
      temp.rotors.r3 -= delta/4; 
      if (temp.rotors.r3 <0)temp.rotors.r3 = 0;
    }
    if(r4Move == false && temp.rotors.r4 > 0) {
      temp.rotors.r4 -= delta/4; 
      if (temp.rotors.r4 <0)temp.rotors.r4 = 0;
    }
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
    temp.velocities.x = temp.velocities.y = temp.velocities.z = 0;
  };

  return temp;
}
