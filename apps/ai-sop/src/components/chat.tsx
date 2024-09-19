'use client';

import { AiChat } from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';

const adapterOptions: ChatAdapterOptions<unknown> = {
  // dataTransferMode: 'batch',
  url: 'http://127.0.0.1:8000/pirate-speak'
  // url: '/chat/pirate-speak'
  // url: '/pirate-speak'
};

const Chat = () => {
  const langServeAdapter = useChatAdapter(adapterOptions);
  console.log('langServeAdapter', langServeAdapter);
  return (
    <AiChat adapter={langServeAdapter}
            composerOptions={{
              placeholder: 'How can I help you today?'
            }}
    />
  );
};

export { Chat }
