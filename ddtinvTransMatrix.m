function [ w ] = ddtinvTransMatrix(angl)
% matrix used to find angular velocities in the inertial frame from body
% frame
% etadot = inv(W_eta)*nu
  sx = sin(angl(1));

  cx = cos(angl(1));
  cy = cos(angl(2));

  ty = tan(angl(2));

  w = [ 0, angl(1)*cx*ty+angl(2)*sx/(cy)^2, -angl(1)*sx*cy+angl(2)*cx/cy^2;
        0, -angl(1)*sx, -angl(1)*cx;
        0 angl(1)*sx/cy+angl(2)*sx*ty/cy, -angl(1)*sx/cy+angl(2)*cx*ty/cy];
end