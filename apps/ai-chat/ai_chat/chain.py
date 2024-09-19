from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

_prompt = ChatPromptTemplate.from_messages(
  [
    (
      "system",
      """You are an assistant helping to generate a multiple-choice flowchart about a topic. Only return the flowchart in mermaid JS format with no other text.
  The diagram direction should be TD, top down.
  Only return the flowchart in mermaid JS format with no markdown markers.
  Do NOT include mermaid keyword in the output.
  Topic: """),
    ("human", "{message}"),
  ]
)

_model = ChatOpenAI()

# if you update this, you MUST also update ../pyproject.toml
# with the new `tool.langserve.export_attr`
chain = _prompt | _model
