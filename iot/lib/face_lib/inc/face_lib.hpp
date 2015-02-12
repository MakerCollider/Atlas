#ifndef PRINT_TEST_H
#define PRINT_TEST_H

#include <stdio.h>
#include <string.h>
#include <unistd.h>

#define FACE_LIB_ERRNO_NO_CAM   -1
#define FACE_LIB_ERRNO_NO_FILE  -2
#define FACE_LIB_ERRNO_NO_FACE  -3


int FL_face_detect(int detectTimes);


#endif
