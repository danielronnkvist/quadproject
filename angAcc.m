function [ angAccI, angAcc  ] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rotorAngV, angV, ang)
%ANGACC Summary of this function goes here
%   Detailed explanation goes here

wT = rotorAngV(1)-rotorAngV(2)+rotorAngV(3)-rotorAngV(4);

[Tb, Tm ] = rotorTorque( b, l, k, rotorAngV);
angAcc = [((Iyy-Izz)*angV(2)*angV(3))/Ixx; ((Izz-Ixx)*angV(1)*angV(3))/Iyy; ((Ixx-Iyy)*angV(1)*angV(2))/Izz;] - Ir * [angV(2)/Ixx; -angV(1)/Iyy; 0] * wT + [Tb(1)/Ixx; Tb(2)/Iyy; Tb(3)/Izz;];

b = [Tb(1)/Ixx; Tb(2)/Iyy; Tb(3)/Izz;]

% equation 12
angAccI = ddtinvTransMatrix(ang)*angV+invTransMatrix(ang)*angAcc;


end

