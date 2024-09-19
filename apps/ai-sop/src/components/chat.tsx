'use client';

import { AiChat } from '@nlux/react';
import { ChatAdapterOptions, useChatAdapter } from '@nlux/langchain-react';
import { PersonaOptions } from '@nlux/react';

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
  url: 'http://127.0.0.1:8000/diagram'
};


interface ChatProps {
  className?: string;
}

const Chat = ({ className }: ChatProps) => {
  const langServeAdapter = useChatAdapter(adapterOptions);

  return (<div className={className}>
      <AiChat adapter={langServeAdapter}
              className={'flex justify-center items-end'}
              personaOptions={personasOptions}
              displayOptions={{ colorScheme: 'dark' }}
              composerOptions={{
                placeholder: 'How can I help you today?'
              }}
      />
    </div>
  );
};

export { Chat };
