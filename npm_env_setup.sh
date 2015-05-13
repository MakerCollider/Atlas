#/bin/bash
set -x
cd ../node-red
npm config set registry http://registry.cnpmjs.org
npm install -g node-gyp
echo "configuration node-red ......"
npm install -g grunt-cli
npm install
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
mkdir libs
cd libs
echo "installing opencv"
opkg install opencv-dev
opkg remove opencv-dev --force-removal-of-dependent-packages
opkg install opencv-dev
echo "installing libuv"
wget https://github.com/libuv/libuv/archive/v1.4.2.tar.gz --no-check-certificate
tar -xvf v1.4.2.tar.gz                                                           
cd libuv-1.4.2               
sh autogen.sh                                                         
./configure --prefix=/usr                                                                       
make                                                                                 
make install
cd ../../
rm ./libs -r
cd Atlas
set +x
