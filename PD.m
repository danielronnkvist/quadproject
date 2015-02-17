function [ thrust, torqX, torqY, torqZ ] = PD( g, m, Ixx, Iyy, Izz, vDesired, vActual, posDesired, posActual, anglesDesired, anglesActual, anglesVelDesired, anglesVelActual)
%PD Summary of this function goes here
%   Detailed explanation goes here
    % derivative of position and rotations, elimnates errors
    KzpD = 100;
    KxD = 100;
    KyD = 100;
    KzD = 100;
    % Propotional of position and rotations, increase quickness
    KzpP = 800;
    KxP = 800;
    KyP = 800;
    KzP = 800;
    
    cx = cosd(anglesActual(1));
    cy = cosd(anglesActual(2));
    
    thrust = (g+KzpD*(vDesired(3)-vActual(3))+KzpP*(posDesired(3)-posActual(3)))*m/(cx*cy);
    torqX = (KxD*(anglesVelDesired(1)-anglesVelActual(1))+KxP*(anglesDesired(1)-anglesActual(1)))*Ixx;
    torqY = (KyD*(anglesVelDesired(2)-anglesVelActual(2))+KyP*(anglesDesired(2)-anglesActual(2)))*Iyy;
    torqZ = (KzD*(anglesVelDesired(3)-anglesVelActual(3))+KzP*(anglesDesired(3)-anglesActual(3)))*Izz;
end

