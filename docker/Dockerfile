FROM alpine
WORKDIR /usr/local/bgpg
ADD ./tmp /tmp/bgpg
ADD ./docker-build.sh /tmp/bgpg
RUN sh /tmp/bgpg/docker-build.sh
CMD node dist/main.js