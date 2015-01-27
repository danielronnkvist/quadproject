g = 9.82;
m = 1;
r = 0.5;
A = pi*r^2;
p = 1.2;

h0 = 0;
hf = 2.5;
theta = 30;
phi = 25;


T  = (p*A*4*g*(hf-h0) + m*g)/(cos(theta)*cos(phi))
Tx = sqrt(-abs(T)^2*cos(theta)^2*(1-1/(cos(theta)^2)))
Ty = abs(T)*cos(theta)*sin(phi)
Tz = abs(T)*cos(theta)*cos(phi)