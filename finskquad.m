clear all;
pos = zeros(3,1);
ang = zeros(3,1);

velo = zeros(3,1);
angVelo = zeros(3,1);

gravity = 9.82;
mass = 1;
thrust = gravity;
ang = [linspace(0,4); linspace(0,10); linspace(0,0)]

for t=1:100
    r = rotationMatrix(ang(:,t));
    r(3,3)
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