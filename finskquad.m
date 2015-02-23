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
k = 7.98e-6;
% drag contant
b = 1.14e-7;

% arm length on quad
l = 0.225;
% FIXME what is this?
Ir = 0;
% Air resistance
A = 0.25;
Ar = eye(3)*A;

% -----------------------------
%   QUAD VARIABLES
% -----------------------------
% position, angle, acceleration and velocity in intertial frame
posI = zeros(3,1);
angVI = zeros(3,1);
angI = zeros(3,1);
accI = zeros(3,1);
vI = zeros(3,1);

%lin-velocity, angular velocity and acceleration in body frame
angV = zeros(3,1);
acc = zeros(3,1);
v = zeros(3,1);

% spinning speed of rotors
hover = 907.7;
rotorAngV = hover*[1;1;1;1];
posI = [0;0;2];
angI = [0;0;0];

for t=1:5000
    % time step
    dt = 0.05;
   
    [thrust, torqX, torqY, torqZ] = PD(gravity, mass, Ixx, Iyy, Izz, [0;0;0;], vI, [0;0;2;], posI, [10;10;0;], angI, [0;0;0;], angVI);
    rotorAngV = thrustPD( torqX, torqY,torqZ, thrust, k ,l, b );
    
    rotorAngV = sqrt(rotorAngV);
    rt(:,t) = rotorAngV;
    
    % Calculate linear and angular acceleration for quad
    [accI, acc] = linAcc(gravity, k, mass, angI, rotorAngV, angV, v, vI, Ar );
    [angAccI, angularAcc] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rotorAngV, angV, angI);

    % euler steps for velocity and position
    [vI, posI] = rungekutta(accI,vI,posI,dt);
    % euler steps for angle position and angular velocity
    [angV, x] = rungekutta(angularAcc, angV, 0, dt);
    % euler steps for angle position and angular velocity in intertial
    [angVI, angI] = rungekutta(angAccI, angVI, angI, dt);
%     angI=mod(angI,359); %we only want numbers between 0-360

    % save quad position for plot
    quadP(:,t) = posI;
    quadA(:,t) = angI;
end

plot(quadP(3,:))
hold on
plot(quadA(1,:))
plot(quadA(2,:))
plot(quadA(3,:))
hold off