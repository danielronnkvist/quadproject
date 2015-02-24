var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);
app.use("/scripts",express.static(__dirname+"/scripts"));

app.get('/', function(req, res){
  res.render('index.ejs');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(app.get('port'));
