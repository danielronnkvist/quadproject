var copterGeometry = new THREE.BoxGeometry( 1, 0.3, 1 );
var green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var copterBody = new THREE.Mesh( copterGeometry, green );

var m = new THREE.Matrix4();
m.makeRotationX(3.14/2);
copterBody.applyMatrix(m);

var rotorGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.05);

var blue = new THREE.MeshBasicMaterial( { color: 0x6699FF } );
var rotors = [];
for(var i = 0; i < 4; i++)
  rotors[i] = new THREE.Mesh( rotorGeometry, blue ).translateY(0.175);;

rotors[0].translateY(-0.5);

rotors[1].translateX(0.5);

rotors[2].translateY(0.5);

rotors[3].translateX(-0.5);

var copter = new THREE.Object3D();
copter.add( copterBody );
for(var i = 0; i < 4; i++)
  copter.add( rotors[i] );
