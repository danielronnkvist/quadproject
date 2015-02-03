clear all+;
% position and angle in intertial frame
pos = zeros(3,1);
%acceleration
acc = zeros(3,1);
% angle in body frame
ang = zeros(3,1);
% velocity in x, y and z in body frame
v = zeros(3,1);
% gravity
gravity = -9.82;
% mass
mass = 1;
%thrust in positive z in body frame
thrust = 0;
% our desired velocity
desiredV = [0; 0; .1];


for t=1:100
    errorV = desiredV-v;
    d = acc+errorV./mass;
    r = rotationMatrix(ang(:));
    
    thrust = mass.*d'*r;
    break;
    ang(2) = asind((d(1)*sind(ang(3)) - d(2)*cosd(ang(3))) / ...
                (d(1).^2+d(2).^2+(d(3)+gravity).^2));
    ang(1) = atand((d(1))*cosd(ang(3)) - d(2)*sind(ang(3))/(d(3)+gravity));
    
    acc = -gravity*[0,0,1]' + (thrust/mass)*r(:,3);
    v = acc.*t;
    pos = pos+v;
    posSave(:,t) = pos;
end
% plot(posSave(1,:),'r')
% hold
% plot(posSave(2,:),'g')
% plot(posSave(3,:),'b')
%plot3(posSave(1,:),posSave(2,:),posSave(3,:))
