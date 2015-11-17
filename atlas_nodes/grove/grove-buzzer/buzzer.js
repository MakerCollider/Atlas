module.exports = function(RED){ 
    var checkPin = require("../../extends/check_pin");
    var upmBuzzer = require("jsupm_buzzer");
    function GroveBuzzer(config) {
        RED.nodes.createNode(this, config);
        this.pwmPin = config.pwmPin;
        this.tone = config.tone
        var node = this;
	    node.pwmPin = node.pwmPin>>>0;
        
        var key = 'P'+node.pwmPin;
        if (checkPin.getDigitalPinValue(key)==1){
            node.status({fill: "red", shape: "dot", text: "pin repeat"});
            console.log('Buzzer pwm pin ' + node.pwmPin +' repeat');
            return;
        }
        else if (checkPin.getDigitalPinValue(key)==0){
            checkPin.setDigitalPinValue(key, 1);
            node.status({fill: "blue", shape: "ring", text: "pin check pass"});
            console.log('Buzzer pwm pin ' + node.pwmPin +' OK');
        }
        else{
            node.status({fill: "blue", shape: "ring", text: "Unknown"});
            console.log('unknown pin' + node.pwmPin + ' key value' + checkPin.getDigitalPinValue(key));
            return;
        }

        var myBuzzer = new upmBuzzer.Buzzer(node.pwmPin);
        this.on('input',function(msg) {
            console.log("msg:" + msg.payload);
        	if (msg.payload){
                var msg = { payload:1 };
            	node.send(msg);
            	console.log("tone:" + node.tone);
            	if (node.tone == 1)
                        myBuzzer.playSound(upmBuzzer.DO, 1000000);
            	if (node.tone == 2)
                        myBuzzer.playSound(upmBuzzer.RE, 1000000);
            	if (node.tone == 3)
                        myBuzzer.playSound(upmBuzzer.MI, 1000000);
            	if (node.tone == 4)
                        myBuzzer.playSound(upmBuzzer.FA, 1000000);
            	if (node.tone == 5)
                        myBuzzer.playSound(upmBuzzer.SOL, 1000000);
            	if (node.tone == 6)
                        myBuzzer.playSound(upmBuzzer.LA, 1000000);
            	if (node.tone == 7)
                        myBuzzer.playSound(upmBuzzer.DO, 1000000);
            	if (node.tone > 7 || node.tone < 1)
                        myBuzzer.playSound(upmBuzzer.DO, 1000000);
        	}
            else {
                var msg = { payload:0 };
                node.send(msg);
        	}
        });
        this.on('close', function() {
            checkPin.initDigitalPin();  //init pin
        });
    }
    RED.nodes.registerType("Buzzer", GroveBuzzer);
}
