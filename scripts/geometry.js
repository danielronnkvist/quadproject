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

  // Controls
  this.controls = new FlightControl(this);

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
  this.controls.update(delta);
  this.rotorAngularVelocity = math.matrix([[Math.sqrt(this.controls.rotors.r1)*this.controls.hover],
                                           [Math.sqrt(this.controls.rotors.r2)*this.controls.hover],
                                           [Math.sqrt(this.controls.rotors.r3)*this.controls.hover],
                                           [Math.sqrt(this.controls.rotors.r4)*this.controls.hover]]);
  var pos = this.newPos(delta);
  var temp = {};
  temp.position = {};
  temp.rotation = {};

  temp.position.x = pos[0];
  temp.position.y = pos[1];
  temp.position.z = pos[2];

  temp.rotation.x = pos[3];
  temp.rotation.y = pos[4];
  temp.rotation.z = pos[5];

  return temp;
}

Copter.prototype.getPosition = function(){
  return {
    position: {
      x: this.object.position.x,
      y: this.object.position.y,
      z: this.object.position.z
    },
    rotation: {
      x: this.object.rotation.x,
      y: this.object.rotation.y,
      z: this.object.rotation.z
    }
  }
}

Copter.prototype.setPosition = function(data){
  this.object.position.x = data.position.x;
  this.object.position.y = data.position.y;
  this.object.position.z = data.position.z;

  this.object.rotation.x = data.rotation.x;
  this.object.rotation.y = data.rotation.y;
  this.object.rotation.z = data.rotation.z;
}
