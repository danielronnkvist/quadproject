function [ accI, acc ] = linAcc(g, k, mass, ang, rotorAngV, angV, v )
    % Linear Velocity for quad
    
    R = rotationMatrix(ang);
    G = [0;0;-g];
    [Tb,F] = rotorForce(k,rotorAngV); % equation 7
    acc = 1/mass*(transp(R)*G+Tb-cross(angV,mass*v));

    % equation 10
    accI = (G+R*Tb)/mass;
end

