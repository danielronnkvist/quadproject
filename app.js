var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    redis = require('redis'),
    client = redis.createClient(); // Creates a new client

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);
app.use("/scripts",express.static(__dirname+"/scripts"));

app.get('/', function(req, res){
  client.smembers('copters', function(err, reply){
    console.log(reply)
    res.render('index.ejs', {
      copters: reply
    });
  });
});

client.on('connect', function() {
  client.del('copters', function(err, reply){
    if(err) console.log(err);
    console.log("Succesfully reseted redis set");
  });
    console.log('connected to redis server');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('add copter', function(msg){
    // console.log(msg);
    client.sadd(['copters', JSON.stringify(msg)], function(err, reply){
      if(!err){
        console.log("Added copter to redis");
        socket.emit('add copter', msg);
      }
    });
  });


});
http.listen(app.get('port'), function(){
  console.log("Server running on port %d", app.get('port'));
});
