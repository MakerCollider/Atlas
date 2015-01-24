
var redUtil = function(node, config) {
    this.node = node;
    this.config = config;

    this.node.status({fill:'red', shape:'ring', text:'inactive'});
}

redUtil.prototype.normalCallbackArg = function(msg, idx, arg) {

    var self = this;
    if(typeof arg == 'Function') {
        return arg;
    }

    if(typeof arg == 'String') {
        return eval(arg);
    }
    
    return function() {

        self.send({
        	'iot': {
        		'method': msg.iot.method,
        		'callback': {
        			'idx': idx,
        			'args': Array.prototype.slice.call(arguments)
        		}
        	}
        });
    }; 	
}

redUtil.prototype.checkMethod = function(msg) {

    if(!(msg && msg.iot && msg.iot.method))
        return false;

    var method = msg.iot.method;

    if(method != this.config.method) {
        return false;
    }

    return true;
}

redUtil.prototype.isValid = function(msg) {
    var ret = this.checkMethod(msg);

    if(ret)
        this.node.status({fill:'green', shape:'dot', text:'active'});
    else
        this.node.status({fill:'red', shape:'ring', text:'inactive'});

    return ret;	
}

redUtil.prototype.send = function(msg) {
	this.node.log('send: ' + JSON.stringify(msg));
    this.node.send(msg);	
}

redUtil.prototype.close = function() {

}

module.exports = redUtil;

