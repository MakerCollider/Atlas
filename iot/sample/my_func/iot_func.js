var RedUtil = require(__dirname + '/../../lib/red-util.js');

var cnt0 = 0;
var cnt1 = 1;
var d = new Date();

function myFunc(arg0, arg1, cb0, arg2, cb1) {

    //setInterval(function(){

       cb0(d.getTime(), cnt0);
       cnt0++;
       cb1(d.getTime(), cnt1);
       cnt1++; 
    //}, 1000 * 10);

    return arg0 + arg1 + arg2;
}

module.exports = function(RED) {
    console.log('try to load iotFunc');
    
    function iotFunc(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        node.log('started');

        var redUtil = new RedUtil(node, config);

        this.on('input', function(msg) {
                            
                // Ruifen, you can start here                
                if(!redUtil.isValid(msg))
                    return;

                node.log('recv: ' + JSON.stringify(msg));

                var args = msg.iot.params;

                ret = myFunc(args[0], 
                             args[1],
                             redUtil.normalCallbackArg(msg, 2, args[2]),
                             args[3],
                             normalCallbackArg(msg, 4, args[4]));
                
                redUtil.send({
                    'payload': ret,
                    'iot': {
                        'method': msg.iot.method,
                        'return': ret
                    }
                });

                // ruifen you can stop here
            try {
            } catch(e) {
                node.error('!!! error: ' + e);
            }
        });

        this.on('close', function(){
            redUtil.close();          
        });
    }

    RED.nodes.registerType('iot-func', iotFunc);
};
