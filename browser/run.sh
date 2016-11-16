#!/bin/bash

# grab env
while read -r line
do
    export $line
done < ../../.env

LOCAL_IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
echo Expecting an X server running at $LOCAL_IP

docker build . -t casperjs
docker run -d \
    -v $(pwd):/test \
    -e DISPLAY=$LOCAL_IP:0 \
    -e CDMS_ADFS_URL=$CDMS_ADFS_URL \
    -e CDMS_BASE_URL=$CDMS_BASE_URL \
    -e CDMS_USERNAME=$CDMS_USERNAME \
    -e CDMS_PASSWORD=$CDMS_PASSWORD \
    --name casperjs \
    casperjs \
    tail -f /dev/null
docker exec casperjs \
    casperjs test --engine=slimerjs --xunit=results.xml test/test.js
docker exec casperjs cat results.xml
docker rm -f casperjs
