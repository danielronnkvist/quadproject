function [ rotMatrix ] = rotationMatrix(rot)
  cx = cos(rot(1));
  cy = cos(rot(2));
  cz = cos(rot(3));
  sx = sin(rot(1));
  sy = sin(rot(2));
  sz = sin(rot(3));


  rotMatrix = [cz*cy, cz*sy*sx-sz*cx, cz*sy*cx+sz+sx; ...
               sz*cy, sz*sy*sx+cz*cx, sz*sy*cx-cz*sx; ...
               -sy, cy*sx, cy*cx;  ];

end