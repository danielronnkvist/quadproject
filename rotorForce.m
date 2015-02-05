function [ T, F ] = rotorForce( k, angV)
% Calculate the force and thrust of the rotors given lift constant and
% angular velocities
    F = k.*angV.^2;
    T = [0; 0; sum(F)];
end

