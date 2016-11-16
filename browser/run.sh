#!/bin/bash

EXIT_CODE=0

# Unconditionally drop container on exit
trap "docker rm -f casperjs" EXIT

# Steal docker-compose .env
while read -r line
do
    export $line
done < ../../.env

# Grab local IP to connect X server
LOCAL_IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
echo Expecting an X server running at $LOCAL_IP

# Build casperjs container
docker build . -t casperjs

# Bring container up (with no command)
docker run -d \
    -e DISPLAY=$LOCAL_IP:0 \
    -e CDMS_ADFS_URL=$CDMS_ADFS_URL \
    -e CDMS_BASE_URL=$CDMS_BASE_URL \
    -e CDMS_USERNAME=$CDMS_USERNAME \
    -e CDMS_PASSWORD=$CDMS_PASSWORD \
    --name casperjs \
    casperjs \
    tail -f /dev/null

# Run test suite
docker exec casperjs \
    casperjs test --engine=slimerjs --xunit=/results.xml /src/tests

# Copy results out
docker cp casperjs:/results.xml results.xml

exit $EXIT_CODE
