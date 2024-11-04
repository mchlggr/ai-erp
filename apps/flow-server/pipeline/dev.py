import subprocess

def _run(bash_script):
  return subprocess.run(bash_script, shell=True)

def dev_server():
  # return _run("uvicorn apps.flow-server.flow_server.server:app --reload")
  return _run("uvicorn flow_server.server:app --reload")
