function [ accI, acc ] = linAcc(g, k, m, a, rav, aV, v, vI, Ar)
    % Linear Velocity for quad
    % g - gravity
    % k - lift contant
    % mass - mass
    % a - euler angles
    % rav - rotors' angular velocity
    % aV - angular velocity in body frame
    % v - velocity in body frame
    % vI - velocity in body inertia frame
    % Ar - Air resistance
    
    R = rotationMatrix(a);
    G = [0;0;-g];
    [Tb,F] = rotorForce(k,rav); % equation 7
    acc = 1/m*(transp(R)*G+Tb-cross(aV,m*v));
    % equation 10
    accI = (G+R*Tb-Ar*vI)/m;
end

