# Face Detection with libuv

## Prebuild

* install cmake
* install opencv

## Build

* Build library
```shell
mkdir build
cd build
cmake ..
make
```

* Build test
```shell
cd test
mkdir build
cd build
cmake ..
make
```

* Build node-red node. Firstly you should build library. Because io-js for node-red is not ready, you need to use prepared node-red files after node addon is built.

```shell
../io-js/utils/autogen/run.py -c config_mac.py
cd ../Atlas/iot/sample/face_detection/addon
node-gyp rebuild
# use prepared node-red files
cd ..
rm *_GEN*
cp ../../../../face_detection/red/* .
```

