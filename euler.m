function [newV,newP] = euler(a,v,p,dt)
    % Euler numeric method
    newV = v + a * dt;
    newP = p + newV * dt;
end