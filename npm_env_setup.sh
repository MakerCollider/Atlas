#/bin/bash

cd ~/
echo "installing node-red ......"
npm install node-red
cd ./node_modules/node-red
echo "configurating node-red ......"
npm install
echo "installing bindings ......"
npm install -g bindings
echo "installing node-gyp ......"
npm install -g node-gyp
echo "installing debug ......"
npm install -g debug
echo "installing express ......"
npm install -g express
echo "installing socket.io ......"
npm install -g socket.io
echo "installing serve-favicon ......"
npm install -g serve-favicon
echo "installing morgan ......"
npm install -g morgan
echo "installing cookie-parser ......"
npm install -g cookie-parser
echo "installing body-parser ......"
npm install -g body-parser
echo "move node-red to root ......"
cd ~/
mv ./node_modules/node-red ./
cd ./Atlas
