"""Hello unit test module."""

from flow_server.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello flow-server"
