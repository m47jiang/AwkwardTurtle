var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){	
  res.sendFile(__dirname + '/index.html');
});

<<<<<<< HEAD
app.get('chatRoom', function(req, res){	
  res.sendFile(__dirname + '/chatRoom.js');
});
=======
app.use(express.static('Scripts'));
>>>>>>> a027063701e419321d6901379692f1f7fe7e68b3

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});