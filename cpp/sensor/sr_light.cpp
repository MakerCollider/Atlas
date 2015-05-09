#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <string>
#include <uv.h>
#include "mraa/aio.h"
#include "sensor.h"

using namespace std;

/************************************************
 light sensor
 ************************************************/

void *lsLoop = NULL;
uv_timer_t lsTimer;

static lightSensorCb lsCb = NULL;
lightSensorConfig lsConfig;
mraa_aio_context lightSensorIo;


void run_uv_timer(uv_timer_t *req)
{
    int val = mraa_aio_read(lightSensorIo);
    printf("sensor: =========> %d\n", val);
    lsCb(val);
}

int lightSensorInit(lightSensorConfig config, lightSensorCb cb)
{
    if(cb != NULL)
        lsCb = cb;
    
    lsConfig = config;
    
    lightSensorIo = mraa_aio_init(lsConfig.pin); 
    
    printf("initialized Light sensor in pin %d with interval %d\n", config.pin, config.interval);
    
    // Initialize uv loop and timer
    uv_timer_stop(&lsTimer);
    
    if(lsLoop == NULL) {
        lsLoop = uv_default_loop();
    }
    
    uv_timer_init((uv_loop_t*)lsLoop, &lsTimer);
    lsTimer.data = NULL;
    uv_timer_start(&lsTimer, run_uv_timer, 0, config.interval);
    printf("start timer with interval %d ms\n", config.interval);
    
    
    return ERR_NONE;
}

int lightSensorRelease()
{
    printf("turn off light sensor in pin %d\n", lsConfig.pin);
    mraa_aio_close(lightSensorIo);
    uv_timer_stop(&lsTimer);
    
    return ERR_NONE;
}

int lightSensorOnData(int toggle)
{
    if(toggle) {
        lightSensorInit(lsConfig, NULL);
    } else {
        lightSensorRelease();
    }
    
    return ERR_NONE;
}

