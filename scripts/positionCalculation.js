/*
  CONSTANTS
*/

// gravity
var gravity = 9.82;
// mass
var mass = 0.46;
// inertia
var Ixx = 4.856*Math.pow(10,-3);
var Iyy = Ixx;
var Izz = 8.801*Math.pow(10,-3);
var inertiaM = math.matrix([[Ixx, 0, 0],
                            [0, Iyy, 0],
                            [0, 0, Izz]]);

// lift constant
var radius = 0.2;
var k = 8*Math.pow(10,-6);
// drag contant
var b = 1.14*Math.pow(10,-7);
// arm length on quad
var l = 0.225;
// FIXME what is this?
var Ir = 1;
// Air resistance
var A = 0.25;
var Ar = dotMultiply(math.eye(3), A);

// acceleration and velocity in intertial frame
var accI = math.matrix([[0],
                        [0],
                        [0]]);
var vI = math.matrix([[0],
                      [0],
                      [0]]);

// lin-velocity, angular velocity and acceleration in body frame
var angV = math.matrix([[0],
                        [0],
                        [0]]);
var acc = math.matrix([[0],
                       [0],
                       [0]]);
var v = math.matrix([[0],
                     [0],
                     [0]]);

/*
  FUNCTIONS
*/

/*
calculate the angular acceleration

returns an object like this:
{
  angAccI: 123,
  angularAcc: 456
}
*/
/*Calculates the torque of the rotor individual motors aswell as the torque
the body is effected of: b is drag, l is the distanxe from center to rotors
and k is the lift contant. angV is the angual velocities*/

//function [ Tb, Tm ] = rotorTorque( b, l, k, angV)
function rotorTorque(){
  var tm = []; //should also have +Im*wdot but us omitted. Im = 3.357e-5
  for(var i = 0; i < rotorAngV._data.length; i++){
    tm.push([Math.pow(rotorAngV._data[i][0]*b, 2)])
  }
  var tb = math.matrix([[ l*k*Math.pow(-rotorAngV._data[1][0], 2) + Math.pow(rotorAngV._data[3][0],2)],
                        [ l*k*Math.pow(-rotorAngV._data[0][0], 2) + Math.pow(rotorAngV._data[2][0],2)],
                        [-tm[0][0]+tm[1][0]-tm[2][0]+tm[3][0]]]);

  return {
    tb: tb,
    tm: tm
  };

}

/*Matrix used to find angular velocities in the inertial fram from
body frame*/
// function [ w ] = ddtinvTransMatrix(angl)
function ddtinvTransMatrix(angI){
   // etadot = inv(W_eta)*nu
   var sx = Math.sin(angI._data[0][0]);
   var cx = Math.cos(angI._data[0][0]);
   var cy = Math.cos(angI._data[1][0]);
   var ty = Math.tan(angI._data[1][0]);

   return math.matrix([[0, angI._data[0][0]*cx*ty+angI._data[1][0]*sx/Math.pow(cy,2), -angI._data[0][0]*sx*ty+angI._data[1][0]*cy/Math.pow(cy,2)],
                       [0, -angI._data[0][0]*sx, -angI._data[0][0]*cx],
                       [0, angI._data[0][0]*sx/cy+angI._data[1][0]*sx*ty/cy, -angI._data[0][0]*sx/cy+angI._data[1][0]*cx*ty/cy]]);
}

/*MAtrix used to find the angular velocities in the inertial fram from body*/
// function [ w ] = invTransMatrix(angl)
function invTransMatrix(angI){

  // % etadot = inv(W_eta)*nu
  var sx = Math.sin(angI._data[0][0]);
  var cx = Math.cos(angI._data[0][0]);
  var cy = Math.cos(angI._data[1][0]);
  var ty = Math.tan(angI._data[1][0]);

  return math.matrix([[1, sx*ty, cx*ty],
                      [0, cx, -sx],
                      [0, sx/cy, cx/cy]]);
}

