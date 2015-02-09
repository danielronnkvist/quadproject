function [x,y,z] = euler(Fx, Fy, Fz, vx, vy, vz, x1, y1, z1)
dt = 0.1;

t = 1:100

stepsize = size(t)/h;

x = x1;
y = y1;
z = z1;

for i = 1:stepsize
    t(i+1) = t(i) + dt;
    vx(i+1) = vx(i) + Fx(i) / m * dt;
    vy(i+1) = vy(i) + Fy(i) / m * dt;
    vz(i+1) = vz(i) + Fz(i) / m * dt;
    
    x(i+1) = x(i) + vx(i) * dt; 
    y(i+1) = y(i) + vy(i) * dt;
    z(i+1) = z(i) + vz(i) * dt;
end
end