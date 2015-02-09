function [newV, newP] = eulerStep(a,v,p,dt)
    % Euler numeric method
    newV = v + a * dt;
    newP = p + newV * dt;
end