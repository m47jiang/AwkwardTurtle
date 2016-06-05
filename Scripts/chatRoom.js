var awkwardWords = [{
    "keyWord":"ok",
    "occurences":"0"
},
    {
        "keyWord":"k",
        "occurences":"0"
    },
    {
        "keyWord":"...",
        "occurences":"0"
    },
    {
        "keyWord":"?",
        "occurences":"0"
    },
    {
        "keyWord":"ummm",
        "occurences":"0"
    },
    {
        "keyWord":"ok",
        "occurences":"0"
    },
    {
        "keyWord":"nice",
        "occurences":"0"
    },
    {
        "keyWord":"i see",
        "occurences":"0"
    },
    {
        "keyWord":"",
        "occurences":"0"
    }
];

var socket = io();
var color = prompt("Color");
var userName = '<span ' + 'style="color:' + color +';"'+ '>'+ prompt("Your Nickname:") + ':' +'</span>';
var awkwardDetector = '';
socket.emit('add user', userName);
$('form').submit(function(){
    socket.emit('chat message', $('#m').val(), userName);
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg, username){
    $.parseHTML(userName);

    for(var i=0; i<awkwardWords.length; i++)
    {
        if( msg.toLowerCase()===(awkwardWords[i].keyWord).toLowerCase())
        {
            awkwardDetector = "pretty awkward!";
            awkwardWords[i].occurences++;
            break;
        }
        else
        {
            awkwardDetector="";
        }
    }
    $('#messages').append($('<h3>').html(msg).prepend(username+' '+ ' '+ awkwardDetector));
    $("html, body").animate({ scrollTop: $(document).height() }, 10);
});