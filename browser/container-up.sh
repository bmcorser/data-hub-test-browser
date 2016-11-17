#!/bin/bash

# Steal docker-compose .env
while read -r line
do
    if [ $line ]
    then
        export $line
    fi
done < ../../.env

# Grab local IP to connect X server
LOCAL_IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
echo Expecting an X server running at $LOCAL_IP

make container-build

# Bring container up (with no command)
docker run -d \
    -e DISPLAY=$LOCAL_IP:0 \
    -e CDMS_ADFS_URL=$CDMS_ADFS_URL \
    -e CDMS_BASE_URL=$CDMS_BASE_URL \
    -e CDMS_USERNAME=$CDMS_USERNAME \
    -e CDMS_PASSWORD=$CDMS_PASSWORD \
    -e DELETER_PORT=$DELETER_PORT \
    --name casperjs \
    casperjs \
    tail -f /dev/null
