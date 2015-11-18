module.exports = function(RED){ 
    var checkPin = require("../../extends/check_pin");
    var grove_motion = require('jsupm_biss0001');
    function GroveMotion(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        this.interval = config.interval;
        var node = this;
        node.digitalPin = node.digitalPin>>>0;
        var key = 'P'+node.digitalPin;
        if (checkPin.getDigitalPinValue(key)==1){
            node.status({fill: "red", shape: "dot", text: "pin repeat"});
            console.log('Motion sensor digital pin ' + node.digitalPin +' repeat');
            return;
        }
        else if (checkPin.getDigitalPinValue(key)==0){
            checkPin.setDigitalPinValue(key, 1);
            node.status({fill: "blue", shape: "ring", text: "pin check pass"});
            console.log('Motion sensor digital pin ' + node.digitalPin +' OK');
        }
        else{
            node.status({fill: "blue", shape: "ring", text: "Unknown"});
            console.log('unknown pin' + node.digitalPin + ' key value' + checkPin.getDigitalPinValue(key));
            return;
        }
	var waiting;
        var is_on = false;
    	var myMotionObj = new grove_motion.BISS0001(node.digitalPin);
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readMotionValue,node.interval);
                }
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    node.status({fill: "red", shape: "ring", text: "no signal"});
                    clearInterval(waiting);
                }
            }
        });
        this.on('close', function() {
            clearInterval(waiting);
            checkPin.initDigitalPin();  //init pin
        });
    	function readMotionValue()
    	{
    		var motionValue = myMotionObj.value();
                node.status({fill: "red", shape: "dot", text: "Motion value is " + motionValue});
    		var msg = { payload:motionValue };
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("MotionSensor", GroveMotion);
}
