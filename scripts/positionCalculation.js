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
function angAcc(rotorAngV, angV, angI){

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
  var acc = 1/m*(matrixSub(matrixAdd(math.multiply(transp(R), G),Tb)-cross(aV,math.multiply(m, v))));
  // equation 10
  var accI = (matrixSub(matrixAdd(G, math.multiply(R, Tb)), math.multiply(Ar, vI)))/m;

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
  var vI = vI + delta*lin.accI;
  var posI = posI + delta*vI;

  // euler steps for angle position and angular velocity
  var angV = angV + ang.angularAcc*delta;
  var angI = angI+delta*angV;
  var angI= angI % 360; // we only want numbers between 0-360

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
