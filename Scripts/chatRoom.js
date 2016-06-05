
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

var messageData = [
    {
        "currentmessagewordcount":0,
        "previousmessagewordcount":0,
        "timesent":0,
        "typingStart":0,
        "interval":0,
        "question":0,
        "exclimation":0,
        "period":0
    }
];

var socket = io();
var color = prompt("What is your favorite color?");
var userName = '<span ' + 'style="color:' + color +';"'+ '>'+ prompt("Your Nickname:") + ':</span>';
var awkwardDetector = '';
var executedTimer = true;
socket.emit('add user', userName);
$('form').submit(function(){
    socket.emit('chat message', $('#m').val(), userName);
    $('#m').val('');
    return false;
});

$('#m').on('input', function() {
    if(executedTimer)
    {
        messageData[0].typingStart =  new Date().getTime().toString();
        executedTimer = false;
    }
    else{

    }
});

socket.on('chat message', function(msg, username) {
    $.parseHTML(userName);

    for (var i = 0; i < awkwardWords.length; i++) {
        if (msg.toLowerCase() === (awkwardWords[i].keyWord).toLowerCase()) {
            awkwardDetector = "pretty awkward!";
            awkwardWords[i].occurences++;
            break;
        }
        else {
            awkwardDetector = "";
        }
    }

    if(msg.includes("."))
    {
        messageData[0].period++;
    }
    if(msg.includes("?"))
    {
        messageData[0].question++;
    }
    if(msg.includes("!"))
    {
        messageData[0].exclimation++;
    }

    messageData[0].timesent =  new Date().getTime().toString();
    messageData[0].interval =  messageData[0].timesent - messageData[0].typingStart;

    $('#messages').append($('<h3>').html(msg).prepend(username + ' ' + ' ' + awkwardDetector+ " "+ messageData[0].interval));
    $("html, body").animate({scrollTop: $(document).height()}, 10);
    executedTimer = true;
});