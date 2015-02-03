clear all;
% position och vinkel i intertial frame
pos = zeros(3,1);
ang = zeros(3,1);

% hastigheten för x, y och z i body frame
v = zeros(3,1);
% vinkelhastigheten i body frame
angVelo = zeros(3,1);

gravity = 9.82;
mass = 4;
% vinkeln i body frame
ang = [10; 60; 0];
r = rotationMatrix(ang);

for t=1:100
%     Ekvation 10 i finska rapporten
%     t*0.1 är lyftkraften (thrust), det är den vi ska styra
    acc = -gravity*[0,0,1]' + (t*0.4/mass)*r(:,3);
    accel(:,t) = acc;
    v(:,t) = acc.*t;
end

plot(v(3,:), 'g')
hold on
plot(v(2,:), 'b')
plot(v(1,:), 'r')

%% 

velo = [10 ; 0]; 
grav = [0 ; 9.81];
mg = mass * grav;
t = [1:100];
T = (mass * velo);
T2 = T(1)./t;

alpha = acos(abs(-mg)./abs(T))
abs(mg)./abs(T)
