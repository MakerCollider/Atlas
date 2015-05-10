cd ../
TAR_NAME=atlas_`date +"%Y_%m_%d"`.tar.gz
tar -cvzf $TAR_NAME node-red Atlas io-js README_DEV.md -X ./Atlas/exclude_file
