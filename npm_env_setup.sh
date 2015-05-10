#/bin/bash
cd ../node-red
npm config set registry http://registry.cnpmjs.org
echo "configuration node-red ......"
npm install
echo "installing bindings ......"
npm install bindings
echo "installing node-gyp ......"
npm install node-gyp
echo "installing debug ......"
npm install debug
echo "installing express ......"
npm install express
echo "installing socket.io ......"
npm install socket.io
echo "installing serve-favicon ......"
npm install serve-favicon
echo "installing morgan ......"
npm install morgan
echo "installing cookie-parser ......"
npm install cookie-parser
echo "installing body-parser ......"
npm install body-parser
cd ../
