/*
  CONSTANTS
*/

// gravity
var gravity = 9.82;
// mass
var mass = 0.46;
// inertia
var Ixx = 4.856e-3;
var Iyy = Ixx;
var Izz = 8.801e-3;
var inertiaM = math.matrix([[Ixx, 0, 0],
                            [0, Iyy, 0],
                            [0, 0, Izz]]);

// lift constant
var radius = 0.2;
var k = 2.98e-6;
// drag contant
var b = 1.14e-7;
// arm length on quad
var l = 0.225;
// FIXME what is this?
var Ir = 1;
// Air resistance
var A = 0.25;
var Ar = math.multiply(math.eye(3), A);

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
function rotorTorque(angV){

  var tm = Math.pow(b*angV, 2); //should also have +Im*wdot but us omitted. Im = 3.357e-5
  var tb = math.matrix([[ l*k*Math.pow(-angV(2), 2) + Math.pow(angV(4),2)],
                        [ l*k*Math.pow(-angV(1), 2) + Math.pow(angV(3),2)],
                        [Tm(1)-Tm(2)+TM(3)-Tm(4)]]);

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
   sx = Math.sin(angI(1));
   cx = Math.cos(angI(1));
   cy = Math.cos(angI(2));
   ty = Math.tan(ang(2));

   return var w = math.matrix([[0, angI(1)*cs*ty+angI(2)*sx/Math.pow(cy,2), -angI(1)*sx*sy+angI(2)*cy/Math.pow(cy,2)],
                        [0, -angI(1)*sx, -angI(1)*cx],
                        [0, angI(1)*sx/cy+angI(2)*sx*ty/cy, -angI(1)*sx/cy+angI(2)*cx*ty/cy]]);
}

/*MAtrix used to find the angular velocities in the inertial fram from body*/
// function [ w ] = invTransMatrix(angl)
function invTransMatrix(angI){

  // % etadot = inv(W_eta)*nu
  sx = Math.sin(angI(1));
  cx = Math.cos(angI(1));
  cy = Math.cos(angI(2));
  ty = Math.tan(ang(2));

  return var w math.matrix = ([[1, sx*ty, cx*ty],
                              [0, cx, -sx]
                              [0, sx/cy, cx/cy]]);
}

function angAcc(rotorAngV, angV, angI){
  function [ angAccI, angAcc  ] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rav, av, a)
  //%ANGACC calculate the angular acceleration in bodyframe and inertial frame
  // % b - drag coefficient
  // % Ixx,Iyy,Izz - moment of inertia -> global
  // % Ir - gyroscopic thingie
  // % rav - rotor angular velocity
  // % av - angular velocity
  // % a - angles

  var wT = rotorAngV(1)-rotorAngV(2)+rotorAngV(3)-rotorAngV(4);

   // [Tb, Tm ] = rotorTorque( b, l, k, rav);
  var rTorque = rotorTorque(angV);
  var tb = rTorque.tb;
  var tm = rTorque.tm;

  // FIXME - change var names
  var angAcc1 = math.matrix([[((Iyy-Izz)*angV(2)*angV(3))/Ixx],
                            [((Izz-Ixx)*angV(1)*angV(3))/Iyy],
                            [((Ixx-Iyy)*angV(1)*angV(2))/Izz]]);

  var angAcc2 = ([[angV(2)/Ixx],
                  [-angV(1)/Iyy],
                  [0]]);

  var angAcc3 = ([[Tb(1)/Ixx],
                  [Tb(2)/Iyy],
                  [TB(3)/Izz]]);
 
 // FIXME - use mathFunctions
 // equation 11
  // var angAcc = angAcc1 - Ir * angAcc2 * wT * angAcc3;
  var angAcc = matrixSub(angAcc1, Ir) * angAcc2 * dotMultiply(angAcc3, wT);

  // equation 12
  //FIXME - use mathFunctions
  // var angAccI = ddtinvTransMatrix(angI)*angV+invTransMatrix(angI)*angAcc;
  var angAccI = dotMultiply(ddtinvTransMatrix(angI), angV)+invTransMatrix(angI)*angAcc;

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
function linAcc(angI, rotorAngV, angV, v, vI){
  var R = rotationMatrix(angI);
  var G = math.matrix([[0],
                       [0],
                       [-g]]);
  var rf = rotorForce(rotorAngV); // equation 7

  var rg = math.multiply(transp(R), G);
  var rgt = matrixAdd(rg,rf.t);
  var aVmv = cross(aV,math.multiply(m, v));
  var acc = dotMultiply((matrixSub(rgt, aVmv)), 1/m);

  // equation 10
  var rt = math.multiply(R, rf.t);
  var grtArvI = matrixSub(matrixAdd(G, rt), math.multiply(Ar, vI));
  var accI = dotMultiply(grtArvI, 1/m);

  return {
    accI: accI,
    acc: acc
  };
}

// Creates the rotational matrix
// Returns a matrix
function rotationMatrix(rot) {
  var cx = math.cos(rot[0]);
  var cy = math.cos(rot[1]);
  var cz = math.cos(rot[2]);
  var sx = math.sin(rot[0]);
  var sy = math.sin(rot[1]);
  var sz = math.sin(rot[2]);

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
function rotorForce(rotorAngV){
  var f = [];
  var sum = 0;
  for(var i = 0; i < rotorAngV.length; i++)
  {
    var temp = Math.pow(k*rotorAngV[i], 2);
    f.push(temp);
    sum += temp;
  }
  var t = math.matrix([[0],
                       [0],
                       [sum]]);

  return {
    f: f,
    t: t
  }
}

function newPos(delta){
  // Calculate linear and angular acceleration for quad
  var lin = linAcc(angI, rotorAngV, angV, v, vI );
  var ang = angAcc(rotorAngV, angV, angI);

  // euler steps for velocity and position
  var temp = dotMultiply(lin.accI, delta);
  var vI = matrixAdd(vI, temp);

  temp = dotMultiply(vI, delta);
  var posI = matrixAdd(posI, temp);

  // euler steps for angle position and angular velocity
  temp = dotMultiply(ang.angularAcc, delta);
  var angV = matrixAdd(angV, temp);

  temp = dotMultiply(angV, delta);
  var angI = matrixAdd(angI, temp);
  var angI= modMat(angI, 360); // we only want numbers between 0-360

  // we don't want to fall through the earth
  if(posI[3] <= 0)
  {
    posI[3] = 0;
    vI[3] = 0;
    lin.accI[3] = 0;
  }

  // save quad position for plot
  return posI;
}
