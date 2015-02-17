function [ w ] = invTransMatrix(angl)
% matrix used to find angular velocities in the inertial frame from body
% frame
% etadot = inv(W_eta)*nu
  sx = sind(angl(1));

  cx = cosd(angl(1));
  cy = cosd(angl(2));

  ty = tand(angl(2));

  w = [ 1, sx*ty, cx*ty;
        0, cx, -sx;
        0 sx/cy, cx/cy];
end