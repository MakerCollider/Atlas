

module.exports = function(RED) {

    function toggle(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        node.log('start toggle');

        var stat = parseInt(config.initVal);

        function setStat(val) {
        	if(!val) 
                node.status({fill: 'green', shape:'dot', text: 'on'});
            else
            	node.status({fill: 'red', shape:'dot', text: 'off'});
        }

        setStat(stat);

        node.on('input', function(msg) {

            console.log('recv: ' + JSON.stringify(msg));

            var val = stat ? 1 : 0;

            node.log('send ' + val);
        	node.send({'payload': val});

        	stat = !stat;

        	setStat(stat);
        });
    }

    RED.nodes.registerType('toggle', toggle);

};
