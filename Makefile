all:
	make -C atlas_hook
	make -C atlas_nodes
	make -C cpp/cv

clean:
	make clean -C atlas_hook
	make clean -C atlas_nodes
	make clean -C cpp/cv
.PHONY: all 
