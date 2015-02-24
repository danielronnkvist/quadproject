
/*
  FUNCTIONS
*/

function newPos(delta){
  delta = delta;

  accelerations = calculateLinAcc();
  accelerationInertial = accelerations.inertial;
  acceleration = accelerations.body;

  angularAccelerations = calculateAngularAcc();
  angularAccelerationInertial = angularAccelerations.inertial;
  angularAcceleration = angularAccelerations.body;
  // euler steps for velocity and position
  temp = math.matrix([[accelerationInertial._data[0][0]*delta],
                       [accelerationInertial._data[1][0]*delta],
                       [accelerationInertial._data[2][0]*delta]]);

  velocityInertial = matrixAdd(velocityInertial, temp);

  temp = math.matrix([[velocityInertial._data[0][0]*delta],
                       [velocityInertial._data[1][0]*delta],
                       [velocityInertial._data[2][0]*delta]]);
  positionInertial = matrixAdd(positionInertial, temp);

  // euler steps for angularvelocity and angles
  temp = math.matrix([[angularAccelerationInertial._data[0][0]*delta],
                       [angularAccelerationInertial._data[1][0]*delta],
                       [angularAccelerationInertial._data[2][0]*delta]]);

  angularVelocityInertial = matrixAdd(angularVelocityInertial, temp);

  temp = math.matrix([[angularVelocityInertial._data[0][0]*delta],
                       [angularVelocityInertial._data[1][0]*delta],
                       [angularVelocityInertial._data[2][0]*delta]]);

  anglesInertial = matrixAdd(anglesInertial, temp);


  temp = math.matrix([[angularAcceleration._data[0][0]*delta],
                       [angularAcceleration._data[1][0]*delta],
                       [angularAcceleration._data[2][0]*delta]]);

  angularVelocity = matrixAdd(angularVelocity, temp);

  temp = [];
  temp[0] = positionInertial._data[0][0];
  temp[1] = positionInertial._data[1][0];
  temp[2] = positionInertial._data[2][0];
  // OBS: angleInertia blir NaN!!
  temp[3] = anglesInertial._data[0][0];
  temp[4] = anglesInertial._data[1][0];
  temp[5] = anglesInertial._data[2][0];

  var rotorTorque = calculateRotorTorque(rotorAngularVelocity);
  var bodyTorque = calculateBodyTorque(rotorAngularVelocity, rotorTorque);
  var force = calculateForce(rotorAngularVelocity);
  var thrust = calculateThrust(force);

  temp[6] = thrust._data[1][0];
  temp[7] = bodyTorque._data[0][0];
  temp[8] = bodyTorque._data[1][0];
  temp[9] = bodyTorque._data[2][0];

  temp[10] = velocityInertial._data[0][0];
  temp[11] = velocityInertial._data[1][0];
  temp[12] = velocityInertial._data[2][0];



  //console.log(temp)
  return temp;
}

// Calculate the linear acceleration in both inertial and body.
function calculateLinAcc()
{
  R = rotationMatrix(anglesInertial);

  var G = math.matrix([[0],
                       [-gravity],
                       [0]]);
  // Make PD to stabilize system
  // Get output rotorAngularVelocity
  //Use zeroMat for desiredVelocity and desired angularVelocity
  var zeroMat = math.matrix([[0],[0],[0]]);

  var PDvar = PD(gravity, mass, Ixx, Iyy, Izz, zeroMat, velocity, posMat, positionInertial, angMat, anglesInertial, zeroMat, angularVelocity);
  // swapping Y and Z to have Y as the "up" axis instead of Z
  var rotorAngularTemp = thrustPD(PDvar.torqX, PDvar.torqZ, PDvar.torqY, PDvar.thrust, k, l, b, rotorAngularVelocity);


  //var force = calculateForce(rotorAngularVelocity);
  rotorAngularVelocity = rotorAngularTemp.rav;
  var force = calculateForce(rotorAngularVelocity);
  var thrust = calculateThrust(force);
  var rg = math.multiply(transp(R),G);
  var rgt = matrixAdd(rg, thrust);
  var aVmv = cross(angularVelocity, dotMultiply(velocity, mass));
  //body
  var acc = dotMultiply((matrixSub(rgt, aVmv)), 1/mass);
  //Inertial
  var rt = math.matrix([[R._data[0][0]*thrust._data[0] + R._data[0][1]*thrust._data[1] + R._data[0][2]*thrust._data[2]],
                        [R._data[1][0]*thrust._data[0] + R._data[1][1]*thrust._data[1] + R._data[1][2]*thrust._data[2]],
                        [R._data[2][0]*thrust._data[0] + R._data[2][1]*thrust._data[1] + R._data[2][2]*thrust._data[2]]]); // R * rf.t
  var arvi = math.matrix([[velocityInertial._data[0] * Ar._data[0][0]],
                          [velocityInertial._data[1] * Ar._data[1][1]],
                          [velocityInertial._data[2] * Ar._data[2][2]]]); // Ar * vI

  var grtArvI = matrixSub(matrixAdd(G, rt), arvi);

  var accI = math.matrix([[grtArvI._data[0]*(1/mass)],
                          [grtArvI._data[1]*(1/mass)],
                          [grtArvI._data[2]*(1/mass)]]);
  return {
    body: acc,
    inertial: accI
  };
}


