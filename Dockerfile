FROM ubuntu:latest

# DEPENDENCIES

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update; \
    apt-get install -y git \
                       python python3 python3-pip \
                       nodejs npm

RUN pip3 install flask gunicorn

# ENV VARS

ENV APP_ROOT=/opt/ledger
ENV STATIC_ROOT=${APP_ROOT}/web/build
ENV FLASK_APP=${APP_ROOT}/server

# COPY FILES

WORKDIR ${APP_ROOT}
COPY ./ledger .

# USER ACCOUNT

RUN useradd -m -g users -s /usr/bin/bash accountant

RUN chown -R accountant ./
USER accountant

# BUILD

WORKDIR ${APP_ROOT}/web
RUN npm ci --only=production
RUN npm run-script build

EXPOSE 5000

WORKDIR ${APP_ROOT}/server
ENTRYPOINT [ "bash", "-c", "gunicorn --bind 0.0.0.0:5000 app:app" ]
