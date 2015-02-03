var copterGeometry = new THREE.BoxGeometry( 1, 0.3, 1 );
var green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var copterBody = new THREE.Mesh( copterGeometry, green );

var rotorGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.2);
var brown = new THREE.MeshBasicMaterial( { color: 0x30f03f } );
var rotors = [];
for(var i = 0; i < 4; i++)
  rotors[i] = new THREE.Mesh( rotorGeometry, brown ).translateY(0.2);;

rotors[0].translateX(0.5);
rotors[0].translateZ(0.5);

rotors[1].translateX(-0.5);
rotors[1].translateZ(0.5);

rotors[2].translateX(0.5);
rotors[2].translateZ(-0.5);

rotors[3].translateX(-0.5);
rotors[3].translateZ(-0.5);

var copter = new THREE.Object3D();
copter.add( copterBody );
for(var i = 0; i < 4; i++)
  copter.add( rotors[i] );
