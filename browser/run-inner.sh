CONTAINER_HOST_IP=$(ip route|awk '/default/ { print $3 }')
casperjs test \
    --engine=slimerjs \
    --xunit=/results.xml \
    --includes=/src/config.js \
    --deleterHost=$CONTAINER_HOST_IP \
    --deleterPort=$DELETER_PORT \
    /src/tests
