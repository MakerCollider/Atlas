cd ..
TAR_NAME=atlas_`date +"%Y_%m_%d"`.tgz
tar -czvf $TAR_NAME --exclude=flows_* --exclude=.git --exclude=.DS_Store node-red Atlas
