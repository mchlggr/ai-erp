'use client';

import { AiChat } from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';
import {PersonaOptions} from '@nlux/react';

export const personasOptions: PersonaOptions = {
    user: {
        name: 'Alex',
        avatar: 'https://docs.nlkit.com/nlux/images/personas/alex.png'
    },
    assistant: {
        name: 'Feather-AI',
        avatar: 'https://docs.nlkit.com/nlux/images/personas/feather.png',
        tagline: 'Yer AI First Mate!'
    }
};

const adapterOptions: ChatAdapterOptions<unknown> = {
  dataTransferMode: 'stream',
  url: 'http://127.0.0.1:8000/pirate-speak'
  // url: '/chat/pirate-speak'
  // url: '/pirate-speak'
};

const Chat = () => {
  const langServeAdapter = useChatAdapter(adapterOptions);
  console.log('langServeAdapter', langServeAdapter);
  return (
    <AiChat adapter={langServeAdapter}
            personaOptions={ personasOptions }
            displayOptions={{ colorScheme: 'dark' }}
            composerOptions={{
              placeholder: 'How can I help you today?'
            }}
    />
  );
};

export { Chat }
