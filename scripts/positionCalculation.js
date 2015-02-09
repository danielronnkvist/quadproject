// gravity
gravity = 9.82;
// mass
mass = 0.46;
// inertia
Ixx = 4.856e-3;
Iyy = Ixx;
Izz = 8.801e-3;
inertiaM = math.matrix([[Ixx, 0, 0],
                        [0, Iyy, 0],
                        [0, 0, Izz]]);

// lift constant
radius = 0.2;
k = 2.98e-6;
// drag contant
b = 1.14e-7;
// arm length on quad
l = 0.225;
// FIXME what is this?
Ir = 1;
// Air resistance
A = 0.25;
Ar = math.multiply(math.eye(3), A);

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

returns an object like this:
{
  accI: 123,
  acc: 456
}
*/
function linAcc(angI, rotorAngV, angV, v, vI){

}

function newPos(delta){
  // Calculate linear and angular acceleration for quad
  lin = linAcc(angI, rotorAngV, angV, v, vI );
  ang = angAcc(rotorAngV, angV, angI);

  // euler steps for velocity and position
  vI = vI + dt*lin.accI;
  posI = posI + dt*vI;

  // euler steps for angle position and angular velocity
  angV = angV + ang.angularAcc*dt;
  angI = angI+dt*angV;
  angI= angI % 360; // we only want numbers between 0-360

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
