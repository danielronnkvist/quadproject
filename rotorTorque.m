function [ Tb, Tm ] = rotorTorque( b, l, k, angV)
% Calculate the torque of the rotor individual motors aswell as the torque
% the body is effected of. b is drag, l is distance from center to rotors
% and k i the lift contant. angV is angual velocities
    Tm = b.*angV.^2; % should also have + Im*wdot but is omitted. Im = 3.357e-5
    Tb = [ l*k*(-angV(2)^2 + angV(4)^2);
           l*k*(-angV(1)^2 + angV(3)^2);
           Tm(1)-Tm(2)+Tm(3)-Tm(4) ];
end