#!/bin/sh

set -a
. .env
set +a
docker compose up --abort-on-container-exit
