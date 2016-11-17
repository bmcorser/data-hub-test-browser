# Drop casperjs container
container-rm:
	docker ps --format '{{.Names}}' | grep casperjs && docker rm -f casperjs || echo Container not running

# Build casperjs container
container-build: container-rm
	docker build . -t casperjs

# Bring casperjs container up (with proper environment, DISPLAY hooked up, etc)
container-up: container-build
	./container-up.sh

# Run test suite
test-run:
	docker exec casperjs bash run-inner.sh

# Determine if the suites passed or failed
test-result:
	docker exec casperjs python /src/xunit.py

# Copy results out
test-results:
	docker cp casperjs:/results.xml results.xml
