RED_DIR=../../node-red
PATCH_CMD="require('../Atlas/atlas_hook').hook(app, server, express);"

all: install

install:
	./patch.sh $(RED_DIR)/red.js
clean:
#	"TODO: clean $(RED_DIR)/red.js"	
.PHONY: all install clean
