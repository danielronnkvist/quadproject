/*

flightControl()

Returns an object consisting of if buttons are pressed and velocities with their value.

The function temp.velocities.decrease(t, axis) decreases the velocity on the axis by 2*t.
  * axis [string]
  * t [float]

*/
var FlightControl = function(copter){
  _this = this;
  this.copter = copter;
  this.x   = { pos: false, neg: false };
  this.y   = { pos: false, neg: false };
  this.z   = { pos: false, neg: false };
  this.yaw = { pos: false, neg: false };

  this.rotors = {

    r1: 1,
    r2: 1,
    r3: 1,
    r4: 1,
  };

  this.hover = 554.65;

  // Event listeners on keypresses
  document.onkeydown = function(evt) {
    switch(evt.keyCode){
      case 65: /*A*/ _this.x.neg = true; break;
      case 68: /*D*/ _this.x.pos = true; break;
      case 75: /*K*/ _this.y.neg = true; break;
      case 73: /*I*/ _this.y.pos = true; break;
      case 87: /*W*/ _this.z.neg = true; break;
      case 83: /*S*/ _this.z.pos = true; break;
      case 76: /*L*/ _this.yaw.neg = true; break;
      case 74: /*J*/ _this.yaw.pos = true; break;
      case 32: /*space*/ _this.reset(); break;
    };
  };
  document.onkeyup = function(evt) {
    switch(evt.keyCode){
      case 65: /*A*/ _this.x.neg = false; break;
      case 68: /*D*/ _this.x.pos = false; break;
      case 75: /*K*/ _this.y.neg = false; break;
      case 73: /*I*/ _this.y.pos = false; break;
      case 87: /*W*/ _this.z.neg = false; break;
      case 83: /*S*/ _this.z.pos = false; break;
      case 76: /*L*/ _this.yaw.neg = false; break;
      case 74: /*J*/ _this.yaw.pos = false; break;
    };
};
}
/*

Alters the velocity with delta depending on which buttons are pressed.
If no button is pressed on an axis the axis velocity is decreased.

*/
FlightControl.prototype.update = function(delta) {
  delta = delta*10;
  var pitch = false;
  var yaw = false;
  var roll = false;
  var alt = false;

  if(this.x.neg){
    // turning left key A
    this.copter.angMat._data[2][0]+= delta;
    roll = true;
  }if(this.x.pos){
    // turning right key D
    this.copter.angMat._data[2][0]-= delta;
    roll = true;
  }if(this.y.neg){
    // going decline key K
    this.copter.posMat._data[1][0]-= delta;
    alt= true;
  }if(this.y.pos){
    // going upwards key I
    this.copter.posMat._data[1][0]+= delta;
    alt = true;
  }if(this.z.neg){ // going forward, key W
    this.copter.angMat._data[0][0]-= delta;
    pitch = true;
  }if(this.z.pos){ // going backwards, key S
    this.copter.angMat._data[0][0]+= delta;
    pitch = true;
  }if(this.yaw.neg){ // yawing clockwise key L
    this.copter.angMat._data[1][0]-= delta;
    yaw = true;
  }if(this.yaw.pos){ // yawing counter-clockwise key J ev. adding a variable
    this.copter.angMat._data[1][0]+= delta;
    yaw = true;
  }

  if(!pitch)
    this.copter.angMat._data[0][0] = 0;
  if(!roll)
    this.copter.angMat._data[2][0] = 0;

};


// Reset the copters values
FlightControl.prototype.reset = function(){
  this.copter.position.setX(0);
  this.copter.position.setY(0);
  this.copter.position.setZ(0);
  this.copter.rotation.y = 0;
  this.rotors.r1 = this.rotors.r2 = this.rotors.r3 = this.rotors.r4 = 1;
  this.velocities.x = this.velocities.y = this.velocities.z = 0;
};
