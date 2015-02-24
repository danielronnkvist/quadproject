// variables for intertial frame
// element 0 is x-axis -> right/left on screen
// element 1 is y-axis -> up/down on screen
// element 2 is z-axis -> in/out on screen
var positionInertial  = math.matrix([[0],
                                      [2],
                                      [0]]);

var anglesInertial = math.matrix([[0],
                                   [0],
                                   [0]]);

var angularVelocityInertial = math.matrix([[0],
                                         [0],
                                         [0]]);
var accelerationInertial = math.matrix([[0],
                                         [0],
                                         [0]]);
var velocityInertial = math.matrix([[0],
                                     [0],
                                     [0]]);
// Variables for body frame
var angularVelocity = math.matrix([[0],
                                   [0],
                                   [0]]);
var acceleration = math.matrix([[0],
                                [0],
                                [0]]);
var velocity = math.matrix([[0],
                            [0],
                            [0]]);

var rotorAngularVelocity = math.matrix([[554.65],
                                        [554.65],
                                        [554.65],
                                        [554.65]]);

  // TODO: change the "2", it should be adjustable by the user in flightControl. 
  // Used as: Desired position, get from keys pressed
  var posMat = math.matrix([[0],[2],[0]]);
  // TODO: change "30", it should be adjustable by user
  // Used as: desired angle, get from keys pressed
  var angMat = math.matrix([[0],[0],[0]]);