FROM ubuntu:14.04

# Env
ENV SLIMERJS_VERSION_F 0.10.1

# Commands
RUN \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y vim git wget xvfb libxrender-dev libasound2 libdbus-glib-1-2 libgtk2.0-0 unzip python && \
  mkdir -p /srv/var
RUN wget -O /tmp/slimerjs-$SLIMERJS_VERSION_F.zip \
    http://download.slimerjs.org/releases/$SLIMERJS_VERSION_F/slimerjs-$SLIMERJS_VERSION_F.zip
WORKDIR /tmp
RUN unzip /tmp/slimerjs-$SLIMERJS_VERSION_F.zip
RUN rm -f /tmp/slimerjs-$SLIMERJS_VERSION_F.zip
RUN mv /tmp/slimerjs-$SLIMERJS_VERSION_F/ /srv/var/slimerjs
RUN git clone https://github.com/casperjs/casperjs.git /srv/var/casperjs

ENV FIREFOXVERSION 46.0+build5-0ubuntu0.14.04.2
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886; \
    apt-get update; \
    apt-get install -y --no-install-recommends  firefox \
                                                dbus-x11 \
                                                libxext-dev \
                                                libxrender-dev \
                                                libxtst-dev;
RUN apt-get autoremove -y && apt-get clean all
RUN rm -rf /var/lib/apt/lists/*


# Undo xvfb-run from base container (want to see)
RUN ln -sf /srv/var/slimerjs/slimerjs /usr/bin/slimerjs
RUN ln -sf /srv/var/casperjs/bin/casperjs /usr/bin/casperjs

RUN apt-get update
RUN apt-get install -y httpie tree

CMD ["/usr/bin/slimerjs"]

ADD src /src
ADD run-inner.sh /src/run-inner.sh

WORKDIR /src
