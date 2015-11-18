module.exports = function(RED){ 
    var checkPin = require("../../extends/check_pin"); 
    var groveSensor = require("jsupm_loudness");
    function GroveSound(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var key = 'P'+node.analogPin;                                                                    
        if (checkPin.getAnalogPinValue(key)==1){                                                         
            node.status({fill: "red", shape: "dot", text: "pin repeat"});                                
            console.log('Sound sensor analog pin ' + node.analogPin +' repeat');                         
            return;                                                                                      
        }                                                                                                
        else if (checkPin.getAnalogPinValue(key)==0){                                                    
            checkPin.setAnalogPinValue(key, 1);                                                          
            node.status({fill: "blue", shape: "ring", text: "pin check pass"});                          
            console.log('Sound sensor analog pin ' + node.analogPin +' OK');                             
        }                                                                                                
        else{                                                                                            
            node.status({fill: "blue", shape: "ring", text: "Unknown"});                                 
            console.log('unknown pin' + node.analogPin + ' key value' + checkPin.getAnalogPinValue(key));
            return;                                                      
        }  
        var is_on = false;
        var waiting;
        var sound = new groveSensor.Loudness(node.analogPin, 5.0);
	    this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readsoundvalue,node.interval);
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
            checkPin.initAnalogPin();  //init pin
        });
    	function readsoundvalue()
    	{
    		var celSound = sound.loudness();
    		var msg = { payload:celSound };
                node.status({fill: "red", shape: "dot", text: "Sound value is " + celSound});
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("SoundSensor", GroveSound);
}
