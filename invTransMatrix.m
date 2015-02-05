function [ w ] = invTransMatrix(angl)
% matrix used to find angular velocities in the inertial frame from body
% frame
% etadot = inv(W_eta)*nu
  sx = sin(angl(1));

  cx = cos(angl(1));
  cy = cos(angl(2));

  ty = tan(angl(2));

  w = [ 1, sx*ty, cx*ty;
        0, cx, -sx;
        0 sx/cy, cx/cy];
end