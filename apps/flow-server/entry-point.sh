#!/bin/bash

# Ment to be run from the root of the project NOT from the apps/flow-server directory

cd ./apps/flow-server
poetry config virtualenvs.create false
poetry install --no-interaction
rm -rf /root/.cache/pypoetry || true
uvicorn flow_server.server:app --host 0.0.0.0 --reload
