#include <iostream>
#include <stdlib.h>
#include <signal.h>
#include "mraa.hpp"
//#include "opencv2/opencv.hpp"
#include "face_lib.hpp"

using namespace std;

mraa::Gpio *led;

int main()
{
	//ÉèÖÃGpio¿Ú
	led = new mraa::Gpio(13);
	led->dir(mraa::DIR_OUT);

	//detect 5 times
	if (0 <= FL_face_detect(5))
	{
		//µãÁÁLED
		led->write(1);
		cout << "Success!!" << endl;
	}
	else
	{
		//close LED
		led->write(0);
		cout << "Fail!!" << endl;
	}

	return 0;
}
