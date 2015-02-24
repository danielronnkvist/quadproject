var Copter = function(){
  this.copterGeometry = new THREE.BoxGeometry( 1, 0.3, 1 );
  this.green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  this.copterBody = new THREE.Mesh( this.copterGeometry, this.green );

  this.rotorGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.05);
  this.blue = new THREE.MeshBasicMaterial( { color: 0x6699FF } );
  this.rotors = [];
  for(var i = 0; i < 4; i++)
    this.rotors[i] = new THREE.Mesh( this.rotorGeometry, this.blue ).translateY(0.175);;

  this.rotors[0].translateZ(-0.5);

  this.rotors[1].translateX(0.5);

  this.rotors[2].translateZ(0.5);

  this.rotors[3].translateX(-0.5);

  this.object = new THREE.Object3D();
  this.object.add( this.copterBody );
  for(var i = 0; i < 4; i++)
    this.object.add( this.rotors[i] );

  /*COPTER VARIABLES*/

  // variables for intertial frame
  // element 0 is x-axis -> right/left on screen
  // element 1 is y-axis -> up/down on screen
  // element 2 is z-axis -> in/out on screen
  this.positionInertial  = math.matrix([[0],
                                        [2],
                                        [0]]);

  this.anglesInertial = math.matrix([[0],
                                     [0],
                                     [0]]);

  this.angularVelocityInertial = math.matrix([[0],
                                              [0],
                                              [0]]);
  this.accelerationInertial = math.matrix([[0],
                                           [0],
                                           [0]]);
  this.velocityInertial = math.matrix([[0],
                                       [0],
                                       [0]]);
  // Variables for body frame
  this.angularVelocity = math.matrix([[0],
                                      [0],
                                      [0]]);
  this.acceleration = math.matrix([[0],
                                   [0],
                                   [0]]);
  this.velocity = math.matrix([[0],
                               [0],
                               [0]]);

  this.rotorAngularVelocity = math.matrix([[554.65],
                                           [554.65],
                                           [554.65],
                                           [554.65]]);

  // TODO: change the "2", it should be adjustable by the user in flightControl.
  // Used as: Desired position, get from keys pressed
  this.posMat = math.matrix([[0],[2],[0]]);
  // TODO: change "30", it should be adjustable by user
  // Used as: desired angle, get from keys pressed
  this.angMat = math.matrix([[0],[0],[0]]);
}

Copter.prototype.update = function(delta){
  var pos = this.newPos(delta);

  this.object.position.x = (pos[0]);
  this.object.position.y = (pos[1]);
  this.object.position.z = (pos[2]);

  this.object.rotation.x = pos[3];
  this.object.rotation.y = pos[4];
  this.object.rotation.z = pos[5];

  return pos;
}
