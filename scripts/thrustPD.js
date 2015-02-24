function PD (gravity, mass, Ixx, Iyy, Izz, vDesired, vActual, posDesired, posActual, anglesActual, anglesDesired, angVelActual, angVelDesired){
	// Function PD
	var kzpD = 60;
	var kxD = 1.75;
	var kyD = 1.75;
	var kzD = 1.75;
	var kzpP = 7000;
	var kxP = 6;
	var kyP = 6;
	var kzP = 6;

	// calculating the angles in degrees
	var cx = Math.cos(angI.data_[0]/180*Math.PI);
	var cy = Math.cos(angI.data_[1]/180*Math.PI);

	var thrust = (gravity + kzpD * (vDesired.data_[2]-vActual.data_[2]) + kzpP*(posDesired.data_[2]-posActual.data_[2]))*mass/(cx*cy);
	var torqX = (kxD*(angVelDesired.data_[0]-angVelActual.data_[0])+kxP*(anglesDesired.data_[0]-anglesActual.data_[0]))*Ixx;
	var torqY = (kyD*(angVelDesired.data_[1]-angVelActual.data_[1])+kyP*(anglesDesired.data_[1]-anglesActual.data_[1]))*Iyy;
	var torqZ = (kzD*(angVelDesired.data_[2]-angVelActual.data_[2])+kzP*(anglesDesired.data_[2]-anglesActual.data_[2]))*Izz;

	  return {
    torqX: torqX,
    torqY: torqY,
    torqZ: torqZ,
    thrust: thrust
  };
}

function thrustPD (torqX, torqY,torqZ, T, k ,l, b) {
	// THRUSTPD Summary of this function goes here
	// Detailed explanation goes here

    rotorAngV.data_[0] = T/(4*k) - torqY/(2*k*l) - torqZ/(4*b);
    rotorAngV.data_[1] = T/(4*k) - torqX/(2*k*l) + torqZ/(4*b);
    rotorAngV.data_[2] = T/(4*k) + torqY/(2*k*l) - torqZ/(4*b);
    rotorAngV.data_[3] = T/(4*k) + torqX/(2*k*l) + torqZ/(4*b);

    return {
    	rotorAngV: rotorAngV
    };
}