
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
EXTRA_LIB            = '/usr/local/lib/libopencv_calib3d.dylib /usr/local/lib/libopencv_core.dylib /usr/local/lib/libopencv_features2d.dylib /usr/local/lib/libopencv_flann.dylib /usr/local/lib/libopencv_highgui.dylib /usr/local/lib/libopencv_imgcodecs.dylib /usr/local/lib/libopencv_imgproc.dylib /usr/local/lib/libopencv_ml.dylib /usr/local/lib/libopencv_objdetect.dylib /usr/local/lib/libopencv_photo.dylib /usr/local/lib/libopencv_shape.dylib /usr/local/lib/libopencv_stitching.dylib /usr/local/lib/libopencv_superres.dylib /usr/local/lib/libopencv_ts.a /usr/local/lib/libopencv_video.dylib /usr/local/lib/libopencv_videoio.dylib /usr/local/lib/libopencv_videostab.dylib'

AUTOGEN_TEST = 0

DEBUG = 1
