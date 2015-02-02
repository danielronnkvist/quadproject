clear all
s = 100;
g(1:s) = 9.82;
m(1:s) = 1;
r = 0.5;
A = pi*r^2;
p = 1.2;

h0(1:s) = 0;
hf = linspace(0, 4, s);
theta = linspace(0, 30, s);
phi = linspace(0, 45, s);

T  = (p*A*4*g.*(hf-h0) + m.*g)./(cosd(theta).*cosd(phi));
Tx = sqrt(-abs(T).^2.*cosd(theta).^2.*(1-1./(cosd(theta).^2)));
Ty = abs(T).*cosd(theta).*sind(phi);
Tz = abs(T).*cosd(theta).*cosd(phi);

% plot3(Tx, Ty, Tz)

T1 = cosd(theta).*(Tz/4);
T4 = (Tz/4).*(1 + (1 - cosd(theta)));
T2 = cosd(phi).*(Tz/4);
T3 = (Tz/4).*(1 + (1 - cosd(phi)));

v1 = sqrt(T1/(p*A));
v2 = sqrt(T2/(p*A));
v3 = sqrt(T3/(p*A));
v4 = sqrt(T4/(p*A));

subplot(2,2,1)
plot(v1)

subplot(2,2,2)
plot(v2)

subplot(2,2,3)
plot(v3)

subplot(2,2,4)
plot(v4)