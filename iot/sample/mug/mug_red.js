var RedUtil = require(__dirname + '/../../lib/red-util.js');

var IOLIB = require('../../../../device');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var disp_handle = io.mug_disp_init();
var motion_handle = io.mug_motion_init();

var motion_tile_cb = [];
io.mug_motion_angle_on(motion_handle, function() {
    for(idx in motion_tile_cb) {
        motion_tile_cb[idx].apply(this, Array.prototype.slice.call(arguments));
    }
}, 500);

function mug_text(str, color, interval) {
    io.mug_disp_text_marquee_async(disp_handle, str, color, interval, -1);   
}

function mug_tile(cb) {
    motion_tile_cb.push(cb);
    io.mug_run_motion_watcher(motion_handle);
}

module.exports = function(RED) {
    console.log('try to load iotFunc');
    
    function mugText(config) {

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

                var ret = mug_text(args[0], args[1], args[2]);

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

    RED.nodes.registerType('mug-text', mugText);

    console.log('registered mug-text');

    function mugTile(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        node.log('started');

        var redUtil = new RedUtil(node, config);

        mug_tile(redUtil.normalCallbackArg({'iot': {'method': config.method}}, 0, null));

        this.on('close', function(){
            redUtil.close();    
            motion_tile_cb = [];  
        });
    }

    RED.nodes.registerType('mug-tile', mugTile);

};

