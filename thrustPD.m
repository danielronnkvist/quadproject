function [ rotorAngV ] = thrustPD( torqX, torqY,torqZ, T, k ,l, b)
%THRUSTPD Summary of this function goes here
%   Detailed explanation goes here
    rotorAngV(1) = T/(4*k) - torqY/(2*k*l) - torqZ/(4*b);
    rotorAngV(2) = T/(4*k) - torqX/(2*k*l) + torqZ/(4*b);
    rotorAngV(3) = T/(4*k) + torqY/(2*k*l) - torqZ/(4*b);
    rotorAngV(4) = T/(4*k) + torqX/(2*k*l) + torqZ/(4*b);
end

