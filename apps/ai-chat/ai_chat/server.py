import os
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .chain import chain as pirate_speak_chain
from langchain.schema.runnable import Runnable
from langserve import add_routes

# Get the environment
environment = os.getenv("ENVIRONMENT", "development")
debug = environment == "development"
docs_url = "/docs"

origins = [
  "http://localhost:3000",
  "http://localhost:8000",
]

if environment == "development":
    # Below are used for dev purposes on localhost
    # Do not deploy to a public remove server
    origins.append("http://localhost:9090")

app = FastAPI(debug=debug, docs_url=docs_url)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse(docs_url)

def add_route(path: str, chain: Runnable):
    add_routes(
        app,
        runnable=chain,
        path=path,
        enabled_endpoints=["invoke", "stream", "input_schema", "output_schema"],
    )

# Test only
add_route("/pirate-speak", pirate_speak_chain)

if __name__ == "__main__":
  import uvicorn
  port = 8000
  uvicorn.run(app, host="0.0.0.0", port=port)
