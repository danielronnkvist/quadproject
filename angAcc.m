function [ angAccI, angAcc  ] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rav, av, a)
%ANGACC calculate the angular acceleration in bodyframe and inertial frame
% b - drag coefficient
% Ixx,Iyy,Izz - moment of inertia
% Ir - gyroscopic thingie
% rav - rotor angular velocity
% av - angular velocity
% a - angles

wT = rav(1)-rav(2)+rav(3)-rav(4);

[Tb, Tm ] = rotorTorque( b, l, k, rav);
% equation 11
angAcc = [((Iyy-Izz)*av(2)*av(3))/Ixx; ((Izz-Ixx)*av(1)*av(3))/Iyy; ((Ixx-Iyy)*av(1)*av(2))/Izz;] - Ir * [av(2)/Ixx; -av(1)/Iyy; 0] * wT + [Tb(1)/Ixx; Tb(2)/Iyy; Tb(3)/Izz;];

% equation 12
angAccI = ddtinvTransMatrix(a)*av+invTransMatrix(a)*angAcc;


end

