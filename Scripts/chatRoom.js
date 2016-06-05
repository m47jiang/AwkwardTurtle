alert("Front-End Script Check");
var socket = io();
var color = prompt("Color");
var userName = '<span ' + 'style="color:' + color +';"'+ '>'+ prompt("Your Nickname:") + ':' +'</span>';
socket.emit('add user', userName);
$('form').submit(function(){
	socket.emit('chat message', $('#m').val(), userName);
	$('#m').val('');
	return false;
});
socket.on('chat message', function(msg, username){
	$.parseHTML(userName);
	$('#messages').append($('<li>').html(msg).prepend(username+' '));
});