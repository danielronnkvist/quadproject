clear all;
pos = zeros(3,1);
ang = zeros(3,1);

velo = zeros(3,1);
angVelo = zeros(3,1);

gravity = 9.82;
mass = 1;

r = rotationMatrix(ang);

for t=1:100
    acc = -gravity*[0,0,1]' + (t*0.1)*r(:,3);
    accel(:,t) = acc;
    v(:,t) = acc.*t;
end

plot(v(3,:))