/**
 * Copyright 2015, 2015 MakerCollider.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {

    var mraa = require('mraa');

    function edisonSerial(config) {
        this.log("Edison serial initalizing.......");
        RED.nodes.createNode(this, config);

        this.serialport = config.serialport;
        this.serialbaud = parseInt(config.serialbaud);
        this.databits = parseInt(config.databits);
        this.parity = config.parity;
        this.stopbits = parseInt(config.stopbits);

        this.log("Port : " + config.serialport);
        this.log("Baud : " + this.serialbaud);
        this.log("Databits : " + this.databits);
        this.log("Parity : " + this.parity);
        this.log("Stopbits : " + this.stopbits);

	var serial = new mraa.Uart(0);
        //var serial = new mraa.Uart(this.serialport);
        serial.setBaudRate(this.serialbaud);
        serial.setMode(this.databits, this.parity, this.stopbits);

        this.log("Port : " + this.serialport);
        this.log("Baud : " + this.serialbaud);
        this.log("Databits : " + this.databits);
        this.log("Parity : " + this.parity);
        this.log("Stopbits : " + this.stopbits);
        this.log("Serial prepared.");
        this.status({fill:"blue",shape:"dot",text:"Initalized"});

        //Handle inputs
        this.on('input', function(msg) {
            this.status({fill:"blue",shape:"dot",text:"Sending"});

            serial.writeStr(msg.payload);

            this.status({fill:"green",shape:"dot",text:"OK"});
            this.log("Send Message: " + msg.payload);
        });

        this.on('close', function() {
	    delete serial;
            this.log("Stop Serial");
        });
    }
    RED.nodes.registerType("edisonSerial", edisonSerial);
}
