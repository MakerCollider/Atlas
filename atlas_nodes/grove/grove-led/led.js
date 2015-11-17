module.exports = function(RED) {
    var checkPin = require("../../extends/check_pin");
    var groveSensor = require("jsupm_grove");
    function LED(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        var node = this;
        
	   var myinterval=null;

        node.digitalPin = node.digitalPin>>>0;
        
        var key = 'P'+node.digitalPin;
        if (checkPin.getDigitalPinValue(key)==1){
            node.status({fill: "red", shape: "dot", text: "pin repeat"});
            console.log('LED digital pin ' + node.digitalPin +' repeat');
            return;
        }
        else if (checkPin.getDigitalPinValue(key)==0){
            checkPin.setDigitalPinValue(key, 1);
            node.status({fill: "blue", shape: "ring", text: "pin check pass"});
            console.log('LED digital pin ' + node.digitalPin +' OK');
        }
        else{
            node.status({fill: "blue", shape: "ring", text: "Unknown"});
            console.log('unknown pin' + node.digitalPin + ' key value' + checkPin.getDigitalPinValue(key));
            return;
        }

        var led = new groveSensor.GroveLed(node.digitalPin);  
        console.log("Init LED on digital pin "+ node.digitalPin);
		this.on('input', function(msg){
			if (msg.payload==1)
			{
                                console.log("LED ON");
				led.on();
			}			
			else if (msg.payload==0)
			{
                                console.log("LED OFF");
				led.off();
			}
		});	
		
        this.on('close', function() {
            led.off();
            checkPin.initDigitalPin();  //init pin
        });	
   
    }


    RED.nodes.registerType("Led", LED);
}