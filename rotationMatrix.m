function [ rotMatrix ] = rotationMatrix(rot)
  cx = cosd(rot(1));
  cy = cosd(rot(2));
  cz = cosd(rot(3));
  sx = sind(rot(1));
  sy = sind(rot(2));
  sz = sind(rot(3));


  rotMatrix = [cz*cy, cz*sy*sx-sz*cx, cz*sy*cx+sz+sx; ...
               sz*cy, sz*sy*sx+cz*cx, sz*sy*cx-cz*sx; ...
               -sy, cy*sx, cy*cx;  ];

end