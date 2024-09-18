"""Hello unit test module."""

from ai_chat.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello ai-chat"
