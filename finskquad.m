clear all;
% position and angle in intertial frame
pos = zeros(3,1);
% angle in inertia frame
ang = zeros(3,1);
% velocity in x, y and z in body frame
v = zeros(3,1);
% angular velocity
angV = zeros(3,1);
% acceleration in body frame
acc = zeros(3,1);
% acceleration in inertial frame
accI = zeros(3,1);
% spinning speed of rotors
rotorAngV = [1000;1000;1000;1000];
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

% equation 9
R = rotationMatrix(ang(:));
G = [0;0;-gravity];
[Tb,F] = rotorForce(k,rotorAngV);
acc = 1/mass*(transp(R)*G+Tb-cross(angV,mass*v));

% equation 10
accI = (G+R*Tb)/mass;

% equation 11
Ir = 1; % FIXME <= what is this?
wT = rotorAngV(1)-rotorAngV(2)+rotorAngV(3)-rotorAngV(4);

angularAcc = inv(inertiaM)*-cross(angV,inertiaM*angV)-Ir*cross(angV,wT*[0;0;1]); % + external torque

% equation 12
angularAccI = angV+invTransMatrix(ang)*angularAcc; %% FIXME: should have d/dt(Winv) in beginning

%%
% for t=1:10
%     d = acc+v./mass;
%     r = rotationMatrix(ang(:));
%     
%     thrust = mass.*d'*r;
%     ang(2) = asind((d(1)*sind(ang(3)) - d(2)*cosd(ang(3))) / ...
%                 (d(1).^2+d(2).^2+(d(3)+gravity).^2));
%     ang(1) = atand((d(1))*cosd(ang(3)) - d(2)*sind(ang(3))/(d(3)+gravity));
%     
%     acc = -gravity*[0,0,1]' + (thrust'/mass).*r(:,3);
%     v = acc.*t*0.1;
%     pos = pos+v;
%     posSave(:,t) = pos;
% end