#!/bin/bash

LOCAL_IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
echo Expecting an X server running at $LOCAL_IP
docker build . -t casperjs
docker run \
    --rm \
    -v $(pwd):/test \
    -e DISPLAY=$LOCAL_IP:0 \
    casperjs \
    casperjs test --engine=slimerjs test/test.js
