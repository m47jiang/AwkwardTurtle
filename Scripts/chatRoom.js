
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
        messageData[0].typingStart =  new Date().getTime();
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

    messageData2.Inputs.input1.Values[0][0] = (msg.split(" ").length).toString();

    if(msg.includes("."))
    {
        messageData[0].period++;
        (messageData2.Inputs.input1.Values[0][7]++).toString();

    }
    if(msg.includes("?"))
    {
        messageData[0].question++;
        (messageData2.Inputs.input1.Values[0][4]++).toString();
    }
    if(msg.includes("!"))
    {
        messageData[0].exclimation++;
        (messageData2.Inputs.input1.Values[0][5]++).toString();
    }
    messageData2.Inputs.input1.Values[0][9] = messagesSent.toString();
    messageData[0].timesent =  new Date().getTime().toString();
    messageData2.Inputs.input1.Values[0][3] =  (new Date().getTime()-messageData[0].typingStart).toString();
    messageData2.Inputs.input1.Values[0][2] =  (messageData[0].timesent - messageData[0].typingStart).toString();

    $('#messages').append($('<h3>').html(msg).prepend(username + ' ' + ' '));

    $("html, body").animate({scrollTop: $(document).height()}, 10);
    executedTimer = true;
    messagesSent++;

    /*$.ajax({
        type: "POST",
        url: 'https://ussouthcentral.services.azureml.net/workspaces/fd241c11b0734e87b79a7df5a11b6639/services/909a3822fcf440d0b026b0b333ea21ca/execute?api-version=2.0&details=true',
        /*beforeSend: function (request)
        {
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer WMy+cO/0vNMJKOVXui9OYnhyysmPt8EG1SXF3rvLYt6eZUvxVX+i+O/3h0EIL9YLGEvgFP8uCJYxdECCo/VRIg==');
        },
        headers: {
            'Content-Type' :  'application/json;charset=utf-8',
            'Authorization' : 'Bearer WMy+cO/0vNMJKOVXui9OYnhyysmPt8EG1SXF3rvLYt6eZUvxVX+i+O/3h0EIL9YLGEvgFP8uCJYxdECCo/VRIg=='
        },
        data: messageData2,//JSON.stringify(messageData2),
        //dataType: 'application/json',
        //processData: false,
        success: function(data) {
            //$('#results').append('The result =' + StringifyPretty(msg));
            alert('sent');
        },
        error: function(msg){
            alert('error: ' + msg.status + ' ' + msg.responseText);
        }
    });
*/
    console.log(JSON.stringify(messageData2));
    var url= "https://ussouthcentral.services.azureml.net/workspaces/fd241c11b0734e87b79a7df5a11b6639/services/909a3822fcf440d0b026b0b333ea21ca/execute?api-version=2.0&details=true";

    $.ajax({
        url: url,
        method: "POST",
        contentType: 'application/json',
        processData: false,
        crossDomain: true,
        headers: {
            "Authorization": "Bearer WMy+cO/0vNMJKOVXui9OYnhyysmPt8EG1SXF3rvLYt6eZUvxVX+i+O/3h0EIL9YLGEvgFP8uCJYxdECCo/VRIg=="
        },
        data: JSON.stringify(messageData2),
        done: function(res){
            console.log(res);
        }
    });
});