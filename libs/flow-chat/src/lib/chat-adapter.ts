import {
  ChatAdapterExtras,
  ChatItem,
  StreamingAdapterObserver, StreamSend
} from '@nlux/react';

export const flowServerHost = import.meta.env.VITE_FLOW_SERVER_HOST || '';
export const flowServerDiagramUrl = `${flowServerHost}/diagram/stream`;


export function charCountToTokens(charCount: number): number {
  return Math.ceil(charCount / 4);
}

export function clipChatMessagesUpToNTokens(
  chatItems: ChatItem[],
  maxTokens: number
): ChatItem[] {
  let totalTokens = 0;
  let clippedItems = chatItems.slice();
  for (let i = chatItems.length - 1; i >= 0; i--) {
    const item = chatItems[i];
    totalTokens += charCountToTokens(item.message.length);
    if (totalTokens > maxTokens) {
      clippedItems = chatItems.slice(i + 1);
      break;
    }
  }
  return clippedItems;
}

function chatHistoryMessageInSingleString(
  chatHistory: (ChatItem<string[]> | ChatItem<string>)[]
): ChatItem<string>[] {
  return chatHistory.map((m) => {
    return {
      role: m.role,
      message: typeof m.message === 'string' ? m.message : m.message.join('')
    };
  });
}

export const chatStream: StreamSend<string> = async (
  prompt: string,
  observer: StreamingAdapterObserver<string>,
  extras: ChatAdapterExtras<string>
) => {
  debugger

  const body = {
    input: { message: prompt }
    // prompt,
    // messages: clipChatMessagesUpToNTokens(
    //   chatHistoryMessageInSingleString(extras.conversationHistory || []),
    //   200
    // ).map((m) => ({ role: m.role, content: m.message })),
  };
  const response = await fetch(flowServerDiagramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
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

  let doneStream = false;
  while (!doneStream) {
    const { value, done } = await reader.read();
    if (done) {
      doneStream = true;
    } else {
      const content = textDecoder.decode(value);
      console.log('content/content', content);
      if (content) {
        observer.next(content);
      }
    }
  }
  observer.complete();
};

