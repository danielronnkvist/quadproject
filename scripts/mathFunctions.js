function validateDimensions(a, b){
  var ax = a.length;
  var ay = a[0].length;

  var bx = b.length;
  var by = b[0].length;

  if(ax != bx || ay != by)
    return true; // Dimensions do not agree

  return false;
}
/*
  CROSS
  Compute the cross product
*/
function cross(a, b){
  if(validateDimensions(a,b))
    return; // Dimensions do not agree

  return math.matrix([[a[1]*b[2]-a[2]*b[1]],
                      [a[2]*b[0]-a[0]*b[2]],
                      [a[0]*b[1]-a[2]*b[0]]]);
}

/*
  TRANSP
*/
function transp(a){
  var ax = a[0].length;
  var ay = a.length;

  var b = [];
  for(var x = 0; x < ax; x++){
    var temp = [];
    for(var y = 0; y < ay; y++){
      temp.push(a[y][x])
    }
    b.push(temp);
  }

  return math.matrix(b);
}

/*
  Addition of matrices
*/
function matrixAdd(a, b){
  if(validateDimensions(a,b))
    return; // Dimensions do not agree

  var ax = a[0].length;
  var ay = a.length;

  var b = [];
  for(var y = 0; y < ay; y++){
    var temp = [];
    for(var x = 0; x < ax; x++){
      temp.push(a[y][x] + b[y][x]);
    }
    b.push(temp);
  }

  return math.matrix(b);
}

/*
  Subtraction of matrices
*/
function matrixSub(a, b){
  if(validateDimensions(a,b))
    return; // Dimensions do not agree

  var ax = a[0].length;
  var ay = a.length;

  var b = [];
  for(var y = 0; y < ay; y++){
    var temp = [];
    for(var x = 0; x < ax; x++){
      temp.push(a[y][x] - b[y][x]);
    }
    b.push(temp);
  }

  return math.matrix(b);
}

/*
  Multiply a constant with a matrix

  c is a constant
  a is a matrix
*/
function dotMultiply(a, c){
  for (var i = a.length - 1; i >= 0; i--) {
    for (var j = a[0].length - 1; j >= 0; j--) {
      a[i][j] = c*a[i][j];
    };
  };

  return math.matrix(a);
}
