module.exports = function(RED) {
    var checkPin = require("../../extends/check_pin");            
    var groveSensor = require("jsupm_grovemoisture");
    function GroveMoisture(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var key = 'P'+node.analogPin;                                                                    
        if (checkPin.getAnalogPinValue(key)==1){                                                         
            node.status({fill: "red", shape: "dot", text: "pin repeat"});                                
            console.log('Moisture sensor analog pin ' + node.analogPin +' repeat');                         
            return;                                                                                      
        }                                                                                                
        else if (checkPin.getAnalogPinValue(key)==0){                                                    
            checkPin.setAnalogPinValue(key, 1);                                                          
            node.status({fill: "blue", shape: "ring", text: "pin check pass"});                          
            console.log('Moisture sensor analog pin ' + node.analogPin +' OK');                             
        }                                                                                                
        else{                                                                                            
            node.status({fill: "blue", shape: "ring", text: "Unknown"});                                 
            console.log('unknown pin' + node.analogPin + ' key value' + checkPin.getAnalogPinValue(key));
            return;                                                      
        }    
        var moisture = new groveSensor.GroveMoisture(node.analogPin); 
        var waiting;  
        this.on('input', function(msg){
            if (msg.payload==1)
            {
                waiting = setInterval(readmoisturevalue,node.interval);
            }           
            else if (msg.payload==0)
            {
                clearInterval(waiting);
                node.status({fill: "green", shape: "ring", text: "turn off"});
            }
        });               

        this.on('close', function() {
            clearInterval(waiting);
            node.status({fill: "green", shape: "ring", text: "turn off"});
            checkPin.initAnalogPin();  //init pin  
        });	

	function readmoisturevalue()
	{
		var celMoisture = moisture.value();
		var msg={payload:celMoisture};
        node.status({fill: "green", shape: "dot", text: "Get Moisture value: " + celMoisture});
		node.send(msg);
	}
    }
    RED.nodes.registerType("Moisture", GroveMoisture);
}