function calculateAngularAcc()
{
  rotorTorque = calculateRotorTorque(rotorAngularVelocity);
  bodyTorque = calculateBodyTorque(rotorAngularVelocity, rotorTorque);
  var angAcc1 = math.matrix([[((Iyy-Izz)*angularVelocity._data[1][0]*angularVelocity._data[2][0])/Ixx],
                             [((Izz-Ixx)*angularVelocity._data[0][0]*angularVelocity._data[2][0])/Iyy],
                             [((Ixx-Iyy)*angularVelocity._data[0][0]*angularVelocity._data[1][0])/Izz]]);
  var angAcc3 = math.matrix([[bodyTorque._data[0][0]/Ixx],
                             [bodyTorque._data[1][0]/Iyy],
                             [bodyTorque._data[2][0]/Izz]]);
  var angAcc = matrixAdd(angAcc1,angAcc3);
  var dtiTM = ddtinvTransMatrix(anglesInertial);
  var iTM = invTransMatrix(anglesInertial);
  var angAccI1 = math.matrix([[dtiTM._data[0][0]*angularVelocity._data[0][0]+dtiTM._data[0][1]*angularVelocity._data[1][0]+dtiTM._data[0][2]*angularVelocity._data[2][0]],
                              [dtiTM._data[1][0]*angularVelocity._data[0][0]+dtiTM._data[1][1]*angularVelocity._data[1][0]+dtiTM._data[1][2]*angularVelocity._data[2][0]],
                              [dtiTM._data[2][0]*angularVelocity._data[0][0]+dtiTM._data[2][1]*angularVelocity._data[1][0]+dtiTM._data[2][2]*angularVelocity._data[2][0]]]);
  var angAccI2 = math.matrix([[iTM._data[0][0]*angAcc._data[0][0]+iTM._data[0][1]*angAcc._data[1][0]+iTM._data[0][2]*angAcc._data[2][0]],
                              [iTM._data[1][0]*angAcc._data[0][0]+iTM._data[1][1]*angAcc._data[1][0]+iTM._data[1][2]*angAcc._data[2][0]],
                              [iTM._data[2][0]*angAcc._data[0][0]+iTM._data[2][1]*angAcc._data[1][0]+iTM._data[2][2]*angAcc._data[2][0]]]);

  var angAccI = matrixAdd(angAccI1,angAccI2);
  return {
    body: angAcc,
    inertial: angAccI
  };
}


function calculateForce(rav)
{
  var f = [];
  //could write "rav._data.length" instead of 4..
  for(var i = 0; i < 4; i++)
  {
    var temp = k*Math.pow(rav._data[i][0], 2);
    f.push([temp]);
  }
  return math.matrix(f);
}


function calculateThrust(f)
{
  sum = 0;
  for(var i = 0; i < f._data.length; i++)
  {
    var temp = f._data[i][0];
    sum += temp;
  }
  return math.matrix([[0],
                     [sum],
                     [0]]);
}

function calculateRotorTorque(rav){
  var tm = []; //should also have +Im*wdot but us omitted. Im = 3.357e-5
  for(var i = 0; i < rav._data.length; i++){
    var temp = b*Math.pow(rav._data[i][0], 2);
    tm.push([temp])
 }
 return math.matrix(tm);
}

function calculateBodyTorque(rav, rotorTorque){

  var tb = math.matrix([[ l*k*(-Math.pow(rav._data[1][0], 2) + Math.pow(rav._data[3][0],2)) ],
                        [-rotorTorque._data[0][0]+rotorTorque._data[1][0]-rotorTorque._data[2]+rotorTorque._data[3][0]],
                        [ l*k*(-Math.pow(rav._data[0][0], 2) + Math.pow(rav._data[2][0],2)) ]
                        ]);
  return tb;
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