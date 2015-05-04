RED_DIR=../../node-red
PATCH_CMD="require('./atlas_hook').hook(app, server, express);"

all: install

install:
	cp $(RED_DIR)/red.js $(RED_DIR)/red_bak.js
	echo $(PATCH_CMD) >> $(RED_DIR)/red.js

clean:
	cp $(RED_DIR)/red_bak.js $(RED_DIR)/red.js
	
.PHONY: all install clean
