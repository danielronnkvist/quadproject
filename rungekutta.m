function [newV, newP] = rungekutta(a,v,p,dt)
k1 = a*dt;
k2 = (dt/2)*k1;
k3 = (dt/2)*k2;
k4 = k3*dt;

newV = v + (dt/6)*(k1 + 2*k2 + 2*k3 + k4);

k1 = newV*dt;
k2 = (dt/2)*k1;
k3 = (dt/2)*k2;
k4 = k3*dt;

newP = p + (dt/6)*(k1 + 2*k2 + 2*k3 + k4);
end