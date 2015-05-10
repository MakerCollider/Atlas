#/bin/bash
set -x
cd ../node-red
npm config set registry http://registry.cnpmjs.org
npm install -g node-gyp
echo "configuration node-red ......"
npm install
npm install -g grunt-cli
grunt build
echo "installing bindings ......"
npm install -g bindings
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
cd ../
set +x
