# Atlas: A Mobile First Proramming Framework

## Requirement

* Ubuntu/Yocto/MacOS
* cmake
* gmake
* nodejs (with node-gyp installed)
* opencv > 3.0 beta

## Setup

``` shell
git clone https://github.com/ilc-opensource/io-js
cd io-js
git checkout nodered
cd ..

git clone https://github.com/MakerCollider/Atlas.git
cd Atlas
git checkout Atlas_edison
./npm_env_setup.sh     //it will take a long time
make
```

