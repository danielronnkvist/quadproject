clear all
s = 1000;
g(1:s) = 9.82;
m(1:s) = 1;
r = 0.5;
A = pi*r^2;
p = 1.2;

h0(1:s) = 0;
hf = linspace(0, 1, s);
theta = linspace(0, 0, s);
phi = linspace(0, 45, s);

T  = (p*A*4*g.*(hf-h0) + m.*g)./(cosd(theta).*cosd(phi))
Tx = sqrt(-abs(T).^2.*cosd(theta).^2.*(1-1./(cosd(theta).^2)))
Ty = abs(T).*cosd(theta).*sind(phi)
Tz = abs(T).*cosd(theta).*cosd(phi)

%ratio = theta/phi;
%Tphi = T/(1 + ratio)
%Ttheta = ratio*Tphi

plot3(Tx, Ty, Tz)

% if theta == 0 && phi == 0
%     T1 = Tz/4
%     T2 = -Tz/4
%     T3 = -Tz/4
%     T4 = Tz/4
% elseif phi == 0
%     if theta > 0 && theta < 90
%         T1 = Tz/4
%         T2 = -Tz/4
%         T3 = -Tz/4
%         T4 = (T - Tz)+(Tz/4)
%     elseif theta < 0 && theta > -90
%         T1 = Tz/4
%         T2 = -Tz/4
%         T3 = -Tz/4
%         T4 = (T - Tz)+(Tz/4)
%     end
% elseif theta == 0
%     if phi > 0 && phi < 90
%         T1 = Tz/4
%         T2 = -(T - Tz)+(Tz/4)
%         T3 = -Tz/4
%         T4 = Tz/4
%     elseif phi < 0 && phi > -90
%         T1 = Tz/4
%         T2 = -(T - Tz)+(Tz/4)
%         T3 = -Tz/4
%         T4 = Tz/4
%     end
% end

