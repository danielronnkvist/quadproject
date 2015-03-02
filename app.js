var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    redis = require('redis'),
    client = redis.createClient(); // Creates a new client

var user;

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);
app.use("/scripts",express.static(__dirname+"/scripts"));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/copters', function(req,res){
  client.smembers('copters', function(err, reply){
    console.log(reply);
    var copters = [];
    reply.forEach(function(r){
      copters.push(JSON.parse(r).copter);
    });
    console.log(copters)
    res.send(copters);
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
  socket.emit('user id', socket.id);
  socket.on('disconnect', function(){
    client.smembers('copters', function(err, reply){
      reply.forEach(function(copter, index){
        if(JSON.parse(copter).user == user){
          client.del(['copters', copter], function(err, reply){
            console.log("Removed users copter");
          });
        }
      });
    });
    console.log('user disconnected');
  });

  socket.on('add copter', function(msg){
    console.log(msg)
    client.sadd(['copters', JSON.stringify(msg)], function(err, reply){
      if(!err){
        console.log("Added copter to redis", msg);
        io.emit('add copter', msg.copter);
      }
    });
  });

  /*
    FIX ME
    Shouldn't have to delete the set to update an entry
  */
  socket.on('update copter', function(msg){
    // console.log(msg)
    client.smembers('copters', function(err, reply){
      for(var i = 0; i < reply.length; i++){
      // console.log(JSON.parse(reply[i]))
      //   console.log(reply[i].user, msg.user);
        if(JSON.parse(reply[i]).user == msg.user)
        {
          reply[i] = JSON.stringify(msg);
          break;
        }
      }
      client.del('copters', function(err, reply){
        if(err) console.log(err);
      });
      client.sadd(['copters', reply], function(err, reply){
        client.smembers('copters', function(err, reply){
          for(var i = 0; i < reply.length; i++){
            reply[i] = JSON.parse(reply[i]).copter;
          }
          io.emit('update copter', reply);
        });
      });
    });
  });
});
http.listen(app.get('port'), function(){
  console.log("Server running on port %d", app.get('port'));
});
