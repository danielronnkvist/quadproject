clear all

s = 1;

v1 = linspace(0,100, s);
v2 = linspace(0,75, s);
v3 = linspace(0,140, s);
v4 = linspace(0,90, s);

dis(1:s) = 0.1;

x = linspace(0, 1, s);

F1 = [ dis' -dis'  uppForce(v1)'];
F2 = [-dis'  dis'  uppForce(v2)'];
F3 = [-dis' -dis'  uppForce(v3)'];
F4 = [ dis'  dis'  uppForce(v4)'];

F = zeros(2,1);
F(1,:) = F1 + F2 + F3 + F4;

plotv(F)
