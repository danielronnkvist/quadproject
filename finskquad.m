clear all;


% -----------------------------
%   CONSTANTS
% -----------------------------

% gravity
gravity = 9.82;
% mass
mass = 0.46;
% inertia
Ixx = 4.856e-3;
Iyy = Ixx;
Izz = 8.801e-3;
inertiaM = [Ixx, 0, 0;
            0, Iyy, 0;
            0, 0, Izz];
% lift constant
k = 2.98e-6;
% drag contant
b = 1.14e-7;
% arm length on quad
l = 0.225;
% FIXME what is this?
Ir = 1;

% -----------------------------
%   QUAD VARIABLES
% -----------------------------
% position, angle, acceleration and velocity in intertial frame
posI = zeros(3,1);
angI = zeros(3,1);
accI = zeros(3,1);
vI = zeros(3,1);

%lin-velocity, angular velocity and acceleration in body frame
angV = zeros(3,1);
acc = zeros(3,1);
v = zeros(3,1);

% spinning speed of rotors
rotorAngV = 200*[1;1;1;1];

[accI, acc] = linAcc(gravity, k, mass, angI, rotorAngV, angV, v );
[angAccI, angAcc] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rotorAngV, angV, angI);