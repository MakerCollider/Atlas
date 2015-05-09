import os

INPUT_DIR = './'
INPUT_DECL_PATHS  = [
   INPUT_DIR + "/cv_atlas.h",
   INPUT_DIR + "/cv_tool.h"
]

INPUT_LIB_PATH = INPUT_DIR + '/bin/libatlas_cv.a'

ATLAS_PATH           = '../..'
NODERED_PATH         = ATLAS_PATH + '/atlas_nodes/cv' 
INSTALL_DIR          = NODERED_PATH + '/addon'
EXTRA_LIB            = '/usr/lib/libopencv_calib3d.so /usr/lib/libopencv_core.so /usr/lib/libopencv_features2d.so /usr/lib/libopencv_flann.so /usr/lib/libopencv_highgui.so /usr/lib/libopencv_imgproc.so /usr/lib/libopencv_ml.so /usr/lib/libopencv_objdetect.so /usr/lib/libopencv_photo.so /usr/lib/libopencv_stitching.so /usr/lib/libopencv_superres.so /usr/lib/libopencv_video.so /usr/lib/libopencv_videostab.so'

AUTOGEN_TEST = 0

DEBUG = 1

