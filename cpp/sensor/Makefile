RED_DIR=../../../node-red
IO_JS=../../../io-js/utils/autogen/run.py
SENSOR_NODE=../../atlas_nodes/sensor
all: build

build:
	mkdir -p build
	cd build; cmake ..; make
	$(IO_JS) -c config_sensor.py
	cd $(SENSOR_NODE)/addon/;node-gyp rebuild
clean:
	rm -rf build
	rm -rf $(SENSOR_NODE)
.PHONY: all build 
