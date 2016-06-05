var util = require("util");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 443;
var azure = require('azure-storage');
//var blobSvc = azure.createBlobService();


//blobSvc.createBlockBlobFromLocalFile('awkwardcontainer', 'testblob', 'happy.jpg', function(error, result, response){
 // if(!error){
  //   //file uploaded
  //}
//});

http.listen(port, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){	
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('Scripts'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg, username){
    io.emit('chat message', msg, username);
  });


  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

});
