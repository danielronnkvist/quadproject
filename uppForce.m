function Fn = uppForce(v)
    % Constants
    p = 1.2;
    A = 0.1;
    m = 1;
    g = 9.82;

    Fn = (p*pi*d^2*v.^2)/4 - m*g;
end