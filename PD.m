function [ thrust, torqX, torqY, torqZ ] = PD( g, m, Ixx, Iyy, Izz, vDesired, vActual, posDesired, posActual, anglesActual, anglesDesired, anglesVelActual, anglesVelDesired)
%PD Summary of this function goes here
%   Detailed explanation goes here
    KzpD = 60;
    KxD = 1.75;
    KyD = 1.75;
    KzD = 1.75;
    KzpP = 7000;
    KxP = 6;
    KyP = 6;
    KzP = 6;
    
    cx = cosd(anglesActual(1));
    cy = cosd(anglesActual(2));
    
    thrust = (g+KzpD*(vDesired(3)-vActual(3))+KzpP*(posDesired(3)-posActual(3)))*m/(cx*cy);
    torqX = (KxD*(anglesVelDesired(1)-anglesVelActual(1))+KxP*(anglesDesired(1)-anglesActual(1)))*Ixx;
    torqY = (KyD*(anglesVelDesired(2)-anglesVelActual(2))+KyP*(anglesDesired(2)-anglesActual(2)))*Iyy;
    torqZ = (KzD*(anglesVelDesired(3)-anglesVelActual(3))+KzP*(anglesDesired(3)-anglesActual(3)))*Izz;
end

