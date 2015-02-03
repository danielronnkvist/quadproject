clear all;
% position and angle in intertial frame
pos = zeros(3,1);
ang = zeros(3,1);

% velocity in x, y and z in body frame
v = zeros(3,1);
% angle velocity in body frame
angVelo = zeros(3,1);

gravity = 9.82;
mass = 1;
thrust = gravity;
% angle of body frame

ang = [linspace(0,4); linspace(0,10); linspace(0,0)]

for t=1:100
    r = rotationMatrix(ang(:,t));
    r(3,3)
    % Equation 10 in the finnish report
    % Thrust is the lifting force, the one we will control
    acc = -gravity*[0,0,1]' + (thrust/mass)*r(:,3);
    accel(:,t) = acc;
    v(:,t) = acc.*t;
    pos = pos+v(:,t);
    posSave(:,t) = pos;
end
plot(posSave(1,:),'r')
hold
plot(posSave(2,:),'g')
plot(posSave(3,:),'b')
figure
plot3(posSave(1,:),posSave(2,:),posSave(3,:))
