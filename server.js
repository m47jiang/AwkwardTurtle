var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var azure = require('azure-storage');
var blobSvc = azure.createBlobService();

process.env['AZURE_STORAGE_ACCOUNT'] = 'awkwardturtle';
process.env['AZURE_STORAGE_ACCESS_KEY'] = 'yHNrhfx3Lsx7MPttOOuqlH5pqWjxdH/ztJP1QF/Nf6aR7bO1E2eDsTXHw1uF5vDj6D2Be0DNDRwVxcGBygK6Dg==';
var AZURE_STORAGE_ACCOUNT = "awkwardturtle";
var AZURE_STORAGE_ACCESS_KEY = "yHNrhfx3Lsx7MPttOOuqlH5pqWjxdH/ztJP1QF/Nf6aR7bO1E2eDsTXHw1uF5vDj6D2Be0DNDRwVxcGBygK6Dg==";

blobSvc.createBlockBlobFromLocalFile('awkwardcontainer', 'testblob', 'happy.jpg', function(error, result, response){
  if(!error){
    // file uploaded
  }
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});