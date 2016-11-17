#!/bin/bash

trap "make container-rm" EXIT

make container-build
make container-up

make test-run
make test-result
EXIT_CODE=$?
make test-results

exit $EXIT_CODE
