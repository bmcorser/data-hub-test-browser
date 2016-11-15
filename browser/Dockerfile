FROM cmfatih/slimerjs

ENV FIREFOXVERSION 46.0+build5-0ubuntu0.14.04.2
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886; \
    apt-get update; \
    apt-get install -y --no-install-recommends  firefox \
                                                dbus-x11 \
                                                libxext-dev \
                                                libxrender-dev \
                                                libxtst-dev; \
    rm -rf /var/lib/apt/lists/*

# Undo xvfb-run from base container (want to see)
RUN ln -sf /srv/var/slimerjs/slimerjs /usr/bin/slimerjs
RUN ln -sf /srv/var/casperjs/bin/casperjs /usr/bin/casperjs
