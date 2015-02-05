function [ w ] = transMatrix(angl)
% matrix used to find angular velocities in the body frame from intertial
% nu = W_eta*etadot
  sx = sind(angl(1));
  sy = sind(angl(2));

  cx = cosd(angl(1));
  cy = cosd(angl(2));

  w = [ 1, 0, -sy;
        0, cx, cy*sx;
        0 -sx, cy*cx];
end