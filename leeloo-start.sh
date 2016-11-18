#!/bin/bash -xe
python /app/leeloo/manage.py migrate
python /app/leeloo/manage.py loaddata /app/leeloo/fixtures/metadata.yaml
python /app/leeloo/manage.py loaddata /app/leeloo/fixtures/undefined.yaml
pushd /app/leeloo
python /test/leeloo-createsuperuser.py
popd
/app/start.sh
