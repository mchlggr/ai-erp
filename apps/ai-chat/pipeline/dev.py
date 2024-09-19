import subprocess

def _run(bash_script):
  return subprocess.run(bash_script, shell=True)

def dev_server():
  # return _run("uvicorn apps.ai-chat.ai_chat.server:app --reload")
  return _run("uvicorn ai_chat.server:app")
