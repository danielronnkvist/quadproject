function flightControl(){
  var temp = {};
  temp.x   = { pos: false, neg: false };
  temp.y   = { pos: false, neg: false };
  temp.z   = { pos: false, neg: false };
  temp.yaw = { pos: false, neg: false };

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
  document.onkeydown = function(evt) {
      switch(evt.keyCode){
        case 65: /*A*/ temp.x.neg = true; break;
        case 68: /*D*/ temp.x.pos = true; break;
        case 75: /*K*/ temp.y.neg = true; break;
        case 73: /*I*/ temp.y.pos = true; break;
        case 87: /*W*/ temp.z.neg = true; break;
        case 83: /*S*/ temp.z.pos = true; break;
        case 74: /*J*/ temp.yaw.neg = true; break;
        case 76: /*L*/ temp.yaw.pos = true; break;
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
        case 74: /*J*/ temp.yaw.neg = false; break;
        case 76: /*L*/ temp.yaw.pos = false; break;
      };
  };
  function reset(){
    copter.position.setX(0);
    copter.position.setY(0);
    copter.position.setZ(0);
    copter.rotation.y = 0;
    temp.velocities.x = temp.velocities.y = temp.velocities.z = 0;
  };
  return temp;
}
