clear all;
% position och vinkel i intertial frame
pos = zeros(3,1);
%acceleration
acc = zeros(3,1);
% vinkeln i body frame
ang = zeros(3,1);
% hastigheten f�r x, y och z i body frame
v = zeros(3,1);
%
gravity = -9.82;
%massa
mass = 1;
%lyftkraft
thrust = 0;
desiredV = [0; 0; 10];

for t=1:100
    d = acc+v./mass;
    r = rotationMatrix(ang(:));
    thrust = mass.*d'*r;
    ang(2) = asind((d(1)*sind(ang(3)) - d(2)*cosd(ang(3))) / ...
                (d(1).^2+d(2).^2+(d(3)+gravity).^2));
    ang(1) = acosd((d(1))*cosd(ang(3)) - d(2)*sind(ang(3))/(d(3)+gravity));


    %     Ekvation 10 i finska rapporten
    %     thrust �r lyftkraften, det �r den vi ska styra
    acc = -gravity*[0,0,1]' + (thrust/mass)*r(:,3);
    v = acc.*t;
    pos = pos+v;
    posSave(:,t) = pos;
end
% plot(posSave(1,:),'r')
% hold
% plot(posSave(2,:),'g')
% plot(posSave(3,:),'b')
plot3(posSave(1,:),posSave(2,:),posSave(3,:))
