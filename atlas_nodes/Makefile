RED_DIR=../../node-red
TARGET=$(RED_DIR)/nodes/atlas_nodes
all: install

install:
	ln -sf `pwd` $(TARGET)
clean:
	rm -f $(TARGET)
	
.PHONY: all install clean
