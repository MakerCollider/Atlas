#ifndef SENSOR_H
#define SENSOR_H

#define ERR_NONE  0
#define ERR_UNKOWN -1


/************************************************
 Light sensor
 ************************************************/

struct lightSensorConfig {
    int pin;
    int interval;
};

#define lightSensorConfig_pin           0
#define lightSensorConfig_interval 	100

typedef void(*lightSensorCb)(int);

extern int lightSensorInit(lightSensorConfig config, lightSensorCb cb);
extern int lightSensorRelease();
extern int lightSensorOnData(int toggle);

#endif

