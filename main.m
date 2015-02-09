clear all
s = 100; %samples
g(1:s) = 9.82; %gravitation
m(1:s) = 1; %mass
r = 0.5; %radius
A = pi*r^2; %area
p = 1.2; %density

h0(1:s) = 0; %initial hight
hf = linspace(0, 4, s); %desired hight
theta_max = 10;
theta = linspace(0, theta_max, s);
phi_max = 60;
phi = linspace(0, phi_max, s);

%eq. for T, Tx, Ty, Tz
T  = (p*A*4*g.*(hf-h0) + m.*g)./(cosd(theta).*cosd(phi));
Tx = sqrt(-abs(T).^2.*cosd(theta).^2.*(1-1./(cosd(theta).^2)));
Ty = abs(T).*cosd(theta).*sind(phi);
Tz = abs(T).*cosd(theta).*cosd(phi);

% plot3(Tx, Ty, Tz)

T1 = cosd(theta).*(Tz/4);
T4 = (Tz/4).*(1 + (1 - cosd(theta)));
T2 = cosd(phi).*(Tz/4);
T3 = (Tz/4).*(1 + (1 - cosd(phi)));

%velocity for 4 rotors
v1 = sqrt(T1/(p*A));
v2 = sqrt(T2/(p*A));
v3 = sqrt(T3/(p*A));
v4 = sqrt(T4/(p*A));

suptitle(strcat('Theta: 0-', int2str(theta_max), ' and phi: 0-', int2str(phi_max)));
subplot(2,2,1)
plot(v1)
title('v_1')

subplot(2,2,2)
plot(v2)
title('v_2')

subplot(2,2,3)
plot(v3)
title('v_3')

subplot(2,2,4)
plot(v4)
title('v_4')