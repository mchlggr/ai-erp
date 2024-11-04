import { StreamSend, StreamingAdapterObserver, BatchSend, ChatAdapterExtras } from '@nlux/react';

// A demo API by NLUX that connects to OpenAI
// and returns a stream of Server-Sent events
const demoProxyServerUrl = 'https://gptalks.api.nlux.dev/openai/chat/stream';

const flowServerHost = import.meta.env.VITE_FLOW_SERVER_HOST || ''
const flowServerDiagramUrl =  `${flowServerHost}/diagram/stream`;





// Function to send query to the server and receive a stream of chunks as response
export const chatStream: StreamSend<string> = async (
    prompt: string,
    observer: StreamingAdapterObserver<string>,
    extras: ChatAdapterExtras<string>
) => {

    const history = extras?.conversationHistory?.join('\n') ?? '';
    const message = history + prompt

    const body = { input: { message } };
    const response = await fetch(flowServerDiagramUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    });

    if (response.status !== 200) {
        observer.error(new Error('Failed to connect to the server'));
        return;
    }

    if (!response.body) {
        return;
    }

    // Read a stream of server-sent events
    // and feed them to the observer as they are being generated
    const reader = response.body.getReader();
    const textDecoder = new TextDecoder();

    while (true) {
        const {value, done} = await reader.read();
        if (done) {
            break;
        }

        const content = textDecoder.decode(value, {});
        if (content) {
          debugger
            const { data } = JSON.parse(content);
            console.log("data/data", data)
            console.log("data/data/content", data.content)
            observer.next(content);
        }
    }

    observer.complete();
};

