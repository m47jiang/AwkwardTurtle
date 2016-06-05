
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

var messageData2 = {
    "Inputs": {
        "input1": {
            "ColumnNames": [
                "currentmessagewordcount",
                "previousmessagewordcount",
                "interval",
                "timetotype",
                "questionmark",
                "exclamationmark",
                "ellipses",
                "period",
                "keyword",
                "convolength",
                "awkwardness"
            ],
            "Values": [
                [
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0"
                ],
                [
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0"
                ]
            ]
        }
    },
    "GlobalParameters": {}
};

var socket = io();
var color = prompt("What is your favorite color?");
var userName = '<span ' + 'style="color:' + color +';"'+ '>'+ prompt("Your Nickname:") + ':</span>';
var awkwardDetector = '';
var executedTimer = true;
var messagesSent = 0;
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

    messageData2.Inputs.input1.Values[0][0] = msg.split(" ").length;

    if(msg.includes("."))
    {
        messageData[0].period++;
        messageData2.Inputs.input1.Values[0][7]++;

    }
    if(msg.includes("?"))
    {
        messageData[0].question++;
        messageData2.Inputs.input1.Values[0][4]++;
    }
    if(msg.includes("!"))
    {
        messageData[0].exclimation++;
        messageData2.Inputs.input1.Values[0][5]++;
    }
    messageData2.Inputs.input1.Values[0][9] = messagesSent;
    messageData[0].timesent =  new Date().getTime().toString();
    messageData2.Inputs.input1.Values[0][3] =  messageData[0].typingStart;
    messageData2.Inputs.input1.Values[0][2] =  messageData[0].timesent - messageData[0].typingStart;

    $('#messages').append($('<h3>').html(msg).prepend(username + ' ' + ' '));
    $("html, body").animate({scrollTop: $(document).height()}, 10);
    executedTimer = true;
    messagesSent++;
});