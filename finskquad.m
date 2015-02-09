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
radius = 0.2;
k = 2.98e-6;
% drag contant
b = 1.14e-7;
% arm length on quad
l = 0.225;
% FIXME what is this?
Ir = 1;
% Air resistance
A = 0.25;
Ar = eye(3)*A;
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
rotorAngV = 909*[1;1;1;1];

for t=1:100
    % time step
    dt = 0.1;
    % Calculate linear and angular acceleration for quad
    [accI, acc] = linAcc(gravity, k, mass, angI, rotorAngV, angV, v, vI, Ar );
    [angAccI, angularAcc] = angAcc(b, l, k, Ixx, Iyy, Izz, Ir, rotorAngV, angV, angI);
    
    % euler steps for velocity and position
    vI = vI + dt*accI;
    posI = posI + dt*vI;
    
    % euler steps for angle position and angular velocity
    angV = angV + angularAcc*dt;
    angI = angI+dt*angV;
    angI=mod(angI,360); %we only want numbers between 0-360
    
    % we don't want to fall through the earth
    if(posI(3) <= 0)
        posI(3) = 0;
        vI(3) = 0;
        accI(3) = 0;
    end
    
    % save quad position for plot
    quadP(:,t) = posI;
end
% show quad position over time
plot3(quadP(1,:),quadP(2,:),quadP(3,:))