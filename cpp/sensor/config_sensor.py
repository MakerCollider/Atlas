import os

INPUT_DIR = './'
INPUT_DECL_PATHS  = [
   INPUT_DIR + "/sensor.h"
]

INPUT_LIB_PATH = INPUT_DIR + '/bin/libsensor.a'

ATLAS_PATH           = '../..'
NODERED_PATH         = ATLAS_PATH + '/atlas_nodes/sensor' 
INSTALL_DIR          = NODERED_PATH + '/addon'
EXTRA_LIB            = '/usr/lib/libmraa.so'

AUTOGEN_TEST = 0

DEBUG = 1

