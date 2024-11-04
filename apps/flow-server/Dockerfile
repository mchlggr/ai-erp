FROM python:3.9.5

WORKDIR /app

RUN apt-get update \
    && apt-get install gcc -y \
    && apt-get clean

COPY . /app

# Install Poetry
RUN pip install poetry uvicorn fastapi

# Install dependencies without venv or cache
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction \
    && rm -rf /root/.cache/pypoetry || true

ENTRYPOINT ["./apps/flow-server/entry-point.sh"]
