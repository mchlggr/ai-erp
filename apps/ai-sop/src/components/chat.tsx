'use client';

import { AiChat } from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';

const adapterOptions: ChatAdapterOptions<unknown> = {
  url: 'https://pynlux.api.nlkit.com/pirate-speak'
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
