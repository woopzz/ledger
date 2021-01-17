FROM ubuntu:latest

RUN set -x; \
    apt-get update; \
    apt-get install -y python python3 python3-pip git

RUN set -x; \
    pip3 install Flask pylint

RUN useradd -m -g users -s /usr/bin/bash accountant
