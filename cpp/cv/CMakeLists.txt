cmake_minimum_required(VERSION 2.8)
project( face_detection )
#find_package( OpenCV REQUIRED )
#message(STATUS "INC ${OpenCV_INCLUDE_DIRS} OK")

#find_package(PkgConfig)
#pkg_check_modules(LIBUV REQUIRED libuv)
#message(STATUS " ${LIBUV_LIBRARY_DIRS} OK")

SET(OPENCV_INC /usr/include)
SET(OPENCV_LIB /usr/lib)
SET(UV_INC /usr/local/include)
SET(UV_LIB /usr/local/lib)

set(Root "${CMAKE_CURRENT_SOURCE_DIR}")
set(Base64 ${Root}/lib/libb64/src)     
                                       
include_directories(${OPENCV_INC})
include_directories(${Root})      
include_directories(${Root}/lib/libb64/include)
include_directories(${UV_INC})                 
                                               
link_directories(${UV_LIB}) 

add_library(atlas_cv STATIC 
            cv_atlas.cpp
            cv_atlas.h
            cv_tool.h
            cv_tool.cpp 
            ${Base64}/cencode.c)

set_target_properties(
  atlas_cv
  PROPERTIES
  ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")
