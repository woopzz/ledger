FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN set -x; \
    apt-get update; \
    apt-get install -y git \
                       python python3 python3-pip \
                       nodejs npm

RUN set -x; \
    pip3 install flask pylint

RUN useradd -m -g users -s /usr/bin/bash accountant
USER accountant
