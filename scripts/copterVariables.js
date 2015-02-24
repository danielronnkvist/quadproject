// variables for intertial frame
var positionInertial  = math.matrix([[0],
                                      [0],
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