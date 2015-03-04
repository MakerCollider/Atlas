#!/usr/bin/env node

var debug = require('debug')('iot-server');
var app = require('../../app');

var parseJSON = function(input) {
        var rpc;
      
        if(typeof(input) == "string") {
            rpc = JSON.parse(input);
        } else {
            rpc = input;
        }

        if(rpc && rpc.params) {
            var params = rpc.params;
            if(typeof params == 'string') {
                rpc.params = JSON.parse(params)
            }
        }

        return rpc;

    try {

    } catch(e) {
        return undefined;
    }
};

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {            
    console.log('Express server listening on port ' + server.address().port);
});

var recvEvent = {};
var outputMap = {};

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('a client connected');
    for(idx in recvEvent) {
        console.log('register ' + idx);
        socket.on(idx, recvEvent[idx]);
    }
});

module.exports = function(RED) {

    function remoteIotInput(config) {
 
        RED.nodes.createNode(this, config);
        var node = this;

        recvEvent['iot-input'] = function(data) {

            node.log('recv: ' + JSON.stringify(data));
            var rpcObj = parseJSON(data);
    
            var msg = {
                //'payload': data,
                'iot': rpcObj               
            };

            if(rpcObj) {
                node.log('msg: ' + JSON.stringify(msg));
                node.send(msg);
            } else {
                node.log('ignore illegal data: ' + JSON.stringify(data));
            }
        };    

        this.on('close', function() {
            delete recvEvent['iot-input'];
        });

    };

    RED.nodes.registerType("iot-input", remoteIotInput);

    function remoteIotOutput(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        
        console.log('config: ' + JSON.stringify(config));
        
        recvEvent['iot-output'] = function(data) {
            node.log('recv: ' + JSON.stringify(data));
            var rpcObj = parseJSON(data);

            if(rpcObj && rpcObj['method'] && outputMap[rpcObj.method]) {
                var cache = outputMap[rpcObj.method];
                if(cache.length > 0) {
                    node.log('emit for ' + rpcObj.method + ": " + JSON.stringify(cache[0]));
                    this.emit('iot-output', cache[0]);
                    cache.shift();
                }
            } else {
                node.log('illegal query: ' + JSON.stringify(data));
            }

        }

        this.on('input', function(msg) {

            node.log('recv: ' + JSON.stringify(msg));
            var rpc = msg['iot'];
            if(rpc == undefined 
               || rpc['method'] == undefined)  {
                node.log('invalid msg: ' + JSON.stringify(msg));
                return;
            }

            if(outputMap[rpc.method] == undefined) {
                outputMap[rpc.method] = [];
            }

            var cache = outputMap[rpc.method];

            if(cache.length > (config.cacheSize - 1)) {
                cache.splice(0, cache.length - config.cacheSize + 1);
                node.log('cache overflow');
            }
            node.log('before ' + JSON.stringify(outputMap));
            cache.push(rpc);

            node.log('outputMap: ' + JSON.stringify(outputMap));
        });

        this.on('close', function() {
            delete recvEvent['iot-output'];
            outputMap = {};
        });
    };

    RED.nodes.registerType("iot-output", remoteIotOutput);

    function iotTunnel(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.log('tunnel config: ' + JSON.stringify(config));

        this.on('input', function(msg) {

            if(msg['iot'] != undefined) {
                if(config.choose == 'return') {
                    msg.payload = mpayloadsg['iot']['return'];
                } else {
                    msg.payload = msg['callback'][config.callbackId][config.callbackArgId];
                }
            } else {
                msg['iot'] = {
                    'method': config.name,
                    'return': msg.payload
                }
            }
            node.send(msg);
        })
    };

    RED.nodes.registerType("iot-tunnel", iotTunnel);
};

