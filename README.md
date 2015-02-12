# Mobile First IOT Programming Platform

## Introduction

A unified IOT programming platform for native device, wiring programming and mobile control. Currently its target hardware is Intel Edison. 

## Installation

Get and install node-red by following http://nodered.org/docs/getting-started/installation.html

Get and setup our framework

```bash
npm install
```

Plug it into node-red.

```bash
cd node-red/nodes
ln -sf ../node-server .
```

## Run

Start node-red service

``` bash
cd node-red
node red.js
```

Open node-red web service likes http://localhost:1880 with chrome browser. The new iot service nodes' prefix is iot-*** and smart mug' nodes start with mug-***. 

Test the mobile client sample under iot-server/iot/test/html/

Test the nodes js client sample under iot-server/iot/test/nodejs

## Details

### Data structure

Attached new object "iot" to node-red's message, it is the extension of JSON RPC.

Send params and run a function. You can send below message to iot nodes in node-red.
 
```javascript
{
  "iot" : {
    "method": "mugText",
    "params": ["hi", "red", 100]
  }
}
```

If the function has return value, the iot-node will send below message to downstream nodes.

```javascript
{
  "iot": {
    "method": "myAdd",
    "return": 10
  }
}
```

If the function's params are callback, then when any callback is called below message will be sent to downstream nodes. A "callback" object is added. The "index" is the callback's index in function's params, "args" is the arguments of callback.

```javascript
{
  "iot": {
    "method": "mugTile",
    "callback": {
      "index": 0
      "args": [1, 1, -90]
    }
  }
}
```

## Contacts

Honggang Li: 2315872416@qq.com
Zhanglin Liu: way_lzl@sina.com
Ruifen Shen:  shenrfen@qq.com
 
