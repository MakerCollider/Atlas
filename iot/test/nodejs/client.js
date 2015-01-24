var io = require('socket.io-client'),
socket = io.connect('http://localhost:3000');

var myCall = {
    //'method' : 'myFunc___',
    'method' : 'myFunc',
    'params' : [1, 2, null, 3, null]
};

var myQuery = {
  'method' : 'myFunc'
};
 
socket.on('connect', function () { 

  console.log("socket connected"); 

  socket.emit('iot-input', myCall);
  
  socket.on('iot-output', function(data) {
    console.log(JSON.stringify(data));
    console.log('return ' + data['return']);
   
    setTimeout(function() {
      socket.emit('iot-output', myQuery); 
    }, 2000);
  }); 
  socket.emit('iot-output',  myQuery);
});
