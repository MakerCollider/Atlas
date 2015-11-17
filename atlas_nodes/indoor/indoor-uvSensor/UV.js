module.exports = function(RED) {
    var groveSensor = require("jsupm_guvas12d");
    function GroveUV(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var uv = new groveSensor.GUVAS12D(node.analogPin); 
        var g_GUVAS12D_AREF=5.0;
        var g_SAMPLES_PER_QUERY=1024;          
        var waiting;  
        this.on('input', function(msg){
            if (msg.payload==1)
            {
                waiting = setInterval(readuvvalue,node.interval);
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
        }); 

	function readuvvalue()
	{
		var celUV = uv.value(g_GUVAS12D_AREF,g_SAMPLES_PER_QUERY);
		var msg = { payload:celUV };
        node.status({fill: "green", shape: "dot", text: "Get UV value: " + celUV});
		node.send(msg);
	}
    }
    RED.nodes.registerType("UV", GroveUV);
}