/*Calculates the angular acceleration in body- and inertial frame */
// function [ angAccI, angAcc  ] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rav, av, a)
function angAcc(angI){
  // function [ angAccI, angAcc  ] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rav, av, a)
  //%ANGACC calculate the angular acceleration in bodyframe and inertial frame
  // % b - drag coefficient
  // % Ixx,Iyy,Izz - moment of inertia -> global
  // % Ir - gyroscopic thingie
  // % rav - rotor angular velocity
  // % av - angular velocity
  // % a - angles
  var wT = -rotorAngV._data[0][0]+rotorAngV._data[1][0]-rotorAngV._data[2][0]+rotorAngV._data[3][0];

   // [Tb, Tm ] = rotorTorque( b, l, k, rav);
  var rTorque = rotorTorque();

  var tb = rTorque.tb;
  var tm = rTorque.tm;

  // FIXME - change var names
  var angAcc1 = math.matrix([[((Iyy-Izz)*angV._data[1][0]*angV._data[2][0])/Ixx],
                             [((Izz-Ixx)*angV._data[0][0]*angV._data[2][0])/Iyy],
                             [((Ixx-Iyy)*angV._data[0][0]*angV._data[1][0])/Izz]]);
  var angAcc2 = math.matrix([[(-Ir * angV._data[1][0] * wT)/Ixx],
                             [(-Ir * (-angV._data[0][0]) * wT)/Iyy],
                             [0]]);

  var angAcc3 = math.matrix([[tb._data[0][0]/Ixx],
                             [tb._data[1][0]/Iyy],
                             [tb._data[2][0]/Izz]]);

  // FIXME - use mathFunctions
  // equation 11
  // var angAcc = angAcc1 - Ir * angAcc2 * wT * angAcc3;
  var angAcc = matrixAdd(matrixAdd(angAcc1, angAcc2), angAcc3);

  // equation 12
  //FIXME - use mathFunctions
  // var angAccI = ddtinvTransMatrix(angI)*angV+invTransMatrix(angI)*angAcc;
  var angIV = math.multiply(ddtinvTransMatrix(angI), angV);
  var invTM = invTransMatrix(angI);

  var angIAc = math.matrix([[invTM._data[0][0]*angAcc._data[0][0] + invTM._data[0][1]*angAcc._data[1][0] +  invTM._data[0][2]*angAcc._data[2][0]],
                            [invTM._data[1][0]*angAcc._data[0][0] + invTM._data[1][1]*angAcc._data[1][0] +  invTM._data[1][2]*angAcc._data[2][0]],
                            [invTM._data[2][0]*angAcc._data[0][0] + invTM._data[2][1]*angAcc._data[1][0] +  invTM._data[2][2]*angAcc._data[2][0]]]);
  var angAccI = matrixAdd(angIV, angIAc);

  return {
    angAcc: angAcc,
    angAccI: angAccI
  };
}


/*
calculate the linear acceleration

variables:
  Linear Velocity for quad
  g - gravity
  k - lift contant
  mass - mass
  angI - euler angles
  rotorAngV - rotors' angular velocity
  aV - angular velocity in body frame
  v - velocity in body frame
  vI - velocity in body inertia frame
  Ar - Air resistance

returns an object like this:
{
  accI: 123,
  acc: 456
}
*/
function linAcc(angI, v){
  var R = rotationMatrix(angI);
  var G = math.matrix([[0],
                       [0],
                       [-gravity]]);
  var rf = rotorForce(); // equation 7

  var rg = math.multiply(transp(R), G);
  var rgt = matrixAdd(rg,rf.t);
  // console.log(angV)
  var aVmv = cross(angV, dotMultiply(v, mass));
  var acc = dotMultiply((matrixSub(rgt, aVmv)), 1/mass);

  // equation 10
  var rt = math.matrix([[R._data[0][0]*rf.t._data[0] + R._data[0][1]*rf.t._data[1] + R._data[0][2]*rf.t._data[2]],
                        [R._data[1][0]*rf.t._data[0] + R._data[1][1]*rf.t._data[1] + R._data[1][2]*rf.t._data[2]],
                        [R._data[2][0]*rf.t._data[0] + R._data[2][1]*rf.t._data[1] + R._data[2][2]*rf.t._data[2]]]); // R * rf.t
  var arvi = math.matrix([[vI._data[0] * Ar._data[0][0]],
                          [vI._data[1] * Ar._data[1][1]],
                          [vI._data[2] * Ar._data[2][2]]]); // Ar * vI
  var grtArvI = matrixSub(matrixAdd(G, rt), arvi);
  var accI = math.matrix([[grtArvI._data[0]*(1/mass)],
                          [grtArvI._data[1]*(1/mass)],
                          [grtArvI._data[2]*(1/mass)]]);

  return {
    accI: accI,
    acc: acc
  };
}

