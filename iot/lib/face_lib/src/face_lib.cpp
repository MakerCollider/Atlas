#include <iostream>
#include <stdlib.h>
#include <signal.h>
#include "opencv2/opencv.hpp"
#include "face_lib.hpp"

using namespace std;
using namespace cv;

VideoCapture cap;
Mat frame, frame_gray;
CascadeClassifier face_cascade;
string face_cascade_name = "haarcascade_frontalface_alt.xml";

void FL_release_all(int sig)
{
	cout << "exit....." << endl;
	cap.release();
	frame.release();
	frame_gray.release();
    return;
}

int FL_face_detect(int detectTimes)
{
	//开启摄像头
	cap.open(0);

	if(!cap.isOpened())
	{
		cout << "can not find camera!";
		return FACE_LIB_ERRNO_NO_CAM;
	}

	//设置图像的长宽，降低图像大小，加快运算
	cap.set(CV_CAP_PROP_FRAME_WIDTH,160);
	cap.set(CV_CAP_PROP_FRAME_HEIGHT,120);

	double width = cap.get(CV_CAP_PROP_FRAME_WIDTH);
	double height = cap.get(CV_CAP_PROP_FRAME_HEIGHT);

	cout << "width:" << width << "\t";
	cout << "height:" << height << "\t" << endl;

	//人脸数组
    std::vector<Rect> faces;

    if(!face_cascade.load(face_cascade_name))
    {
    	cout << "can not find face_cascade_file!" <<endl;
    	return FACE_LIB_ERRNO_NO_FILE;
    }
    
    int i = 0;
	for (i = 0; i < detectTimes; i++)
	{
		cap.read(frame);

		//进一步缩小图片尺寸，加快运算
		cv::resize(frame,frame,Size(128,96));

		//转换为灰度图，并将直方图均衡化
		cvtColor(frame, frame_gray, CV_BGR2GRAY);
		equalizeHist(frame_gray, frame_gray);

    	faces.clear();

		//检测并存储脸的数据
		face_cascade.detectMultiScale(frame_gray, faces, 1.1,
										2, 0|CV_HAAR_SCALE_IMAGE, Size(30, 30));

		if(faces.empty())
		{
			cout << "no faces!" << endl;
			//sleep(500);
			continue;
		}

		//给每个脸上画一个椭圆
		/*
		for(unsigned int i = 0; i < faces.size(); i++)
		{
			cout << "face " << i+1 << " detect!" << endl;
			Point center(faces[i].x + faces[i].width*0.5, faces[i].y + faces[i].height*0.5);
			ellipse(frame, center, Size( faces[i].width*0.5, faces[i].height*0.5),
					0, 0, 360, Scalar( 255, 0, 255 ), 4, 8, 0);
		}
		*/
		cout << "See ya!" << endl;
		FL_release_all(0);
		return faces.size();
    }

//	imwrite("Max.jpg", frame);

	if(i == detectTimes)
	{
		FL_release_all(0);
		return FACE_LIB_ERRNO_NO_FACE;
	}

}