// Creates the rotational matrix
// Returns a matrix
function rotationMatrix(rot) {
  var cx = Math.cos(rot._data[0]);
  var cy = Math.cos(rot._data[1]);
  var cz = Math.cos(rot._data[2]);
  var sx = Math.sin(rot._data[0]);
  var sy = Math.sin(rot._data[1]);
  var sz = Math.sin(rot._data[2]);

  return math.matrix([[cz*cy, cz*sy*sx-sz*cx, cz*sy*cx+sz*sx],
                      [sz*cy, sz*sy*sx+cz*cx, sz*sy*cx-cz*sx],
                      [-sy,   cy*sx,          cy*cx]]);
}

/*
  Calculates the rotor force and returns an object:
  {
    f: [1, 2, 3],
    t: math.matrix([[0],
                    [0],
                    [sum(F)]]);
  }
*/
function rotorForce(){
  var f = [];
  var sum = 0;
  for(var i = 0; i < rotorAngV._data.length; i++)
  {
    var temp = Math.pow(k*rotorAngV._data[i][0], 2);
    f.push([temp]);
    sum += temp;
  }
  f = math.matrix(f);
  var t = math.matrix([[0],
                       [0],
                       [sum]]);

  return {
    f: f,
    t: t
  }
}

function copterPosition(){
  return math.matrix([[copter.position.x],
                      [copter.position.z],
                      [copter.position.y]]);
}

function copterRotation(){
  return math.matrix([[copter.rotation.x],
                      [copter.rotation.z],
                      [copter.rotation.y]]);
}

/*
USER INPUT

hover = 907.6;
rotorAngV = hover*[1;1;1;1];
*/
var angI = copterRotation();
var posI = copterPosition();
function newPos(delta){
  delta = 200*delta;
  var lin, ang, accI, temp;

  // Calculate linear and angular acceleration for quad
  lin = linAcc(angI, v);
  ang = angAcc(angI);

  // euler steps for velocity and position
  accI = lin.accI;
  temp = math.matrix([[accI._data[0][0]*delta],
                      [accI._data[1][0]*delta],
                      [accI._data[2][0]*delta]]);
  vI = matrixAdd(vI, temp);

  // console.log(temp)
  temp = math.matrix([[vI._data[0]*delta],
                      [vI._data[1]*delta],
                      [vI._data[2]*delta]]);
  // temp = dotMultiply(vI, delta);
  posI = matrixAdd(posI, temp);

  // euler steps for angle position and angular velocity
  // temp = dotMultiply(ang.angAcc, delta);
  temp = math.matrix([[ang.angAcc._data[0]*delta],
                      [ang.angAcc._data[1]*delta],
                      [ang.angAcc._data[2]*delta]]);
  angV = math.matrix([[parseInt(angV._data[0]+temp._data[0])],
                      [parseInt(angV._data[1]+temp._data[1])],
                      [parseInt(angV._data[2]+temp._data[2])]])

  // temp = dotMultiply(angV, delta);
  temp = math.matrix([[angV._data[0]*delta],
                      [angV._data[1]*delta],
                      [angV._data[2]*delta]]);
  angI = matrixAdd(angI, temp);
  angI = math.matrix([[angI._data[0]%360],
                      [angI._data[1]%360],
                      [angI._data[2]%360]]);
  // angI = modMat(angI, 360); // we only want numbers between 0-360

  // we don't want to fall through the earth
  if(posI._data[2][0] <= 0)
  {
    posI._data[2][0] = 0;
    vI._data[2][0] = 0;
    lin.accI._data[2][0] = 0;
  }
  temp = [];
  temp[0] = vI._data[0][0];
  temp[1] = vI._data[2][0];
  temp[2] = vI._data[1][0];
  // save quad position for plot
  return temp;
}
